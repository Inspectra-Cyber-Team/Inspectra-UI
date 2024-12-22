"use client";
import styles from "@/components/FromLoginComponent/styles.module.css";
import { useRegisterMutation } from "@/redux/service/auth";
import { SigUpFormValues } from "@/types/FormType";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";
import * as Yup from "yup";
import { useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { setUserEmail } from "@/redux/feature/userSlice";
export default function FormSignUpComponent() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showconfirmPassword, setShowconfirmPassword] = useState(false);
  const [register] = useRegisterMutation();
  const dispatch = useAppDispatch();
  const validationSchema = Yup.object({
    userName: Yup.string().required("userName is Required"),
    firstName: Yup.string().required("First Name is Required"),
    lastName: Yup.string().required("Last Name is Required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is Required"),
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

  const router = useRouter();
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
    // Toggle password visibility
  };
  const handleShowconfirmPassword = () => {
    setShowconfirmPassword(!showconfirmPassword);
    // Toggle password visibility
  };

  const initialValues = {
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = async (values: SigUpFormValues) => {
    setIsLoading(true);
    try {
      register({ user: values });
      router.push("/verify");
      dispatch(setUserEmail(values.email))
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
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
          {/* first name and last name */}
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0  md:space-x-4  mb-4">
            {/* First Name */}
            <div className=" w-full md:w-1/2">
              <label
                htmlFor="firstName"
                className="text-[14px] text-text_color_light block"
              >
                First Name
              </label>
              <Field
                type="text"
                id="firstName"
                name="firstName"
                placeholder="First Name"
                className={`mt-1 w-full rounded-md border bg-text_color_dark dark:text-text_color_light px-3 py-3 focus:outline-none focus:right-2 focus:border-primary_color ${
                  touched.firstName && errors.firstName
                    ? "border-custom_red"
                    : ""
                }`}
              />
              {errors.firstName && touched.firstName && (
                <div className="relative items-center justify-center flex top-[22px]">
                  <div
                    className={`absolute z-10 w-auto ${styles.popoverContainer} ${styles.popoverAnimation}`}
                  >
                    <p className={`text-text_body_16 ${styles.popoverText}`}>
                      {errors.firstName}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Last Name */}
            <div className="w-full   md:w-1/2">
              <label
                htmlFor="lastName"
                className="text-[14px] text-text_color_light block"
              >
                Last Name
              </label>
              <Field
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Last Name"
                className={`mt-1 w-full rounded-md border bg-text_color_dark dark:text-text_color_light px-3 py-3 focus:outline-none focus:right-2 focus:border-primary_color ${
                  touched.lastName && errors.lastName ? "border-custom_red" : ""
                }`}
              />
              {errors.lastName && touched.lastName && (
                <div className="relative items-center justify-center flex top-[22px]">
                  <div
                    className={`absolute z-10 w-auto ${styles.popoverContainer} ${styles.popoverAnimation}`}
                  >
                    <p className={`text-text_body_16 ${styles.popoverText}`}>
                      {errors.lastName}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

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
            {errors.lastName && touched.lastName && (
              <div className="relative items-center justify-center flex top-[22px]	">
                <div
                  className={`absolute z-10 w-auto  ${styles.popoverContainer} ${styles.popoverAnimation}`}
                >
                  <p className={`text-text_body_16 ${styles.popoverText}`}>
                    {errors.lastName}
                  </p>
                </div>
              </div>
            )}
          </div>
          {/* username */}
          <div className="mb-4">
            <label
              htmlFor="userName"
              className="text-[14px] text-text_color_light block "
            >
              UserName
            </label>
            <Field
              type="text"
              id="userName"
              name="userName"
              placeholder="UserName"
              className={`mt-1 w-full rounded-md border  bg-text_color_dark dark:text-text_color_light px-3 py-3 focus:outline-none focus:right-2 focus:border-primary_color   ${
                touched.email && errors.email ? "border-custom_red" : ""
              }`}
            />
            {errors.userName && touched.userName && (
              <div className="relative items-center justify-center flex top-[22px]">
                <div
                  className={`absolute z-10 w-auto ${styles.popoverContainer} ${styles.popoverAnimation}`}
                >
                  <p className={`text-text_body_16 ${styles.popoverText}`}>
                    {errors.userName}
                  </p>
                </div>
              </div>
            )}
          </div>
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
            className="w-full py-3 bg-primary_color text-text_color_light font-semibold flex justify-center rounded-[10px]"
          >
            {isLoading ? (
              <div className="spinner-border animate-spin inline-block w-6 h-6 border-2 rounded-full border-t-2 border-text_color_light border-t-transparent"></div>
            ) : (
              "Sign Up"
            )}
          </button>
        </Form>
      )}
    </Formik>
  );
}
