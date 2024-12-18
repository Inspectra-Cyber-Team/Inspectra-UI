"use client";
import CountdownTimer from "@/lib/countTime";
import {
  useReVerifyUserAccountMutation,
  useVerifyUserAccountMutation,
} from "@/redux/service/verify";
import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { toast } from "../hooks/use-toast";
import { useRouter } from "next/navigation";
import { OtpType } from "@/data/Otp";
import { useAppSelector } from "@/redux/hooks";
export default function VerifyComponent() {
  const [verifyUserAccount, { isSuccess, isError }] =
    useVerifyUserAccountMutation();
  const [reVerifyUserAccount] = useReVerifyUserAccountMutation();
  const email = useAppSelector((state) => state.user.email);
  const [timerKey, setTimerKey] = useState(0); // State to restart timer
  const initialValues: OtpType = {
    otp1: "",
    otp2: "",
    otp3: "",
    otp4: "",
    otp5: "",
    otp6: "",
  };

  const validationSchema = Yup.object({
    otp1: Yup.string().required("OTP 1 is required "),
    otp2: Yup.string().required("OTP 2 is required "),
    otp3: Yup.string().required("OTP 3 is required "),
    otp4: Yup.string().required("OTP 4 is required "),
    otp5: Yup.string().required("OTP 5 is required "),
    otp6: Yup.string().required("OTP 6 is required "),
  });
  const router = useRouter();
  const handleSubmit = (values: OtpType) => {
    const otp = Object.values(values).join("");
    verifyUserAccount({ data: { email, otp } });
  };
 
  const handleResend = async () => {
    setTimerKey((prevKey) => prevKey + 1);
    try {
      reVerifyUserAccount({ email });
      toast({
        description: "Check Your Email For Verify Code",
        variant: "success",
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      if (isSuccess) {
        toast({
          description: "Verification Successfully ",
          variant: "success",
        });
        router.push("/login");
      } else if (isError) {
        toast({
          description: "Verification Fail ",
          variant: "error",
        });
      }
    } catch (error) {
      toast({
        description: `${error}`,
        variant: "error",
      });
    }
  }, [isSuccess, isError]);
  return (
    <section className="w-full ">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          handleSubmit(values);
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
                    onKeyDown={(e: { key: string; target: { value: any } }) => {
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
            <button
              type="submit"
              className="w-full mt-10 py-3 bg-primary_color text-text_color_light font-semibold flex justify-center rounded-[10px]"
            >
              Verify
            </button>
            <p className="text-text_title_20 font-normal my-5 text-ascend_color">
              {<CountdownTimer key={timerKey} minutes={2} />}
            </p>
            <p className="text-text_body_16 text-text_color_light m-5">
              If you didn&apos;t receive a code! <br />{" "}
              <span
                className="text-link_color underline cursor-pointer"
                onClick={handleResend}
              >
                Resend
              </span>
            </p>
          </Form>
        )}
      </Formik>
    </section>
  );
}
