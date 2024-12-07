"use client";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
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
import { MdClear } from "react-icons/md";
import { useUploadFileMutation } from "@/redux/service/fileupload";
import { useCreateBlogMutation } from "@/redux/service/blog";
import { useToast } from "@/components/hooks/use-toast";
import { MdCheckCircle } from "react-icons/md";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";


const FILE_SIZE = 1024 * 1024 * 5; // 5MB
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png", "image/gif"];

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Required"),
  description: Yup.string().required("Description is Required"),
  topic: Yup.string().required("Required"),
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

const CreateBlogComponent = () => {
  const router = useRouter();

  const [modalOpen, setModalOpen] = useState(true);

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
                  };

                  console.log("Updated Values for Submission:", updatedValues);

                  await handleCreateBlog(updatedValues);
                } else {
                  console.error("No files uploaded");
                }
              } catch (error) {
                console.error("File Upload Error:", error);
              }
            }}
          >
            {({ setFieldValue, isValid, dirty }) => (
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
                            <SelectItem value="tech">Tech</SelectItem>
                            <SelectItem value="health">Health</SelectItem>
                            <SelectItem value="education">Education</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
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
                    <Input
                      type="text"
                      id="customTopic"
                      name="topic"
                      placeholder="Enter your custom topic"
                      className="mt-1"
                    />
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={!isValid || !dirty}
                  className="w-full bg-primary_color"
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
        <DialogContent className="bg-white max-w-md  p-[50px]  w-full mx-auto">
          <MdCheckCircle size={100} className="text-primary_color mx-auto" />
          <div className="text-center">
            <p className="font-bold text-text_header_34">Blog Create Success</p>
            <p className="text-lg">
              Thank you for submitting your blog! Your post is currently under
              review by our admin team. Once it has been approved, you will
              receive a confirmation email notifying you of its successful
              publication. We appreciate your contribution and look forward to
              sharing your insights with our community.
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
