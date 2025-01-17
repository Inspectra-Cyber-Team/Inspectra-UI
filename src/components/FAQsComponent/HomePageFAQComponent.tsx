"use client";
import React, { useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQsType } from "@/types/FAQ";
import { useGetAllFAQQuery } from "@/redux/service/faqs";
import Link from "next/link";
import Aos from "aos";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { useRouter } from "next/navigation";
export default function HomePageFAQComponent() {
  const getDataFAQ = useGetAllFAQQuery([]);
  const result = getDataFAQ?.data?.data.slice(0, 3);
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  const router = useRouter();

  return (
    <div>
      <Link href="/faq">
        {" "}
        <p className="text-text_header_34 px-5 py-1 inline rounded-tl-[20px] text-text_color_light rounded-br-[20px] bg-primary_color font-semibold">
          FAQs
        </p>{" "}
      </Link>
      <div data-aos="fade-up">
        {result?.map((faqItem: FAQsType, index: number) => (
          <div key={index}>
            <Accordion type="single" collapsible>
              <AccordionItem value={`item-${index}`}>
                <AccordionTrigger className=" text-text_color_light dark:text-text_color_dark text-left md:text-text_title_20">
                  {faqItem.question}
                </AccordionTrigger>
                <AccordionContent className="text-left !text-text_body_16 text-text_color_desc_light dark:text-text_color_desc_dark">
                  {faqItem.answer}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        ))}
        <motion.button
          onClick={() => router.push("/faq")}
          className="flex justify-between mt-3  text-left  items-center text-text_color_light  dark:text-text_color_dark rounded-tl-[20px] rounded-br-[20px] w-[110px] h-[50px] text-text_body_16"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          See More
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <FaArrowRight />
          </motion.div>
        </motion.button>
      </div>
    </div>
  );
}
