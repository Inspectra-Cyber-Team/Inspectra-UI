"use client";
import React from "react";
import { useGetAllIssueQuery } from "@/redux/service/issue";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { IusseSideBarType } from "@/types/IssueType";

export default function IssueSidebarComponent() {
  const { data: issueData } = useGetAllIssueQuery({
    projectName: "project168",
    page: "0",
    size: "25",
  });
  const issueResult = issueData?.data.facets;
  console.log(issueData);
  return (
    <div>
      {issueResult?.map((issueItem: IusseSideBarType, index: number) => (
        <div key={index}>
          <Accordion type="single" collapsible>
            <AccordionItem value={`item-${index}`}>
              <AccordionTrigger className=" text-text_color_light  dark:text-text_color_dark text-left md:text-text_title_20">
                {issueItem?.property}
              </AccordionTrigger>
              {issueItem?.values.map((item: any, index: number) => (
                <AccordionContent
                  key={index}
                  className="w-full flex justify-between  text-[14px]  text-text_color_light  dark:text-text_color_dark"
                >
                  {item.count === 0 ? (
                    <p className=" text-[14px] truncate   text-text_color_desc_light  dark:text-text_color_desc_dark  ">
                      {item.val}
                    </p>
                  ) : (
                    <p className="truncate max-w-[90%]">{item.val}</p>
                  )}
                  {item.count === 0 ? (
                    <p className=" text-[14px] text-text_color_desc_light dark:text-text_color_desc_dark ">
                      {item.count}
                    </p>
                  ) : (
                    <p>{item.count}</p>
                  )}
                </AccordionContent>
              ))}
            </AccordionItem>
          </Accordion>
        </div>
      ))}
    </div>
  );
}
