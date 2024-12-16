"use client";
import { Field, Form, Formik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import * as Yup from "yup";
import styles from "@/components/FromLoginComponent/styles.module.css";
import { useRouter } from "next/navigation";
export default function FormForgetPassowrd() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required(),
  });

  type Email = {
    email: string;
  };

  const initialValues: Email = {
    email: "",
  };

  const handleSubmit = (value: Email) => {
    console.log(value);
    setIsLoading(true);
    // router.push("/verify");
  };

  return (
    <main className="h-screen  w-full mx-auto flex ">
      {/* secontion welcome */}
      <section className=" hidden  h-full xl:flex flex-col items-center justify-between w-[60%] bg-primary_color py-[40px] ">
        <div className="w-full px-[100px]">
          <p className="text-[60px] text-text_color_light font-semibold leading-[1.2]">
            Forget Password <br />
            <span className="font-normal">Account</span>
          </p>
          <p className="text-text_body_16 text-ascend_color leading-[1.4] mt-2">
            Enter your email for the verification process, we will send 6 digits
            code to your email.
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
          Forget Password
        </p>
        <p className="text-text_body_16 mt-5 text-text_color_desc_light">
          Enter your email for the verification process, we will send 6 digits
          code to your email.
        </p>

        {/* form for input email */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="mt-10">
              {/* Emial */}
              <div className="mb-4 ">
                <label
                  htmlFor="email"
                  className="text-[14px] font-normal text-text_color_light block "
                >
                  Email
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  placeholder="username@gmail.com"
                  className={`mt-1 w-full rounded-md border border-text_color_desc_light  bg-text_color_dark dark:text-text_color_light px-3 py-3 focus:outline-none focus:right-2 focus:border-primary_color   ${
                    touched.email && errors.email ? "border-custom_red" : ""
                  }`}
                />
                {errors.email && touched.email && (
                  <div className="relative items-center justify-center flex top-[17px]	">
                    <div
                      className={`absolute z-10 w-auto  ${styles.popoverContainer} ${styles.popoverAnimation}`}
                    >
                      <p className={`text-text_body_16 ${styles.popoverText}`}>
                        {errors.email}
                      </p>
                    </div>
                  </div>
                )}
              </div>
              {/* Emial */}

              {/* Login Button */}
              <button
                disabled={isLoading}
                type="submit"
                className="w-full py-3 bg-primary_color text-text_color_light font-semibold flex justify-center rounded-[10px] "
              >
                {isLoading ? (
                  <div className="spinner-border animate-spin inline-block w-6 h-6 border-2 rounded-full border-t-2 border-text_color_light border-t-transparent"></div>
                ) : (
                  "Verify Email"
                )}
              </button>
            </Form>
          )}
        </Formik>
        {/* line */}
        <hr className="text-text_color_desc_light opacity-10 my-10" />
        <div className="w-full text-text_body_16 text-center flex justify-center">
          <p
            onClick={() => router.push("/verify")}
            className="text-text_color_light "
          >
            Don&apos;t have an account?
          </p>{" "}
          <p
            onClick={() => router.push("/signup")}
            className="text-link_color cursor-pointer  underline pl-2"
          >
            Sign up now
          </p>
        </div>
      </section>
    </main>
  );
}
