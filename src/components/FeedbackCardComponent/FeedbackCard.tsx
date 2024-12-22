"use client";
import React, { useEffect, useState } from "react";
import { feedbackType } from "@/types/Feedback";
import { useGetAllUserFeedbackQuery } from "@/redux/service/feedback";
import { convertToDayMonthYear } from "@/lib/utils";
import Image from "next/image";

export default function FeedbackCard() {
  const { data } = useGetAllUserFeedbackQuery({});
  const [sliceCount, setSliceCount] = useState(3);

  // Dynamically adjust slice count based on screen size
  useEffect(() => {
    const updateSliceCount = () => {
      const screenWidth = window.innerWidth;
      setSliceCount(screenWidth < 1200 ? 2 : 3); // Less than 1200px shows 2 items
    };

    updateSliceCount();
    window.addEventListener("resize", updateSliceCount);

    return () => window.removeEventListener("resize", updateSliceCount);
  }, []);

  const result = data?.content.slice(0, sliceCount);

  console.log("this is data", result);

  console.log("this is result", result);
  return (
    <div className="grid gap-10 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-items-center xl:justify-items-between my-10">
      {result?.map((feedback: feedbackType, index: number) => (
        <div
          key={index}
          className="w-full h-full rounded-[20px] p-5 text-text_color_light dark:text-text_color_dark bg-card_color_light dark:bg-card_color_dark flex flex-col justify-between"
        >
          {/* Feedback content */}
          <p className="text-text_color_light text-start text-text_body_16 dark:text-text_color_dark">
            {feedback?.message}
          </p>
          <div>
            <hr className="my-5" />
            <div className="w-full flex justify-between items-center">
              <div className="text-text_color_desc_light dark:text-text_color_desc_dark text-text_body_16">
                {feedback?.firstName} {feedback?.lastName}
                <p>{convertToDayMonthYear(feedback?.createdAt)}</p>
              </div>
              <div className="w-[50px] h-[50px] overflow-hidden rounded-full">
                <Image
                  unoptimized
                  src={`${feedback?.profile}`}
                  alt="Logo"
                  width={50}
                  height={50}
                  className="object-cover w-full h-full"
                  onError={(e) =>
                    (e.currentTarget.src = "/images/default-profile.jpg")
                  }
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
