"use client";
import { Field, Form, Formik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";
import * as Yup from "yup";
import styles from "@/components/FromLoginComponent/styles.module.css";

export default function FormUpdatePassowrd() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showconfirmPassword, setShowconfirmPassword] = useState(false);
  const validationSchema = Yup.object({
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
        "Password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number"
      )
      .required("Password is Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Password must match")
      .required("Confirm Password is Required"),
  });

  type InitValue = {
    password: string;
    confirmPassword: string;
  };

  const initialValues: InitValue = {
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = (value: InitValue) => {
    console.log(value);
    setIsLoading(true);
    // router.push("/verify");
  };
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
    // Toggle password visibility
  };
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
            Setting new <br />
            <span className="font-normal">Password</span>
          </p>
          <p className="text-text_body_16 text-ascend_color leading-[1.4] mt-2">
            Let&apos;s get started with your new password
          </p>
        </div>

        <div className="w-full h-[500px] items-end flex justify-center">
          <Image
            width={600}
            height={600}
            className="object-cover"
            alt="image login"
            src="/images/Login_page_image.png"
          />
        </div>
      </section>
      <section className="h-full  my-auto w-[40%] bg-text_color_dark  p-[40px] flex flex-col ">
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
          New Password
        </p>
        <p className="text-text_body_16 mt-5 text-text_color_desc_light">
          Set the new password for your account so you can login and access all
          features.
        </p>

        {/* form for input email */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="mt-10">
              {/* Password */}
              <div className="relative mb-4">
                <label
                  htmlFor="password"
                  className="text-[14px] text-text_color_light block"
                >
                  Password
                </label>
                <div className="relative">
                  <Field
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Enter password"
                    className={`
                   mt-1 w-full rounded-md border bg-text_color_dark dark:text-text_color_light p-3 focus:outline-none focus:right-2 focus:border-primary_color  ${
                     touched.password && errors.password
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

                {errors.password && touched.password && (
                  <div className="relative items-center justify-center flex top-[22px]	">
                    <div
                      className={`absolute z-10 w-auto  ${styles.popoverContainer} ${styles.popoverAnimation}`}
                    >
                      <p className={`text-text_body_16 ${styles.popoverText}`}>
                        {errors.password}
                      </p>
                    </div>
                  </div>
                )}
              </div>
              {/* Comfrim Password */}
              <div className="relative mb-4">
                <label
                  htmlFor="password"
                  className="text-[14px] text-text_color_light block"
                >
                  ConfirmPassword
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
