"use client";
import { convertToDayMonthYear } from "@/lib/utils";
import { useGetAllUserFeedbackQuery } from "@/redux/service/feedback";
import { feedbackType } from "@/types/Feedback";
import Aos from "aos";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function FeedbackCard() {
  const { data } = useGetAllUserFeedbackQuery({});
  const [displayedItems, setDisplayedItems] = useState<any>([]);
  const [itemsToShow, setItemsToShow] = useState(3);

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1200) {
        setItemsToShow(2);
      } else {
        setItemsToShow(3);
      }
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (data?.data && Array.isArray(data.data)) {
      const dataLength = data.data.length;
      const items = data.data.slice(-itemsToShow);
      setDisplayedItems(items);
    }
  }, [data, itemsToShow]);

  return (
    <div>
      <p className="text-text_header_34 px-5 py-1 inline rounded-tl-[20px] text-text_color_light rounded-br-[20px] bg-primary_color font-semibold ">
        User Feedback
      </p>
      <div
        className="grid gap-10 lg:my-[80px] grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-items-center  xl:justify-items-between my-10"
       
        data-aos="fade-up"
      >
        {displayedItems?.map((feedback: feedbackType, index: number) => (
          <motion.div
            key={index}
            className="w-full h-full rounded-[20px] p-5 text-text_color_light dark:text-text_color_dark bg-card_color_light dark:bg-card_color_dark flex flex-col justify-between hover:bg-[#F4FFF4] hover:ring-ascend_color hover:ring-1"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Feedback content */}
            <p className="text-text_color_light text-start text-text_body_16 dark:text-text_color_dark">
              {feedback?.message}
            </p>
            <div>
              <hr className="my-5" />
              <div className="w-full flex justify-between items-center">
                <div className="text-text_color_desc_light dark:text-text_color_desc_dark text-text_body_16 flex flex-col justify-start items-start">
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
          </motion.div>
        ))}
      </div>
    </div>
  );
}
