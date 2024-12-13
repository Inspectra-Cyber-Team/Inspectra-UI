"use client";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQsType } from "@/types/FAQ";
import { useGetAllFAQQuery } from "@/redux/service/faqs";
export default function HomePageFAQComponent() {
  const getDataFAQ = useGetAllFAQQuery([]);
  const result = getDataFAQ?.data?.data.slice(0, 3);
  return (
    <div>
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
    </div>
  );
}
