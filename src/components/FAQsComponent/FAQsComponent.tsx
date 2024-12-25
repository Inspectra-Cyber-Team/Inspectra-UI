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
import Aos from "aos";

export default function FAQsComponent() {
  const getDataFAQ = useGetAllFAQQuery({});
  const result = getDataFAQ?.data?.data;
  useEffect(() => {
          Aos.init({ duration: 1000 });
        }, []);
  return (
    <div>
       {/* title */}
       <div className="text-text_title_20 md:text-text_header_34 mb-[60px] text-center rounded-tl-[20px] rounded-br-[20px] text-text_color_light  p-2 bg-primary_color w-full md:w-[500px] h-full" data-aos="fade-right">
        Get your doubts answered
      </div>
      {result?.map((faqItem: FAQsType, index: number) => (
        <div key={index} data-aos="fade-left">
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
    </div>
  );
}
