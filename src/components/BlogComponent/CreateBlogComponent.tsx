"use client";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";


import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { useUploadFileMutation } from "@/redux/service/fileupload";
import { useCreateBlogMutation } from "@/redux/service/blog";
import { useToast } from "@/components/hooks/use-toast";
import { MdCheckCircle, MdClear } from "react-icons/md";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useGetAllTopicQuery } from "@/redux/service/topic";
import TextEditor from "../TextEdittor/TextEditor";
import { Plus } from "lucide-react";

const FILE_SIZE = 1024 * 1024 * 5; // 5MB
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png", "image/gif"];

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is Required"),
  description: Yup.string().required("Description is Required"),
  topic: Yup.string().required("Topic is Required"),
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
    .min(1, "Please select for blog thumbnail."),
});

const CreateBlogComponent = () => {
  
  const router = useRouter();

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

  const removeImage = (index: number) => {
    const updatedPreviews = [...previewImages];
    updatedPreviews.splice(index, 1);
    setPreviewImages(updatedPreviews);
  };

  const { data: topics } = useGetAllTopicQuery({ page: 0, pageSize: 10 });

  const [modalOpen, setModalOpen] = useState(false);

  const handleClose = () => {
    setModalOpen(false); // Close the modal
    router.push("/blog"); // Redirect to the blog page
  };

  const { toast } = useToast();

  const [uploadFile] = useUploadFileMutation();

  const [createBlog] = useCreateBlogMutation();

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

  const [selectedTopic, setSelectedTopic] = useState<string | null>("");

  const handleCreateBlog = async (value: any) => {
    try {
      const response = await createBlog({
        title: value.title,
        description: value.description,
        topic: value.topic,
        thumbnail: value.thumbnail,
      });

      if (response.data) {
        toast({
          description: "Blog Created Successfully",
          variant: "success",
        });
        setModalOpen(true);
      }
    } catch (error) {
      console.error("Create Blog Error:", error);
      toast({
        description: "Failed to create blog",
        variant: "error",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6">
      <Card className="border-0">
        <CardContent>
          <Formik
            initialValues={{
              title: "",
              description: "",
              topic: "",
              customTopic: "",
              thumbnail: [],
            }}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              try {
                const uploadedImages = await handleFileUpload(values.thumbnail);

                if (uploadedImages.length > 0) {
                  const updatedValues = {
                    ...values,
                    thumbnail: uploadedImages, // Set the uploaded URLs
                    topic:
                      selectedTopic === "other"
                        ? values.customTopic
                        : selectedTopic,
                  };
                  await handleCreateBlog(updatedValues);
                } else {
                  console.error("No files uploaded");
                }
              } catch (error) {
                console.error("File Upload Error:", error);
              }
            }}
          >
            {({ setFieldValue }) => (
              <Form className="space-y-4 py-1">
                {/* Drag-and-Drop Thumbnail Selection */}
                <p className="text-black text-text_title_20 font-bold text-center mt-1 dark:text-text_color_dark ">
                  Create Blog
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

                {/* Preview Selected Thumbnails */}
                {previewImages.length > 0 && (
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
                          className="absolute top-0 right-0 bg-red-500 text-white px-2 rounded"
                          onClick={() => removeImage(index)}
                        >
                          <MdClear />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

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
                          {({ field, form }: any) => (
                            <div>
                              {/* Ensure onChange is properly called with setFieldValue */}
                              <TextEditor
                                value={field.value}
                                onChange={(value: any) =>
                                  form.setFieldValue("description", value)
                                }
                              />
                            </div>
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

                <div>
                  <Label htmlFor="topic">Blog Topic</Label>
                  <Field name="topic">
                    {({ field, form }: any) => (
                      <Select
                        {...field}
                        id="topic"
                        className="mt-1"
                        onValueChange={(value) => {
                          form.setFieldValue("topic", value);
                          setSelectedTopic(value);
                        }}
                        value={field.value || ""}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select a topic" />
                        </SelectTrigger>
                        <SelectContent className="SelectContent">
                          <SelectGroup>
                            <SelectLabel>Topics</SelectLabel>
                            {topics?.content
                              .filter((topic: any) => topic.name !== "other")
                              .map((topic: any) => (
                                <SelectItem key={topic.uuid} value={topic.name}>
                                  {topic.name}
                                </SelectItem>
                              ))}
                            {/* Append "Other" at the end */}
                            {topics?.content
                              .filter((topic: any) => topic.name === "other")
                              .map((topic: any) => (
                                <SelectItem key={topic.uuid} value={topic.name}>
                                  {topic.name}
                                </SelectItem>
                              ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  </Field>
                  <ErrorMessage
                    name="topic"
                    component="p"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {selectedTopic === "other" && (
                  <div className="mt-2">
                    <Label htmlFor="customTopic">Custom Topic</Label>
                    <Field
                      as={Input}
                      type="text"
                      id="customTopic"
                      name="customTopic"
                      placeholder="Enter your custom topic"
                      className="mt-1"
                    />
                    <ErrorMessage
                      name="customTopic"
                      component="p"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                )}

                <Button
                  type="submit"
                  // disabled={!isValid || !dirty}
                  className="w-full bg-primary_color dark:text-text_color_light"
                >
                  Create Blog
                </Button>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>

      {/* Modal for Blog Creation Success */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="bg-white dark:bg-background_dark_mode max-w-md  p-[50px]  w-full mx-auto">
          <MdCheckCircle size={100} className="text-primary_color mx-auto" />
          <div className="text-center">
            <p className="font-bold text-text_header_34">Create Success</p>
            <p className="text-lg dark:text-text_color_desc_dark text-left">
              Thank you for submitting your blog! <br />
              <br /> Your post is currently under review by our admin team. Once
              it has been approved, you will receive a confirmation email
              notifying you of its successful publication. <br />
              <br />
              We appreciate your contribution and look forward to sharing your
              insights with our community.
            </p>
          </div>
          <Button
            onClick={() => handleClose()}
            className="mt-4 bg-primary_color text-black"
          >
            Visite Blog Page
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateBlogComponent;
