"use client";
import { useToast } from "@/components/hooks/use-toast";
import { useCreateUserFeedbackMutation } from "@/redux/service/feedback";
import { createFeedbackType } from "@/types/Feedback";

import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useTheme } from "next-themes";
import { use, useEffect, useState } from "react";
import Aos from 'aos';
import { useRouter } from "next/navigation";
export default function FeedbackComponent() {
  const { theme } = useTheme();
  const { toast } = useToast();
  const router = useRouter();
  const [createUserFeedback] = useCreateUserFeedbackMutation();
  useEffect(() => {
                Aos.init({ duration: 1000 });
              }, []);

  const [userUUID, setUserUUID] = useState("");
  const initialValues: createFeedbackType = {
    message: "",
  };

  const validationSchema = Yup.object({
    message: Yup.string()
      .required("Feedback message is required")
      .min(3, "Message must be at least 3 characters")

  });

  const handleSubmit = async (values: createFeedbackType) => {
    try {
      await createUserFeedback({ message: values });
      if (userUUID) {
        toast({
          description: "Thank you for your feedback! Our team will review it.",
          variant: "success",
        });
        values.message = "";
      } else {
        toast({
          description: "Please login to give feedback",
          variant: "error",
        });
        router.push("/login");
      }
    } catch (error) {
      toast({
        description: `${error}`,
      });
    }
  };

  useEffect(() => {
    setUserUUID(localStorage.getItem("userUUID") || "");
  });

  return (
    <section className="w-[90%] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 py-10">
      <div className="p-14 flex flex-col gap-5 bg-text_color_dark dark:bg-card_color_dark rounded-xl">
        {/* Title Section */}
        <div className="inline-block px-5 font-semibold bg-primary_color py-2 rounded-tl-[20px] rounded-br-[20px] w-max">
          <p className="text-text_color_light md:text-text_title_20 text-text_body_16" data-aos="fade-right">
            Be the first to FeedBack
          </p>
        </div>

        {/* Description */}
        <p className="md:text-lg text-text_color_desc_light dark:text-text_color_desc_dark font-normal" data-aos="fade-right">
          Feel Free to Share Your Experience with Us and other Users
        </p>

        {/* Textarea */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <Field
                type="text"
                id="message"
                name="message"
                placeholder="Your Message"
                className={`mt-1 w-full border px-5 mb-2 rounded-tl-[20px] rounded-br-[20px] pb-[100px] min-h-[150px] bg-text_color_dark dark:bg-card_color_dark focus:outline-none focus:right-2 focus:border-text_color_light ${
                  errors.message && touched.message ? "border-red-500" : ""
                }`}
              />
              {errors.message && touched.message && (
                <p className="text-red-500 text-sm mb-2">{errors.message}</p>
              )}

              <button
                type="submit"
                className="inline-block px-5 font-semibold bg-background_dark_mode py-2 rounded-tl-[20px] rounded-br-[20px] w-max" 
              >
                <p className="text-text_color_dark text-text_body_16 font-normal">
                  Submit
                </p>
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <div className="w-[400px] h-[400px] hidden lg:block mx-auto" data-aos="fade-left">
        {theme === "dark" ? (
          <img
            className="w-[100%] h-[100%] object-contain"
            src="/images/feedback-white.png"
            alt="feedback"
          />
        ) : (
          <img
            className="w-[100%] h-[100%] object-contain"
            src="/images/feedback.png"
            alt="feedback"
          />
        )}
      </div>
    </section>
  );
}
