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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function FormSignUpComponent() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showconfirmPassword, setShowconfirmPassword] = useState(false);
  const [register] = useRegisterMutation();
  const dispatch = useAppDispatch();
  const validationSchema = Yup.object({
    userName: Yup.string().required("Username is Required"),
    firstName: Yup.string().required("First Name is Required"),
    lastName: Yup.string().required("Last Name is Required"),
    position: Yup.string().required("Position is Required"),
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
    privacyPolicy: Yup.boolean()
      .oneOf([true], "You must accept the Privacy Policy")
      .required("Accepting the Privacy Policy is required"),
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

  const [selectedPosition, setSelectedPosition] = useState("");

  const handleSelectChange = (value: any) => {
    setSelectedPosition(value);
  };

  const initialValues = {
    firstName: "",
    lastName: "",
    position: "",
    email: "",
    userName: "",
    password: "",
    confirmPassword: "",
    privacyPolicy: false,
  };

  // State for Privacy Policy Modal visibility
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  // State for Privacy Policy checkbox
  const [privacyPolicyAccepted, setPrivacyPolicyAccepted] = useState(false);

  // Handler to show the Privacy Policy Modal
  const handleShowPrivacyModal = () => {
    setShowPrivacyModal(true);
  };

  // Handler to close the Privacy Policy Modal
  const handleClosePrivacyModal = () => {
    setShowPrivacyModal(false);
  };

  const handleSubmit = async (values: SigUpFormValues) => {
    setIsLoading(true);
    try {
      register({ user: values });
      router.push("/verify");
      dispatch(setUserEmail(values.email));
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
            <div className="w-full md:w-1/2">
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

          {/* Email */}
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
              <div className="relative items-center justify-center flex top-[22px]	">
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
          {/* Username and Job Position */}
          <div className="flex flex-col  justify-between md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-4">
            {/* Username */}
            <div className="w-full">
              <label
                htmlFor="userName"
                className="text-[14px] text-text_color_light block "
              >
                Username
              </label>
              <Field
                type="text"
                id="userName"
                name="userName"
                placeholder="UserName"
                className={`mt-1 w-full rounded-md border  bg-text_color_dark dark:text-text_color_light px-3 py-3 focus:outline-none focus:right-2 focus:border-primary_color ${
                  touched.userName && errors.userName ? "border-custom_red" : ""
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

              {/* job position */}
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="position"
                className="text-[14px] text-text_color_light block"
              >
                Job Position
              </label>
              <div className="relative">
                <Field
                  className={`${
                    touched.userName && errors.userName
                      ? "border-custom_red"
                      : ""
                  }`}
                  name="position"
                >
                  {({ field, form }: any) => (
                    <Select
                      value={field.value} // Bind Formik's value
                      onValueChange={(value) =>
                        form.setFieldValue("position", value)
                      } // Update Formik's state
                    >
                      <SelectTrigger className="md:w-[180px] h-[50px] mt-[4px] bg-white outline-none border-desc-light focus:outline-none focus:ring-0 focus:ring-offset-0 text-text_color_light dark:text-text_color_light w-full">
                        <SelectValue placeholder="Position" />
                      </SelectTrigger>
                      <SelectContent className=" dark:bg-background_light_mode dark:text-text_color_light dark:border-text_color_desc_light shadow-md ">
                        <SelectItem value="Software Engineer">
                          Software Engineer
                        </SelectItem>
                        <SelectItem value="Product Manager">
                          Product Manager
                        </SelectItem>
                        <SelectItem value="UI/UX Designer">
                          UI/UX Designer
                        </SelectItem>
                        <SelectItem value="Pentester">Pentester</SelectItem>
                        <SelectItem value="Data Analyst">
                          Data Analyst
                        </SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </Field>
              </div>

              {errors.position && touched.position && (
                <div className="relative items-center justify-center flex top-[22px]">
                  <div
                    className={`absolute z-10 w-auto ${styles.popoverContainer} ${styles.popoverAnimation}`}
                  >
                    <p className={`text-text_body_16 ${styles.popoverText}`}>
                      {errors.position}
                    </p>
                  </div>
                </div>
              )}
            </div>
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

          {/* Privacy Policy Checkbox */}
          <div className="flex items-center mb-4">
            <Field
              type="checkbox"
              id="privacyPolicy"
              name="privacyPolicy"
              className="mr-2 cursor-pointer"
            />
            <label
              htmlFor="privacyPolicy"
              className="text-[14px] text-text_color_light"
            >
              I agree to the
              <span
                className="text-link_color underline cursor-pointer ml-1"
                onClick={handleShowPrivacyModal}
              >
                Privacy Policy
              </span>
            </label>
          </div>
          {errors.privacyPolicy && touched.privacyPolicy && (
            <div className="relative items-center flex top-0	">
              <div
                className={`absolute z-10 w-auto  ${styles.popoverContainer} ${styles.popoverAnimation}`}
              >
                <p className={`text-text_body_16 ${styles.popoverText}`}>
                  {errors.privacyPolicy}
                </p>
              </div>
            </div>
          )}

          {/* Privacy Policy Modal */}
          {showPrivacyModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
                <h2 className="text-text_title_20 font-semibold mb-4 dark:text-text_color_light">
                  Privacy Policy
                </h2>
                <p className="text-text_body_16 text-text_color_desc_light">
                  Your project data is encrypted and securely stored. Only you
                  have access to your data. We ensure complete privacy and
                  security for your information.
                </p>
                <div className="mt-4 flex justify-end">
                  <button
                    className="px-4 py-2 bg-primary_color text-background_dark_mode rounded-md"
                    onClick={handleClosePrivacyModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
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
