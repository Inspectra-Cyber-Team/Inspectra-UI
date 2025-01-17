"use client";
import React, { useEffect } from "react";
import { benefitData } from "@/data/Benefit";
import { benefitType } from "@/types/BenefitType";
import { useTheme } from "next-themes";
import Aos from "aos";
import { motion } from "framer-motion";

export default function BenefitComponentCard() {
  const { theme } = useTheme();
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <div className=" flex flex-col items-center">
      <p className=" my-[40px] w-[180px] text-text_header_34 px-5 py-1  rounded-tl-[20px] text-text_color_light rounded-br-[20px] bg-primary_color font-semibold">
        Benefit
      </p>
      <div
        className="w-full   lg:my-[80px] grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-5 gap-y-5"
        data-aos="fade-up"
      >
        {/* w-full my-5 flex flex-col items-center xl:flex-row xl:justify-between */}
        {benefitData.map((item: benefitType, index) => (
          <motion.div
            key={index}
            className="rounded-[20px] bg-card_color_light hover:bg-[#F4FFF4] hover:ring-ascend_color hover:ring-1 dark:bg-card_color_dark py-5 my-5 w-full h-full items-center text-center flex flex-col justify-center "
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {theme === "dark" ? (
              <img
                src={item.imageDark}
                alt="hero section image"
                className="w-[150px] h-[150px] object-cover mb-4"
              />
            ) : (
              <img
                src={item.imageLight}
                alt="hero section image"
                className="w-[150px] h-[150px] object-cover mb-4"
              />
            )}
            <p className="text-text_title_24 text-text_color_light dark:text-text_color_dark font-normal">
              {item.title}
            </p>
            <p className="text-text_body_16 mx-5 text-text_color_desc_light dark:text-text_color_desc_dark">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
