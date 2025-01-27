"use client";
import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  useUploadMultipleFileMutation,
} from "@/redux/service/faqs";
import { useToast } from "@/components/hooks/use-toast";
import {
  useUpdateBlogMutation,
  useGetBlogByUuidQuery,
} from "@/redux/service/blog";
import { useRouter } from "next/navigation";
import { Plus, X, XCircle } from "lucide-react";
import RichTextEditor from "../TextEdittor";

type UpdateBlogComponentProps = {
  uuid: string;
};

const FILE_SIZE = 1024 * 1024 * 5; // 5MB
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png", "image/gif"];

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Required"),
  description: Yup.string().required("Description is Required"),
  thumbnail: Yup.array().of(
    Yup.mixed()
      .test("fileFormat", "Unsupported Format", (value: any) => {
        if (!value) return true;
        return SUPPORTED_FORMATS.includes(value.type);
      })
      .test("fileSize", "File Size is too large", (value: any) => {
        if (!value) return true;
        return value.size <= FILE_SIZE;
      })
  ),
});

export const UpdateBlogComponent = ({ uuid }: UpdateBlogComponentProps) => {
  const router = useRouter();
  const { data: blogUpdateData } = useGetBlogByUuidQuery({ uuid });
  const { toast } = useToast();
  const [uploadFile] = useUploadMultipleFileMutation();
  const [updateBlog] = useUpdateBlogMutation();
  const [isLoading, setIsLoading] = useState(false);
  const [isImageSelected, setIsImageSelected] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "copy";
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const files = Array.from(e.dataTransfer.files).filter((file) =>
      SUPPORTED_FORMATS.includes(file.type)
    );

    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  const handleFileUpload = async (files: File[]) => {
    const formData = new FormData();
    files.forEach((file: any) => {
      formData.append("files", file);
    });

    try {
      const response = await uploadFile({ file: formData }).unwrap();
      return response.data; // Return file URLs
    } catch (error) {
      console.error("File Upload Error:", error);
      return [];
    }
  };

  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: any
  ) => {
    const files = Array.from(e.target.files || []);
    setFieldValue("thumbnail", files);

    // Generate previews for selected images
    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
    setIsImageSelected(true);
  };

  const handleUpdateBlog = async (values: any) => {
    try {
      setIsLoading(true);
      const response = await updateBlog({ uuid: uuid, ...values }).unwrap();

      if (response.status === 200) {
        toast({
          title: "Blog Updated",
          description: "Your blog has been updated successfully",
          variant: "success",
        });
        setIsLoading(false);
        router.push("/blog");
      }
    } catch (error) {
      console.error("File Upload Error:", error);
    }
  };

  useEffect(() => {
    if (blogUpdateData?.data?.thumbnail) {
      const previews = blogUpdateData?.data?.thumbnail;
      setPreviewImages(previews);
      setIsImageSelected(true);
    }
  }, [blogUpdateData?.data?.thumbnail]);

  const initialValues = {
    title: blogUpdateData?.data?.title || "",
    description: blogUpdateData?.data?.description || "",
    thumbnail: [],
  };


  const removeImage = (index: number, setFieldValue: any) => {
    const updatedPreviews = [...previewImages];
    updatedPreviews.splice(index, 1);
    setPreviewImages(updatedPreviews);
  
    // Update Formik field value
    const updatedFiles = initialValues.thumbnail.filter((_, idx) => idx !== index);
    setFieldValue("thumbnail", updatedFiles);
  
    // If no image is left, reset the state to show the input
    if (updatedPreviews.length === 0) {
      setIsImageSelected(false)
    }
  };

  return (
    <section className="max-w-4xl mx-auto mt-10 rounded-[20px] ">
      <Card>
        <CardContent>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            enableReinitialize
            onSubmit={async (values) => {
              try {
                let updatedThumbnails = previewImages;

                if (values.thumbnail.some((file) => typeof file !== "string")) {
                  updatedThumbnails = await handleFileUpload(
                    values.thumbnail.filter((file) => typeof file !== "string")
                  );
                }

                const finalThumbnails = [
                  ...previewImages.filter(
                    (url) => typeof url === "string" && !url.startsWith("blob:")
                  ),
                  ...updatedThumbnails,
                ];

                const updatedValues = {
                  ...values,
                  thumbnail: finalThumbnails,
                };
                await handleUpdateBlog(updatedValues);
              } catch (error) {
                console.error("Error updating blog:", error);
              }
            }}
          >
            {({ setFieldValue }) => (
              <Form className="space-y-8 bg-card p-6">
                <h2 className="text-center font-bold text-2xl">Update Blog</h2>

                 {/* Thumbnail Upload */}
                 <div>
                  <Label htmlFor="thumbnail" className="text-md font-medium">
                    Thumbnail
                  </Label>

                  <div
                    className="file-upload-design mt-2 rounded-lg border-2 border-dashed transition-all duration-300 ease-in-out hover:border-blue-400 w-[500px] h-[200px] items-center justify-center"
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                  >
                    <div className="flex flex-col items-center justify-center space-y-2 text-center h-full">
                      {!isImageSelected ? (
                        <>
                          <p className="text-md font-medium text-text_color_desc_light dark:text-text_color_dark">
                            Drag and Drop Thumbnail Here
                          </p>
                          <button
                            type="button"
                            className="inline-flex items-center justify-center w-10 h-10 rounded-full text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                            onClick={() => {
                              const thumbnailInput =
                                document.getElementById("thumbnail");
                              if (thumbnailInput) thumbnailInput.click();
                            }}
                          >
                            <Plus className="h-6 w-6 text-text_color_desc_light dark:text-text_color_dark" />
                          </button>
                        </>
                      ) : (
                        previewImages.length > 0 && (
                          <div className="relative">
                            <img
                              src={previewImages[0]} // Display the first image if multiple images exist
                              alt="Thumbnail Preview"
                              className=" w-[490px] h-[195px] p-1 object-cover rounded-md"
                            />
                            <X
                              type="button"
                              className="absolute p-1 top-0 right-0 cursor-pointer text-white bg-red-500 rounded-full"
                              onClick={() => removeImage(0,setFieldValue)} // Remove image
                            />
                          </div>
                        )
                      )}
                    </div>

                    {!isImageSelected && (
                      <input
                        id="thumbnail"
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, setFieldValue)}
                        className="hidden"
                      />
                    )}
                    <ErrorMessage
                      name="thumbnail"
                      component="p"
                      className="text-red-500 text-sm mt-2 text-center"
                    />
                  </div>
                </div>


                {/* Title */}
                <div>
                  <Label htmlFor="title" className="text-sm font-medium">
                    Title
                  </Label>
                  <Field
                    as={Input}
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Enter blog title"
                    className="mt-2 p-3 border rounded-md w-full "
                  />
                  <ErrorMessage
                    name="title"
                    component="p"
                    className="text-destructive text-sm mt-1"
                  />
                </div>

                {/* Description */}
                <div className="col-span-full mt-4">
                  <Label htmlFor="description" className="text-sm font-medium">
                    Description
                  </Label>
                  <Field
                    name="description"
                    className="mt-2 p-3 border rounded-md w-full "
                  >
                    {({ field }: any) => (
                      // <TextEditor
                      //   value={field.value}
                      //   onChange={(value) => setFieldValue("description", value)}
                      // />
                      <RichTextEditor
                        content={field.value}
                        onChange={(value: any) =>
                          setFieldValue("description", value)
                        }
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="text-destructive text-sm"
                  />
                </div>

                {/* Submit Button */}
                <div className="mt-4 flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push("/blog")}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-primary_color text-text_color_light dark:text-text_color_light"
                    type="submit"
                  >
                    {isLoading ? (
                      <div className="spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full border-t-2 border-primary-foreground border-t-transparent"></div>
                    ) : (
                      "Update Blog"
                    )}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </section>
  );
};

export default UpdateBlogComponent;
