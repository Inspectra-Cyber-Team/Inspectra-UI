"use client";
import styles from "@/components/FromLoginComponent/styles.module.css";
import { toast } from "@/components/hooks/use-toast";
import { FormValues } from "@/types/FormType";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";
import * as Yup from "yup";
export default function FormLoginComponent() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required(" Email is Required"),
    password: Yup.string().required("Password is Required"),
  });

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
    // Toggle password visibility
  };

  const initialValues: FormValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values: FormValues) => {

    console.log(values);
    setIsLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_LOCALHOST}login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
      if (res.status === 200) {
        const data = await res.json();
        setIsLoading(false);
        const userUUID = data?.user?.data?.uuid;
        localStorage.setItem("userUUID", userUUID);
        router.push("/");
      } else {
        setIsLoading(false);
        toast({
          description: "Invalid email or password",
          variant: "error",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        handleSubmit(values);
      }}
    >
      {({ errors, touched }) => (
        <Form>
          {/* Emial */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="text-[14px] text-text_color_light block "
            >
              Email
            </label>
            <Field
              type="email"
              id="email"
              name="email"
              placeholder="username@gmail.com"
              className={`mt-1 w-full rounded-md border  bg-text_color_dark dark:text-text_color_light px-3 py-3 focus:outline-none focus:right-2 focus:border-primary_color   ${
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
                   mt-1 w-full rounded-md border bg-text_color_dark dark:text-text_color_light px-3 py-3 focus:outline-none focus:right-2 focus:border-primary_color  ${
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
              <div className="relative items-center justify-center flex top-[17px]	">
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
          {/* Forget Password */}
          <div className="text-end pb-5">
            <p className="text-link_color text-[14px] underline font-medium">
              Forget Password?
            </p>
          </div>
          {/* Login Button */}
          <button
            disabled={isLoading}
            type="submit"
            className="w-full py-3 bg-primary_color text-text_color_light font-semibold flex justify-center rounded-[10px]"
          >
            {isLoading ? (
              <div className="spinner-border animate-spin inline-block w-6 h-6 border-2 rounded-full border-t-2 border-text_color_light border-t-transparent"></div>
            ) : (
              "Login"
            )}
          </button>
        </Form>
      )}
    </Formik>
  );
}
