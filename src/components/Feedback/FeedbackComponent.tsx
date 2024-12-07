"use client";
import { useToast } from "@/components/hooks/use-toast";
import { useCreateUserFeedbackMutation } from "@/redux/service/feedback";
import { createFeedbackType } from "@/types/Feedback";

import { Field, Form, Formik } from "formik";
import { useTheme } from "next-themes";
export default function FeedbackComponent() {
  const { theme } = useTheme();
  const { toast } = useToast();
  const [createUserFeedback] =
    useCreateUserFeedbackMutation();

  const initialValues: createFeedbackType = {
    message: "",
  };

  const handleSubmit = async (values: createFeedbackType) => {

    console.log(values);
    try {

        const ressponse = await createUserFeedback({ message: values });
        console.log(ressponse);
        toast({
          description: "Thank For FeedBack Our Team Will Review It",
          variant: "success",
        });
      } catch (error) {
      toast({
        description: `${error}`,
      });
    }
    }

  return (
    <section className="w-[90%] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div className="p-14 flex flex-col gap-5 bg-text_color_dark dark:bg-card_color_dark rounded-xl">
        {/* Title Section */}
        <div className="inline-block px-5 font-semibold bg-primary_color py-2 rounded-tl-[20px] rounded-br-[20px] w-max">
          <p className="text-text_color_light text-text_title_20">
            Be the first to FeedBack
          </p>
        </div>

        {/* Description */}
        <p className="text-text_body_16 text-text_color_desc_light dark:text-text_color_desc_dark font-normal">
          Feel Free to Share Your Experience with Us and other Users
        </p>

        {/* Textarea */}
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
        >
          <Form>
            <Field
              type="text"
              id="message"
              name="message"
              placeholder="Your Message"
              className={`mt-1 w-full border mb-5 rounded-tl-[20px] rounded-br-[20px]  pb-[100px] min-h-[150px] bg-text_color_dark dark:text-text_color_light  focus:outline-none focus:right-2 focus:border-text_color_light   `}
            />

            <button
              type="submit"
              className="inline-block px-5 font-semibold bg-background_dark_mode py-2 rounded-tl-[20px] rounded-br-[20px] w-max"
            >
              <p className="text-text_color_dark text-text_body_16 font-normal">
                Submit
              </p>
            </button>
          </Form>
        </Formik>
        {/* Button */}
      </div>
      <div className="w-[400px] h-[400px] hidden lg:block mx-auto">
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
