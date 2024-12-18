"use client";
import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { MdClear } from "react-icons/md";
import { useUploadFileMutation } from "@/redux/service/fileupload";
import { useToast } from "@/components/hooks/use-toast";
import {
  useUpdateBlogMutation,
  useGetBlogByUuidQuery,
} from "@/redux/service/blog";
import { useRouter } from "next/navigation";
import TextEditor from "../TextEdittor/TextEditor";
import { Plus } from "lucide-react";

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

  const { data: blogUpdateData } = useGetBlogByUuidQuery({ uuid: uuid });

  const { toast } = useToast();

  const [uploadFile] = useUploadFileMutation();

  const [updateBlog] = useUpdateBlogMutation();

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
  };

  const handleUpdateBlog = async (values: any) => {
    try {
      const response = await updateBlog({ uuid: uuid, ...values }).unwrap();

      console.log("Update Blog Response:", response);

      if (response.status === 200) {
        toast({
          title: "Blog Updated",
          description: "Your blog has been updated successfully",
          variant: "success",
        });
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
    }
  }, [blogUpdateData?.data?.thumbnail]);

  const initialValues = {
    title: blogUpdateData?.data?.title || "",
    description: blogUpdateData?.data?.description || "",
    thumbnail: [],
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 rounded-[20px] ">
      <Card className="border-0">
        <CardContent>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            enableReinitialize
            onSubmit={async (values) => {
              try {
                // Determine if the thumbnail contains new uploads
                let updatedThumbnails = previewImages; // Start with the current preview images

                if (values.thumbnail.some((file) => typeof file !== "string")) {
                  // If new files are uploaded, handle the upload
                  updatedThumbnails = await handleFileUpload(
                    values.thumbnail.filter((file) => typeof file !== "string")
                  );
                }

                // Filter out local blob URLs and combine the newly uploaded URLs with existing URLs
                const finalThumbnails = [
                  ...previewImages.filter(
                    (url) => typeof url === "string" && !url.startsWith("blob:")
                  ),
                  ...updatedThumbnails,
                ];

                const updatedValues = {
                  ...values,
                  thumbnail: finalThumbnails, // Use the final thumbnail URLs
                };

                // Submit the updated blog data
                await handleUpdateBlog(updatedValues);
              } catch (error) {
                console.error("Error updating blog:", error);
              }
            }}
          >
            {({ setFieldValue }) => (
              <Form className="space-y-4">
                <p className="text-black p-3 text-text_title_20 font-bold text-center dark:text-text_color_dark ">
                  Update Blog
                </p>
                <div
                  className="file-upload-design mt-4 p-6 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 transition-all duration-300 ease-in-out hover:border-blue-400 hover:bg-blue-50 dark:bg-background_dark_mode"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <div className="flex flex-col items-center justify-center space-y-2 text-center">
                    <p className="text-sm font-medium text-gray-700 dark:text-text_color_dark">
                      Drag and Drop Thumbnail Here
                    </p>
                    {/* <p className="text-sm text-gray-500">or</p> */}
                    <button
                      type="button"
                      className="inline-flex items-center justify-center w-10 h-10 rounded-full  text-black  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                      onClick={() => {
                        const thumbnailInput =
                          document.getElementById("thumbnail");
                        if (thumbnailInput) thumbnailInput.click();
                      }}
                    >
                      <Plus className="h-6 w-6 dark:text-text_color_dark" />
                      <span className="sr-only">Browse Files</span>
                    </button>
                  </div>

                  <Input
                    id="thumbnail"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, setFieldValue)}
                    className="hidden"
                  />
                  <ErrorMessage
                    name="thumbnail"
                    component="p"
                    className="text-red-500 text-sm mt-2 text-center"
                  />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  {previewImages.map((src, index) => (
                    <div key={index} className="relative">
                      <img
                        src={src}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-32 object-cover rounded-md border"
                      />
                      <Button
                        type="button"
                        className="absolute -top-2 right-0 px-1 text-white"
                        onClick={() => {
                          const updatedFiles = [...previewImages];
                          updatedFiles.splice(index, 1);
                          setPreviewImages(updatedFiles);
                        }}
                      >
                        <MdClear />
                      </Button>
                    </div>
                  ))}
                </div>

                <div>
                  <Label htmlFor="title">Title</Label>
                  <Field
                    as={Input}
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Enter blog title"
                    className="mt-1"
                  />
                  <ErrorMessage
                    name="title"
                    component="p"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* <div>
                  <Label htmlFor="description">Description</Label>
                  <Field
                    as={Textarea}
                    id="description"
                    name="description"
                    placeholder="Write a brief description"
                    rows={4}
                    className="mt-1"
                  />
                  <ErrorMessage
                    name="description"
                    component="p"
                    className="text-red-500 text-sm mt-1"
                  />
                </div> */}

                {/* new text editor plugin with description filed */}
                <div className="col-span-full">
                  <div className="md:col-span-4 col-span-6">
                    <div className="sm:col-span-6 h-full">
                      <div className="mt-2">
                        <Label htmlFor="description">Description</Label>
                        <Field name="description">
                          {({ field }: any) => (
                            <TextEditor
                              value={field.value}
                              onChange={(value) =>
                                setFieldValue("description", value)
                              }
                            />
                          )}
                        </Field>
                        <ErrorMessage
                          name="description"
                          component="div"
                          className="text-red-600 text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <Button type="submit" className="w-full bg-primary_color">
                  Update Blog
                </Button>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdateBlogComponent;
