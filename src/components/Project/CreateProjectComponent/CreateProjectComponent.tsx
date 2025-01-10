"use client";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Field, Form, Formik } from "formik";
import { LuPlus } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";
import { useCreateProjectNameMutation } from "@/redux/service/project";
import { toast } from "@/components/hooks/use-toast";
import { useEffect, useState } from "react";

type ErrorResponse = {
  data?: {
    error?: {
      description?: string;
    };
  };
};

export default function CreateProjectComponent() {
  const [isLoading, setIsLoading] = useState(false);

  const [projectName, setProjectName] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  const [createProjectName, { isSuccess, isError }] =
    useCreateProjectNameMutation();

  const [userUUID, setUserUUID] = useState("");
  useEffect(() => {
    setUserUUID(localStorage.getItem("userUUID") || "");
  });

  const initValues: any = {
    projectName: "",
  };

  const handleSubmit = async (values: any) => {
    setIsLoading(true);
    try {
      const res = await createProjectName({ projectName: values?.projectName });
      if (res?.data) {
        toast({
          description: "Project created successfully",
          variant: "success",
        });
        setIsOpen(false);
        setIsLoading(false);
      } else if (res?.error) {
        let errorMessage = "An error occurred while creating the project.";

        // Check if the error is of type FetchBaseQueryError
        if ("data" in res.error) {
          const errorResponse = res.error as ErrorResponse;

          // Check if the description is an array or a string
          if (Array.isArray(errorResponse.data?.error?.description)) {
            // Join array elements into a single string (comma-separated or however you'd like)
            errorMessage = errorResponse.data.error.description[0].reason;
          } else {
            // Handle as a string
            errorMessage =
              errorResponse.data?.error?.description || errorMessage;
          }
        }

        toast({
          description: errorMessage,
          variant: "error",
        });
      } else {
        toast({
          description: "Something went wrong!",
          variant: "error",
        });
      }
    } catch (error) {
      console.error("Error while creating scan project:", error);
      toast({
        description: "An unexpected error occurred. Please try again.",
        variant: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };
  // useEffect(() => {
  //   if (isSuccess) {
  //     toast({
  //       description: "Project created successfully",
  //       variant: "success",
  //     });
  //     setIsOpen(false);
  //     setIsLoading(false);
  //   }
  //   if (isError) {
  //     if (projectName.trim().length === 0 || /\s/.test(projectName)) {
  //       // Check if the projectName is empty or contains whitespace
  //       toast({
  //         description: "Project name cannot contain whitespace",
  //         variant: "error",
  //       });
  //       setIsLoading(false);
  //     } else {
  //       // Handle the case where the project name already exists
  //       toast({
  //         description: "Oops! Something went wrong",
  //         variant: "error",
  //       });
  //       setIsLoading(false);
  //     }
  //   }
  // }, [isSuccess, isError]);

  return (
    <div>
      {userUUID === "" ? (
        <p></p>
      ) : (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
          <AlertDialogTrigger asChild>
            <div className="px-4 py-2 cursor-pointer rounded-2xl inline-flex w-auto md:w-[170px]  items-center text-text_color_light md:flex md:justify-around bg-text_color_dark">
              <p className="hidden md:block">Create Project</p>
              <LuPlus />
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent className=" w-[90%]  md:w-full rounded-[20px] bg-text_color_dark h-auto p-5 flex flex-col justify-around">
            <AlertDialogHeader>
              <AlertDialogTitle className="flex  justify-between text-center items-center">
                <p className="text-text_title_24 text-text_color_light">
                  Create Project Name
                </p>
                <AlertDialogCancel className="flex text-center items-center">
                  <RxCross2
                    className="text-text_color_light  text-text_header_34"
                    style={{ height: "1em", width: "0.7em" }}
                  />
                </AlertDialogCancel>
              </AlertDialogTitle>
            </AlertDialogHeader>
            <p className="mt-2 text-sm text-text_color_desc_light dark:text-text_color_desc_light">
              Project name must:
              <ul className="list-disc list-inside">
                <li>Not contain whitespace.</li>
                <li>Be unique (not previously used).</li>
              </ul>
            </p>
            <Formik
              initialValues={initValues}
              onSubmit={(values) => {
                handleSubmit(values);
              }}
            >
              <Form>
                <Field
                  type="text"
                  id="projectName"
                  name="projectName"
                  placeholder="Enter Project Name"
                  className={`mt-1 w-full rounded-md border bg-text_color_dark dark:text-text_color_light px-3 py-3 focus:outline-none focus:right-2 focus:border-primary_color 
                `}
                />
                <button
                  disabled={isLoading}
                  className="w-full my-[30px] py-3 bg-primary_color text-text_color_light font-normal flex justify-center rounded-[10px]"
                >
                  {isLoading ? (
                    <div className="spinner-border animate-spin inline-block w-6 h-6 border-2 rounded-full border-t-2 border-text_color_light border-t-transparent"></div>
                  ) : (
                    "Submit"
                  )}
                </button>
              </Form>
            </Formik>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
