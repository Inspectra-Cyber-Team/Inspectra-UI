"use client";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQsType } from "@/types/FAQ";
import { useGetAllFAQQuery } from "@/redux/service/faqs";
import Aos from "aos";
import FAQSkeleton from "../Skeleton/FaqSkeleton";

export default function FAQsComponent() {
  const getDataFAQ = useGetAllFAQQuery({});
  const result = getDataFAQ?.data?.data;
  const isError = getDataFAQ.isError;
  const isLoading = getDataFAQ.isLoading;
  useEffect(() => {
          Aos.init({ duration: 1000 });
        }, []);
  return (
    <div>
       {/* title */}
       <div className="text-text_title_20 md:text-text_header_34 mb-[60px] text-center rounded-tl-[20px] rounded-br-[20px] text-text_color_light  p-2 bg-primary_color w-full md:w-[500px] h-full font-semibold" data-aos="fade-right">
        Get your doubts answered
      </div>
      {/* Content */}
      {isLoading ? (
        // Show skeleton while loading
        Array.from({ length: 3 }).map((_, index) => (
          <FAQSkeleton key={index} />
        ))
      ) : isError ? (
        // Show error message if there's an error
        <div
          className="text-center text-text_color_desc_light dark:text-text_color_desc_dark text-lg"
          data-aos="fade-up"
        >
          Failed to load FAQs. Please try again later.
        </div>
      ) : result?.length === 0 ? (
        // Show "no data" message if no data is available
        <div
          className="text-center text-text_color_desc_light dark:text-text_color_desc_dark text-lg"
          data-aos="fade-up"
        >
          No FAQs available at the moment.
        </div>
      ) : (
        // Show FAQs if data is available
        result.map((faqItem: FAQsType, index: number) => (
          <div key={index} data-aos="fade-left">
            <Accordion type="single" collapsible>
              <AccordionItem value={`item-${index}`}>
                <AccordionTrigger className="text-text_color_light dark:text-text_color_dark text-left md:text-text_title_20">
                  {faqItem.question}
                </AccordionTrigger>
                <AccordionContent className="text-left !text-text_body_16 text-text_color_desc_light dark:text-text_color_desc_dark">
                  {faqItem.answer}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        ))
      )}
    </div>
  );
}
