"use client";
import { Field, Form, Formik } from "formik";
import Link from "next/link";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";
import * as Yup from "yup";
import styles from "@/components/FromLoginComponent/styles.module.css";
import { useToast } from "../hooks/use-toast";
import { useChnagePasswordMutation } from "@/redux/service/auth";
import { useRouter } from "next/navigation";

export default function FormChangePassowrd() {

  const [isLoading, setIsLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [showconfirmPassword, setShowconfirmPassword] = useState(false);

  const [showNewPassword,setShowNewPassword] = useState(false);

  const validationSchema = Yup.object({
    oldPassword: Yup.string().required("Old Password is Required"),
    newPassword: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
        "Password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number"
      )
      .required("New password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Password must match")
      .required("Confirm Password is Required"),
  });

  type InitValue = {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  };

  const initialValues: InitValue = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const [changePassword] = useChnagePasswordMutation();

  const {toast} = useToast();

  const router = useRouter();

  const handleChnagePassword = async (values: InitValue) => {
    
    try {
 
      setIsLoading(true)

      const response = await changePassword({ data:values });
 
      if (response.data) {
        toast({
          description: "Password changed successfully!",
          variant: "success",
        })
         
         router.push('/')
      }
      else {
        toast({
          description: "Failed to change password. Please try again.",
          variant: "error",
        })
        setIsLoading(false)
       
      }
    } catch  {

      toast({
        description: "Failed to change password. Please try again.",
        variant: "error",
      });
    } finally {
      // end sure stsate is reset after work
      setIsLoading(false)
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
    // Toggle password visibility
  };
  const handleShowNewPassword = () => {
    setShowNewPassword(!showNewPassword)
  }
  const handleShowconfirmPassword = () => {
    setShowconfirmPassword(!showconfirmPassword);
    // Toggle password visibility
  };
  return (
    <main className="h-screen  w-full mx-auto flex ">
      {/* secontion welcome */}
      <section className=" hidden  h-full xl:flex flex-col items-center justify-between w-[60%] bg-primary_color py-[40px] ">
        <div className="w-full px-[100px]">
          <p className="text-[60px] text-text_color_light font-semibold leading-[1.2]">
            Change new <br />
            <span className="font-normal">Password</span>
          </p>
          <p className="text-text_body_16 text-ascend_color leading-[1.4] mt-2">
            Let&apos;s get started with your new password
          </p>
        </div>

        <div className="w-full h-[400px] items-end flex justify-center">
          <img
            className="object-contain w-full h-full"
            alt="image login"
            src="/images/Login_page_image.png"
          />
        </div>
      </section>
      <section className="h-full  my-auto w-full xl:w-[40%] bg-text_color_dark  p-[40px] flex flex-col ">
        <div className="w-full flex justify-between">
          {/* Logo and name */}
          <div className="w-full flex items-center">
            <div className="w-[40px] h-[40px] overflow-hidden rounded-full">
              <img
                src="/images/logo.jpg"
                alt="Logo"
                width={50}
                height={50}
                className="object-cover w-full h-full"
              />
            </div>
            <p className="font-medium text-text_color_light pl-3 text-text_title_20">
              Inspectra
            </p>
          </div>
          {/* Close icon */}
          <Link
            href={"/"}
            className="text-text_header_34 text-text_color_light items-center"
          >
            <RxCross2 className="h-full" />
          </Link>
        </div>
        <p className="text-text_header_34 font-semibold text-text_color_light mt-10">
          Change Password
        </p>
        <p className="text-text_body_16 mt-5 text-text_color_desc_light">
          Set the new password for your account so you can login and access all
          features.
        </p>

        {/* form for input email */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values)=>{
            await handleChnagePassword(values)
          }}
        >
          {({ errors, touched }) => (
            <Form className="mt-10">
              {/* old Password */}
              <div className="relative mb-4">
                <label
                  htmlFor="oldPassword"
                  className="text-[14px] text-text_color_light block"
                >
                  Old Password
                </label>
                <div className="relative">
                  <Field
                    type={showPassword ? "text" : "password"}
                    id="oldPassword"
                    name="oldPassword"
                    placeholder="Enter old password"
                    className={`
                   mt-1 w-full rounded-md border bg-text_color_dark dark:text-text_color_light p-3 focus:outline-none focus:right-2 focus:border-primary_color  ${
                     touched.oldPassword && errors.oldPassword
                       ? "border-custom_red"
                       : ""
                   }`}
                  />
                  {!showPassword ? (
                    <IoEyeOffSharp
                      onClick={() => handleShowPassword()}
                      className="absolute text-text_color_light right-2 top-5 cursor-pointer"
                    />
                  ) : (
                    <IoEyeSharp
                      onClick={() => handleShowPassword()}
                      className="absolute  text-text_color_light right-2 top-5 cursor-pointer"
                    />
                  )}
                </div>

                {errors.oldPassword && touched.oldPassword && (
                  <div className="relative items-center justify-center flex top-[22px]	">
                    <div
                      className={`absolute z-10 w-auto  ${styles.popoverContainer} ${styles.popoverAnimation}`}
                    >
                      <p className={`text-text_body_16 ${styles.popoverText}`}>
                        {errors.newPassword}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* new Password */}
              <div className="relative mb-4">
                <label
                  htmlFor="newPassword"
                  className="text-[14px] text-text_color_light block"
                >
                  New Password
                </label>
                <div className="relative">
                  <Field
                    type={showNewPassword ? "text" : "password"}
                    id="newPassword"
                    name="newPassword"
                    placeholder="Enter new password"
                    className={`
                   mt-1 w-full rounded-md border bg-text_color_dark dark:text-text_color_light p-3 focus:outline-none focus:right-2 focus:border-primary_color  ${
                     touched.newPassword && errors.newPassword
                       ? "border-custom_red"
                       : ""
                   }`}
                  />
                  {!showPassword ? (
                    <IoEyeOffSharp
                      onClick={() => handleShowNewPassword()}
                      className="absolute text-text_color_light right-2 top-5 cursor-pointer"
                    />
                  ) : (
                    <IoEyeSharp
                      onClick={() => handleShowNewPassword()}
                      className="absolute  text-text_color_light right-2 top-5 cursor-pointer"
                    />
                  )}
                </div>

                {errors.newPassword && touched.newPassword && (
                  <div className="relative items-center justify-center flex top-[22px]	">
                    <div
                      className={`absolute z-10 w-auto  ${styles.popoverContainer} ${styles.popoverAnimation}`}
                    >
                      <p className={`text-text_body_16 ${styles.popoverText}`}>
                        {errors.newPassword}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Comfrim Password */}
              <div className="relative mb-4">
                <label
                  htmlFor="confirmPassword"
                  className="text-[14px] text-text_color_light block"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <Field
                    type={showconfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Enter Confirm Password"
                    className={`
                   mt-1 w-full rounded-md border bg-text_color_dark dark:text-text_color_light px-3 py-3 focus:outline-none focus:right-2 focus:border-primary_color  ${
                     touched.confirmPassword && errors.confirmPassword
                       ? "border-custom_red"
                       : ""
                   }`}
                  />
                  {!showconfirmPassword ? (
                    <IoEyeOffSharp
                      onClick={() => handleShowconfirmPassword()}
                      className="absolute text-text_color_light right-2 top-5 cursor-pointer"
                    />
                  ) : (
                    <IoEyeSharp
                      onClick={() => handleShowconfirmPassword()}
                      className="absolute  text-text_color_light right-2 top-5 cursor-pointer"
                    />
                  )}
                </div>

                {errors.confirmPassword && touched.confirmPassword && (
                  <div className="relative items-center justify-center flex top-[22px]	">
                    <div
                      className={`absolute z-10 w-auto  ${styles.popoverContainer} ${styles.popoverAnimation}`}
                    >
                      <p className={`text-text_body_16 ${styles.popoverText}`}>
                        {errors.confirmPassword}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Login Button */}
              <button
                disabled={isLoading}
                type="submit"
                className="w-full py-3 bg-primary_color text-text_color_light font-semibold flex justify-center rounded-[10px] "
              >
                {isLoading ? (
                  <div className="spinner-border animate-spin inline-block w-6 h-6 border-2 rounded-full border-t-2 border-text_color_light border-t-transparent"></div>
                ) : (
                  "Update Password"
                )}
              </button>
            </Form>
          )}
        </Formik>
        {/* line */}
        <hr className="text-text_color_desc_light opacity-10 my-10" />
      </section>
    </main>
  );
}
