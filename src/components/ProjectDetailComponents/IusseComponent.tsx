"use client";
import React, { useEffect, useState } from "react";
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
import { timeSince } from "@/lib/utils";

import { IoIosMore } from "react-icons/io";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
export default function IusseComponent({ ...props }) {
  //   state for store filter
  const [fileStore, setFileStore] = useState<string>("");
  const [directoriesStore, setDirectoriesStore] = useState<string>("");
  const [languagesStore, setLanguagesStore] = useState<string>("");
  const [tagStore, setTagStore] = useState<string>("");
  const [impactSeveritiesStore, setImpactSeveritiesStore] =useState<string>("");
  //   for pageingation
  const [currentPage, setCurrentPage] = useState(1); // Track current page state
  const [totalPages, setTotalPages] = useState(1); // Track total pages based on API response
  const [pageRange, setPageRange] = useState([1, 10]); // Track the range of pages to display


  //   fetch data
  const { data: issueData } = useGetAllIssueQuery({
    projectName: props.props,
    page: currentPage,
    size: 4,
    languages: languagesStore,
    tags: tagStore,
    files: fileStore,
    directories: directoriesStore,
    impactSeverities: impactSeveritiesStore,
  });

  const issueCardResult = issueData?.data?.issues;
  const issueSideBarResult = issueData?.data.facets;
  // Function to handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Update total pages and page range from the API response
  useEffect(() => {
    if (issueData) {
      setTotalPages(issueData?.data?.total);
      // Adjust page range based on total pages
      const endPage = Math.min(10, issueData?.data?.total);
      setPageRange([1, endPage]);
    }
  }, [issueData]);

  // Function to handle 'Next' pagination
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);

      // Update page range
      if (nextPage > pageRange[1]) {
        setPageRange([
          nextPage,
          nextPage + 9 <= totalPages ? nextPage + 9 : totalPages,
        ]);
      }
    }
  };
  // Function to handle 'Previous' pagination
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage);

      // Update page range
      if (prevPage < pageRange[0]) {
        setPageRange([prevPage - 9 > 0 ? prevPage - 9 : 1, prevPage]);
      }
    }
  };
  return (
    <section className="w-full h-full flex justify-between">
      <div className="w-[35%] h-full bg-background_light_mode dark:bg-background_dark_mode p-5 rounded-[20px] hidden md:block ">
        <p className="text-text_title_24 text-text_color_light dark:text-text_color_dark ">
          Filter
        </p>
        <hr className="text-text_color_desc_light mt-2" />
        {/* side bar content */}
        <div className="h-full">
          {issueSideBarResult?.map(
            (issueItem: IusseSideBarType, index: number) => (
              <div key={index}>
                <Accordion type="single" collapsible>
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
                          <div
                            onClick={() => setFileStore(item.val)}
                            className="flex  truncate cursor-pointer items-center"
                          >
                            <FaFile />
                            <p className="truncate max-w-[90%] ml-2 text-text_color_light dark:text-text_color_dark">
                              {item.val}
                            </p>
                          </div>
                        ) : // check is it directories show icon directory
                        issueItem.property === "directories" ? (
                          <div
                            onClick={() => setDirectoriesStore(item.val)}
                            className="flex  truncate cursor-pointer items-center"
                          >
                            <GoFileDirectoryFill />
                            <p className="truncate max-w-[90%] ml-2 text-text_color_light dark:text-text_color_dark">
                              {item.val}
                            </p>
                          </div>
                        ) : issueItem.property === "languages" ? (
                          <p
                            onClick={() => setLanguagesStore(item.val)}
                            className="truncate cursor-pointer max-w-[90%] text-text_color_light dark:text-text_color_dark"
                          >
                            {item.val}
                          </p>
                        ) : issueItem.property === "tags" ? (
                          <p
                            onClick={() => setTagStore(item.val)}
                            className="truncate cursor-pointer max-w-[90%] text-text_color_light dark:text-text_color_dark"
                          >
                            {item.val}
                          </p>
                        ) : issueItem.property === "severities" ? (
                          <p
                            onClick={() => setImpactSeveritiesStore(item.val)}
                            className="truncate cursor-pointer max-w-[90%] text-text_color_light dark:text-text_color_dark"
                          >
                            {item.val}
                          </p>
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
            )
          )}
        </div>
      </div>
      {/* card issue */}
      <div className="w-[60%] ">
        <section className="h-full">
          {/* fetch issue  */}
          {issueCardResult?.map((issue: any, index: number) => (
            <div
              key={index}
              className="w-full mb-5 bg-background_light_mode dark:bg-background_dark_mode p-5 rounded-[20px]"
            >
              {/* first section*/}
              <div className="w-full flex justify-between">
                <p className="text-text_body_16 truncate w-[80%] text-ascend_color underline">
                  {issue?.message}
                </p>
                <p className=" py-1 px-2 rounded-md text-[14px] text-text_color_light bg-primary_color">
                  {issue?.cleanCodeAttributeCategory}
                </p>
              </div>
              {/* second section */}
              <div className="flex  justify-between items-center text-center my-5">
                <div className=" flex space-x-2">
                  {issue?.impacts.map((impact: any, index: number) => (
                    <div
                      key={index}
                      className="flex  text-text_body_16 text-center items-center px-3 rounded-md bg-[#60935d21] py-2 "
                    >
                      {impact.severity === "LOW" ? (
                        <img
                          src="/images/iconGood.svg"
                          className="h-6 w-6"
                          alt="Warning Icon"
                        ></img>
                      ) : impact.severity === "MEDIUM" ? (
                        <img
                          src="/images/iconWarning.svg"
                          className="h-6 w-6"
                          alt="Warning Icon"
                        ></img>
                      ) : (
                        <img
                          src="/images/iconWarning.svg"
                          className="h-6 w-6"
                          alt="Warning Icon"
                        ></img>
                      )}
                      <p className="mx-3">{impact?.softwareQuality} </p>
                    </div>
                  ))}
                </div>
                {/* tag */}
                <div className="flex space-x-2 text-center items-center">
                  {issue?.tags.slice(0, 2).map((tag: any, index: number) => (
                    <div
                      key={index}
                      className="inline-block bg-[#60935d21] px-2 rounded-md"
                    >
                      <p>{tag}</p>
                    </div>
                  ))}
                  {issue?.tags.length > 2 && (
                    <div className="flex items-center">
                      <IoIosMore className="bg-[#60935d21] rounded-md text-text_body_16 h-6 w-5" />
                    </div>
                  )}
                </div>
              </div>
              {/* line */}
              <hr className="text-text_color_desc_light opacity-10" />
              <div className="flex items-center justify-end w-full my-5 text-[14px] ">
                <p className="text-text_color_light dark:text-text_color_desc_dark">
                  L{issue?.line} • {issue?.effort} effort •{" "}
                  {timeSince(issue?.updateDate)} • {issue?.type} •
                </p>
                <div className="flex items-center ml-2 text-text_color_light dark:text-text_color_desc_dark">
                  {issue?.severity === "MAJOR" ? (
                    <img
                      src="/images/dangericon.svg"
                      alt=""
                      className="w-[14px] h-full mr-1"
                    />
                  ) : (
                    <img
                      src="/images/iconWarning.svg"
                      alt=""
                      className="w-[14px] h-full mr-1"
                    />
                  )}
                  <p>{issue?.severity}</p>
                </div>
              </div>
            </div>
          ))}

          {/* pagination */}
          <Pagination className="flex justify-center mt-6">
            <PaginationContent className="flex gap-2 items-center">
              <PaginationItem>
                <PaginationPrevious href="#" onClick={handlePreviousPage} />
              </PaginationItem>

              {/* Display page numbers dynamically with ellipsis */}
              {[...Array(pageRange[1] - pageRange[0] + 1)].map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    href="#"
                    onClick={() => handlePageChange(pageRange[0] + index)}
                    className={
                      currentPage === pageRange[0] + index
                        ? "bg-[#B9FF66] text-black"
                        : ""
                    }
                  >
                    {pageRange[0] + index}
                  </PaginationLink>
                </PaginationItem>
              ))}

              {pageRange[1] < totalPages && (
                <PaginationEllipsis>
                  <PaginationLink href="#">...</PaginationLink>
                </PaginationEllipsis>
              )}

              <PaginationItem>
                <PaginationNext href="#" onClick={handleNextPage} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </section>
      </div>
    </section>
  );
}
