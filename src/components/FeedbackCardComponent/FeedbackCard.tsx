"use client";
import React, { useEffect, useState } from "react";
import { useGetAllUserFeedbackQuery } from "@/redux/service/feedback";
import { convertToDayMonthYear, getLatestCreatedAt } from "@/lib/utils";
import Image from "next/image";
import Aos from "aos";
import { feedbackType } from "@/types/Feedback";

export default function FeedbackCard() {
  const { data } = useGetAllUserFeedbackQuery({});
  const [sliceCount, setSliceCount] = useState(3);
  const [lastThreeItems, setLastThreeItems] = useState<any>([]);

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

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

  useEffect(() => {
    if (data?.data && Array.isArray(data.data)) {
      const items = [];
      const dataLength = data.data.length;

      // If there are fewer than 3 items, get all items
      if (dataLength <= 3) {
        setLastThreeItems(data.data);
      } else {
        // Otherwise, manually get the last 3 items
        for (let i = dataLength - 3; i < dataLength; i++) {
          items.push(data.data[i]);
        }
        setLastThreeItems(items);
      }
    }
  }, [data]);

  return (
    <div>
      <p className="text-text_header_34 px-5 py-1 inline rounded-tl-[20px] text-text_color_light rounded-br-[20px] bg-primary_color font-semibold ">
        User Feedback
      </p>
      <div
        className="grid gap-10 lg:my-[80px] grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-items-center xl:justify-items-between my-10"
        data-aos="fade-up"
      >
        {lastThreeItems?.map((feedback: feedbackType, index: number) => (
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
    </div>
  );
}
