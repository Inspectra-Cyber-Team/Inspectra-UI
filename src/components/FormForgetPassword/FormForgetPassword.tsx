"use client";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Link from "next/link";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import * as Yup from "yup";
import styles from "@/components/FromLoginComponent/styles.module.css";
import { useRouter } from "next/navigation";
import { IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CountdownTimer from "@/lib/countTime";
import { OtpType } from "@/data/Otp";
import { DialogDescription } from "@radix-ui/react-dialog";
import {
  useRequestPasswordResetMutation,
  useResetPasswordMutation,
} from "@/redux/service/auth";
import { useToast } from "../hooks/use-toast";
import { MdCheckCircle } from "react-icons/md";

const validationSchemaOpt = Yup.object({
  otp1: Yup.string().required("OTP 1 is required "),
  otp2: Yup.string().required("OTP 2 is required "),
  otp3: Yup.string().required("OTP 3 is required "),
  otp4: Yup.string().required("OTP 4 is required "),
  otp5: Yup.string().required("OTP 5 is required "),
  otp6: Yup.string().required("OTP 6 is required "),
});

const initialOtpValues: OtpType = {
  otp1: "",
  otp2: "",
  otp3: "",
  otp4: "",
  otp5: "",
  otp6: "",
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is Required."),
});

type Email = {
  email: string;
};

const initialValues: Email = {
  email: "",
};

const initialPasswordValues = {
  newPassword: "",
  confirmPassword: ""
}

// for filed
const validationSchemaPassword = Yup.object({
  newPassword: Yup.string()
    .required("New Password is required")
    .min(8, "Password must be at least 8 characters"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), undefined], "Passwords must match")
    .required("Confirm Password is required"),
});

export default function FormForgetPassowrd() {

  const { toast } = useToast();

  const router = useRouter();

  const [timerKey, setTimerKey] = useState(0); // State to restart timer

  const [openModal, setOpenModal] = useState(false);

  const [alertOpen,setAlertOpen] = useState(false)

  const [otp, setOtp] = useState("");

  const [email, setEmail] = useState("");

  const [emailVerified, setEmailVerified] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitOtp = (values: OtpType) => {

    setIsLoading(true);
    const otp = Object.values(values).join("");

    if (otp.length === 6) {
      setOtp(otp);
      setEmailVerified(true);
    }
    setOpenModal(false);
  };

  const [showPassword, setShowPassword] = useState(false);

  const [showPassword1, setShowPassword1] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleShowPassword1 = () => {
    setShowPassword1(!showPassword1);
  };

  // calling rtk
  const [requestPasswordReset] = useRequestPasswordResetMutation();
  const [resetPassword] = useResetPasswordMutation();

  const handleRequestPasswordReset = async (email: string) => {
    try {
      setEmail(email);

      setIsLoading(true);

      const response = await requestPasswordReset({ email });

      if (response.data) {
        toast({
          description: "OTP sent to your email successfully!",
          variant: "success",
        });
        setIsLoading(false);
        setOpenModal(true);
      } else {
        toast({
          description: "Failed to send OTP. Please try again!",
          variant: "error",
        });
      }
    } catch {
      toast({
        description: "Failed to send OTP. Please try again!",
        variant: "error",
      });
    }
  };

  // handle submit change password
  const handleSubmitchangePassword = async (values: any) => {
    try {
      const response = await resetPassword({
        data: {
          email: email,
          otp: otp,
          newPassword: values.newPassword,
          confirmPassword: values.confirmPassword,
        },
      });

      if (response.data) {
        toast({
          description: "Password changed successfully!",
          variant: "success",
        });

        //  when success call alert modal
        setAlertOpen(true)
      } else {
        toast({
          description: "Failed to change password. Please try again!",
          variant: "error",
        });
      }
    } catch {
      toast({
        description: "Failed to change password. Please try again!",
        variant: "error",
      });
    }
  };

  const handleResentCode = async () => {
    try {
      setIsLoading(true);

      const response = await requestPasswordReset({ email });

      if (response.data) {
        setTimerKey((prevKey) => prevKey + 1);

        toast({
          description: "OTP sent to your email successfully!",
          variant: "success",
        });
        setOpenModal(true);
      } else {
        toast({
          description: "Failed to send OTP. Please try again!",
          variant: "error",
        });
      }
    } catch {
      toast({
        description: "Failed to send OTP. Please try again!",
        variant: "error",
      });
    }
  };

  const handleCloseAlert = () => {
    setAlertOpen(false)
    router.push("/login")
  }

  return (
    <main className="h-screen w-full mx-auto flex ">
      {/* section welcome */}
      <section className=" hidden h-full xl:flex flex-col items-center justify-between w-[60%] bg-primary_color py-[40px] ">
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
          Forget Password
        </p>
        <p className="text-text_body_16 mt-5 text-text_color_desc_light">
          Enter your email for the verification process, we will send 6 digits
          code to your email.
        </p>

        {/* conditon is here */}
        {!emailVerified ? (
          // Email Verification Form
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              await handleRequestPasswordReset(values?.email);
            }}
          >
            {({ errors, touched }) => (
              <Form className="mt-10">
                <div className="mb-4 ">
                  <label
                    htmlFor="email"
                    className="text-[14px] font-normal text-text_color_light block"
                  >
                    Email
                  </label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    placeholder="username@gmail.com"
                    className={`mt-1 w-full rounded-md border border-text_color_desc_light bg-text_color_dark dark:text-text_color_light px-3 py-3 focus:outline-none focus:right-2 focus:border-primary_color ${
                      touched.email && errors.email ? "border-custom_red" : ""
                    }`}
                  />
                  {errors.email && touched.email && (
                    <div className="relative items-center justify-center flex top-[22px]	">
                      <div
                        className={`absolute z-10 w-auto  ${styles.popoverContainer} ${styles.popoverAnimation}`}
                      >
                        <p
                          className={`text-text_body_16 ${styles.popoverText}`}
                        >
                          {errors.email}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-primary_color text-text_color_light font-semibold flex justify-center rounded-[10px]"
                  disabled={isLoading}
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
        ) : (
          // Password Change Form
          <Formik
            initialValues={initialPasswordValues}
            validationSchema={validationSchemaPassword}
            onSubmit={async (Values,{resetForm}) => {
              await handleSubmitchangePassword(Values);
              resetForm();
            }}
          >
            {({ isSubmitting }) => (
              <Form className="grid gap-6 mt-6">
                <div className="grid gap-2 relative">
                  <label
                    htmlFor="newPassword"
                    className="block text-sm font-medium"
                  >
                    New Password <span className="text-red-500">*</span>
                  </label>
                  <Field
                    className="w-full rounded-lg border p-4 text-sm"
                    name="newPassword"
                    id="newPassword"
                    placeholder="Enter your new password"
                    autoComplete="new-password"
                    type={showPassword ? "text" : "password"}
                  />
                  {!showPassword ? (
                    <IoEyeOffSharp
                      className="cursor-pointer absolute right-4 top-[42px] text-gray-500"
                      onClick={handleShowPassword}
                      size={20}
                    />
                  ) : (
                    <IoEyeSharp
                      className="cursor-pointer absolute right-4 top-[42px] text-gray-500"
                      onClick={handleShowPassword}
                      size={20}
                    />
                  )}
                  <ErrorMessage
                    className="text-red-500 text-sm mt-1"
                    component="div"
                    name="newPassword"
                  />
                </div>
                <div className="grid gap-2 relative">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium"
                  >
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <Field
                    className="w-full rounded-lg border p-4 text-sm"
                    name="confirmPassword"
                    placeholder="Confirm your new password"
                    type={showPassword1 ? "text" : "password"}
                  />
                  {!showPassword1 ? (
                    <IoEyeOffSharp
                      className="cursor-pointer absolute right-4 top-[42px] text-gray-500"
                      onClick={handleShowPassword1}
                      size={20}
                    />
                  ) : (
                    <IoEyeSharp
                      className="cursor-pointer absolute right-4 top-[42px] text-gray-500"
                      onClick={handleShowPassword1}
                      size={20}
                    />
                  )}
                  <ErrorMessage
                    className="text-red-500 text-sm mt-1"
                    component="div"
                    name="confirmPassword"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-primary_color text-text_color_light font-semibold flex justify-center rounded-[10px]"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full border-t-2 border-primary-foreground border-t-transparent"></div>
                  ) : (
                    "Submit"
                  )}
                </button>
              </Form>
            )}
          </Formik>
        )}

        {/* line */}
        <hr className="text-text_color_desc_light opacity-1 my-10" />
        <div className="w-full text-text_body_16 text-center flex justify-center">
          <p className="text-text_color_light ">Don&apos;t have an account?</p>{" "}
          <p
            onClick={() => router.push("/signup")}
            className="text-link_color cursor-pointer  underline pl-2"
          >
            Sign up now
          </p>
        </div>
      </section>

      {/* Modal for OTP Input */}
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent className="bg-card w-full max-w-[90%] md:max-w-md lg:max-w-xl mx-auto h-fit rounded-xl">
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Enter your 6 digits code you received on your email.
          </DialogDescription>

          <Formik
            initialValues={initialOtpValues}
            validationSchema={validationSchemaOpt}
            onSubmit={(values,{resetForm}) => {
               handleSubmitOtp(values);
               resetForm();
            }}
          >
            {({ values, handleChange }) => (
              <Form>
                <div className="flex justify-between m-5">
                  {Array.from({ length: 6 }, (_, index) => {
                    const fieldName = `otp${index + 1}` as keyof OtpType;
                    return (
                      <Field
                        key={index}
                        type="text"
                        id={fieldName}
                        name={fieldName}
                        maxLength={1} // Restrict each field to a single character
                        value={values[fieldName]} // Dynamically update value
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        onChange={(e: { target: { value: any } }) => {
                          handleChange(e); // Update Formik state
                          const value = e.target.value;
                          const nextField = document.getElementById(
                            `otp${index + 2}`
                          );
                          if (value && nextField) {
                            nextField.focus(); // Focus on the next field if input is valid
                          }
                        }}
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        onKeyDown={(e: {
                          key: string;
                          target: { value: any };
                        }) => {
                          if (e.key === "Backspace") {
                            const value = e.target.value;
                            if (!value && index > 0) {
                              // If field is empty and it's not the first input, focus on the previous field
                              const prevField = document.getElementById(
                                `otp${index}`
                              );
                              if (prevField) {
                                prevField.focus();
                              }
                            }
                          }
                        }}
                        className={`h-[40px] w-[40px] md:w-[60px] md:h-[60px] border focus:right-2 border-text_color_desc_light rounded-md text-center text-text_body_16`}
                        placeholder="_" // Placeholder for empty fields
                      />
                    );
                  })}
                </div>
                <p className=" text-center text-[16px] font-normal text-ascend_color">
                  {<CountdownTimer key={timerKey} minutes={2} />}
                </p>
                <button
                  type="submit"
                  className="w-full mt-3 py-3 bg-primary_color text-text_color_light font-semibold flex justify-center rounded-[10px]"
                >
                  Verify
                </button>

                <div className="text-center">
                  <p className="text-text_body_16 text-text_color_light m-5">
                    If you didn&apos;t receive a code! <br />{" "}
                    <span
                      className="text-link_color underline cursor-pointer"
                      onClick={() => handleResentCode()}
                    >
                      Resend
                    </span>
                  </p>
                </div>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>

      {/* modal alert success fully */}
      <Dialog open={alertOpen} onOpenChange={setAlertOpen}>
        <DialogContent className="bg-white dark:bg-background_dark_mode max-w-lg  p-[50px]  w-full mx-auto">
          <MdCheckCircle size={100} className="text-primary_color mx-auto" />
          <div className="text-center">
            <p className="font-bold text-text_header_34">Successfully</p>
            <p className=" mt-4 text-center text-md dark:text-text_color_desc_dark">
              Your password has been reset successfully.
            </p>
          </div>
          <button
            type="submit"
            className="w-full  py-3 bg-primary_color text-text_color_light font-semibold flex justify-center rounded-[10px]"
            onClick={handleCloseAlert}
          >
            Continue
          </button>
        </DialogContent>
      </Dialog>
    </main>
  );
}
