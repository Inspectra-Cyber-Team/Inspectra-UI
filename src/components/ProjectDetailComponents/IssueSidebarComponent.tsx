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
import { FaFile } from "react-icons/fa";
import { GoFileDirectoryFill } from "react-icons/go";
export default function IssueSidebarComponent({ ...props }) {
  const { data: issueData } = useGetAllIssueQuery({
    projectName: props.props,
    page: "0",
    size: "25",
  });
  const issueResult = issueData?.data.facets;
  return (
    <div>
      {issueResult?.map((issueItem: IusseSideBarType, index: number) => (
        <div key={index}>
          <Accordion type="single" collapsible >
            <AccordionItem value={`item-${index}`}>
              <AccordionTrigger className=" text-text_color_light  dark:text-text_color_dark text-left md:text-text_body_16">
                {issueItem?.property}
              </AccordionTrigger>
              {issueItem?.values.map((item: any, index: number) => (
                <AccordionContent
                  key={index}
                  className="w-full flex justify-between  text-[14px]"
                >
                  {/* check if count = 0 make color lighter then normal text */}
                  {item.count === 0 ? (
                    <p className=" text-[14px] truncate  text-text_color_desc_light  dark:text-text_color_desc_dark  ">
                      {item.val}
                    </p>
                  ) : // check to make icon if it files
                  issueItem.property === "files" ? (
                    <div className="flex  truncate items-center">
                      <FaFile />
                      <p className="truncate max-w-[90%] ml-2 text-text_color_light dark:text-text_color_dark">
                        {item.val}
                      </p>
                    </div>
                    // check is it directories show icon directory
                  ) : issueItem.property === "directories" ? (
                    <div className="flex  truncate items-center">
                      <GoFileDirectoryFill /> 
                      <p className="truncate max-w-[90%] ml-2 text-text_color_light dark:text-text_color_dark">
                        {item.val}
                      </p>
                    </div>
                  ) : (
                    <p className="truncate max-w-[90%] text-text_color_light dark:text-text_color_dark">
                      {item.val}
                    </p>
                  )}
                  {/* change color if it equal 0 */}
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
