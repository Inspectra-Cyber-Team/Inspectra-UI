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
export default function CreateProjectComponent() {
  const [projectName, setProjectName] = useState("");
  const [isOpened, setIsOpened] = useState(true);

  const [createProjectName, { isSuccess, isError }] =
    useCreateProjectNameMutation();

  type ProjectNameType = {
    projectName: string;
  };

  const initValues: ProjectNameType = {
    projectName: "",
  };

  const handleSubmit = (values: ProjectNameType) => {
    setProjectName(values.projectName);
    createProjectName({ projectName: values });
  };
  useEffect(() => {
    try {
      if (isSuccess) {
        toast({
          description: "Project created successfully",
          variant: "success",
        });
        setIsOpened(false);
      }
      if (isError) {
        if (projectName.trim().length === 0 || /\s/.test(projectName)) {
          // Check if the projectName is empty or contains whitespace
          toast({
            description: "Project name cannot contain whitespace",
            variant: "error",
          });
        }   else {
          // Handle the case where the project name already exists
          toast({
            description: "Project name already exists",
            variant: "error",
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [isSuccess, isError]);

  const handleClose = () => {
    setIsOpened(false);
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="px-4 py-2 rounded-2xl inline-flex w-auto md:w-[170px]  items-center text-text_color_light md:flex md:justify-around bg-text_color_dark">
          <p className="hidden md:block">Create Project</p>
          <LuPlus />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent className=" w-[90%] md:w-full rounded-[20px] bg-text_color_dark h-[300px] flex flex-col justify-around">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex justify-between text-center items-center">
            <p className="text-text_title_24 text-text_color_light">
              Create Project Name
            </p>
            <AlertDialogCancel onClick={() => handleClose} className="flex text-center items-center">
              <RxCross2
                className="text-text_color_light  text-text_header_34"
                style={{ height: "1em", width: "0.7em" }}
              />
            </AlertDialogCancel>
          </AlertDialogTitle>
        </AlertDialogHeader>
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
              className={`mt-1 w-full rounded-md border  bg-text_color_dark dark:text-text_color_light px-3 py-3 focus:outline-none focus:right-2 focus:border-primary_color 
                `}
            />
            <button
              type="submit"
              className="w-full mt-5 py-3 bg-primary_color text-text_color_light font-semibold flex justify-center rounded-[10px]"
            >
              Submit
            </button>
          </Form>
        </Formik>
      </AlertDialogContent>
    </AlertDialog>
  );
}
