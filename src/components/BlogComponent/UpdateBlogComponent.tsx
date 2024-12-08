"use client";
import React, {  useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { MdClear } from "react-icons/md";
import { useUploadFileMutation } from "@/redux/service/fileupload";
import { useToast } from "@/components/hooks/use-toast";
import { useUpdateBlogMutation, useGetBlogByUuidQuery } from "@/redux/service/blog";



type UpdateBlogComponentProps = {
  uuid: string;
};

const FILE_SIZE = 1024 * 1024 * 5; // 5MB
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png", "image/gif"];

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Required"),
  description: Yup.string().required("Description is Required"),
  thumbnail: Yup.array()
    .of(
      Yup.mixed()
        .test("fileFormat", "Unsupported Format", (value: any) => {
          if (!value) return true;
          return SUPPORTED_FORMATS.includes(value.type);
        })
        .test("fileSize", "File Size is too large", (value: any) => {
          if (!value) return true;
          return value.size <= FILE_SIZE;
        })
    )
    .min(1, "Please select at least one image."),
});

export const UpdateBlogComponent = ({uuid}:UpdateBlogComponentProps) => {

  const {data:blogUpdateData} = useGetBlogByUuidQuery({uuid:uuid});

  console.log(blogUpdateData);

  const { toast } = useToast();

  const [uploadFile] = useUploadFileMutation();

  const [updateBlog ] = useUpdateBlogMutation();


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
        }
      
    } catch (error) {
      console.error("File Upload Error:", error);
    }
  }

  const initialValues = {
    title: blogUpdateData?.data?.title || "",
    description: blogUpdateData?.data?.description || "",
    thumbnail: [],
  };


  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-[#f5f5f5] rounded-[20px] ">
      <p className="text-center">Update Blog</p>
      <Card className="border-0">
        <CardContent>
          <Formik
           initialValues={initialValues}
            validationSchema={validationSchema}
            enableReinitialize  // Enable reinitialization when initialValues change
            onSubmit={async (values) => {
              try {
                const uploadedImages = await handleFileUpload(values.thumbnail);

                if (uploadedImages.length > 0) {
                  const updatedValues = {
                    ...values,
                    thumbnail: uploadedImages, // Set the uploaded URLs
                  };

                  await handleUpdateBlog(updatedValues);
              
                } else {
                  console.error("No files uploaded");
                }
              } catch (error) {
                console.error("File Upload Error:", error);
              }
            }}
          >
            {({ setFieldValue }) => (
              <Form className="space-y-4">
                <div>
                  <Label htmlFor="thumbnail">Thumbnail</Label>
                  <Input
                    type="file"
                    id="thumbnail"
                    name="thumbnail"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleFileChange(e, setFieldValue)}
                    className="mt-1"
                  />
                  <ErrorMessage
                    name="thumbnail"
                    component="p"
                    className="text-red-500 text-sm mt-1"
                  />
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

                <div>
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
