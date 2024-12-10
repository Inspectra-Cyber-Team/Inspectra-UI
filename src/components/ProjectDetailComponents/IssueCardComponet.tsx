"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { timeSince } from "@/lib/utils";
import { useGetAllIssueQuery } from "@/redux/service/issue";
import { useEffect, useState } from "react";
import { IoIosMore } from "react-icons/io";
export default function IssueCardComponet({ ...props }) {
  const [currentPage, setCurrentPage] = useState(1); // Track current page state
  const [totalPages, setTotalPages] = useState(1); // Track total pages based on API response
  const [pageRange, setPageRange] = useState([1, 10]); // Track the range of pages to display

  const { data: issueData } = useGetAllIssueQuery({
    projectName: props.props,
    page: currentPage,
    size: 4,
  });

  const issueResult = issueData?.data?.issues;
  console.log(issueResult);
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
    <div className="h-full">
      {/* fetch issue  */}
      {issueResult?.map((issue: any, index: number) => (
        <section
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
        </section>
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
    </div>
  );
}
