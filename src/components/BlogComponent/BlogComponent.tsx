"use client";
import React, { useState, useEffect } from "react";
import { FaCalendarAlt, FaEye, FaCommentDots } from "react-icons/fa";
import { FaHandsClapping } from "react-icons/fa6";
import { Blog } from "@/types/Blog";
import { useGetAllBlogQuery, useLikeBlogMutation } from "@/redux/service/blog";
import { convertToDayMonthYear } from "@/lib/utils";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter } from "next/navigation";

export default function BlogComponent() {
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1); // Track current page state
  const [totalPages, setTotalPages] = useState(1); // Track total pages based on API response

  const { data: blogData } = useGetAllBlogQuery({
    page: currentPage - 1,
    pageSize: 4,
  });
  // Adjust for zero-based page indexing
  const blogList = blogData?.content;

  // Set total pages from the API response
  useEffect(() => {
    if (blogData) {
      setTotalPages(blogData?.totalPages);
    }
  }, [blogData]);

  // Function to handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Calling function like this blog
  const [likeBlog] = useLikeBlogMutation();

  const [likeColor, setLikeColor] = useState(false);

  const handleLike = async (uuid: string) => {
    try {
      const res = await likeBlog({ uuid: uuid });

      setLikeColor(true);

      console.log("Like blog response:", res);
    } catch (error) {
      console.error("Error liking the blog:", error);
    }
  };

  return (
    <div>
      {/* blog card */}
      <section>
        {blogList?.map((blog: Blog, index: number) => (
          <div
            key={index}
            onClick={() => router.push(`/blog/${blog?.uuid}`)}
            className="flex  my-2 flex-wrap lg:flex-nowrap justify-center lg:justify-between cursor-pointer items-center border-b border-b-text_color_desc_light dark:border-b-text_color_desc_dark pb-5 lg:pb-0"
          >
            <div className="flex flex-col gap-3 lg:w-[55%]">
              {/* profile */}
              <div className="flex gap-3 items-center">
                <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    src={blog?.user?.profile}
                    alt="profile"
                  />
                </div>
                <p className="text-text_color_desc_light  cursor-pointer  dark:text-text_color_desc_dark">
                  {blog?.user?.firstName} {blog?.user?.lastName}
                </p>
              </div>

              {/* title */}
              <p className="text-text_title_20  cursor-pointer  line-clamp-1 text-text_color_light dark:text-text_color_dark">
                {blog?.title}
              </p>

              {/* description */}
              <p className="text-text_body_16  cursor-pointer  text-text_color_desc_light dark:text-text_color_desc_dark line-clamp-1">
                {blog?.description}
              </p>

              {/* created at */}
              <div className="flex gap-5 mb-5">
                <div className="flex gap-2 items-center">
                  <FaCalendarAlt className="text-text_color_desc_light dark:text-text_color_desc_dark" />
                  <p>{convertToDayMonthYear(blog?.createdAt)}</p>
                </div>

                {/* view */}
                <div className="flex gap-2 items-center">
                  <FaEye className="text-text_color_desc_light dark:text-text_color_desc_dark" />
                  <p>{blog?.viewsCount}</p>
                </div>

                {/* like */}
                <div className="flex gap-2 items-center">
                  {likeColor ? (
                    <FaHandsClapping
                      className="text-orange-400 cursor-pointer"
                      onClick={() => handleLike(blog?.uuid)}
                    />
                  ) : (
                    <FaHandsClapping
                      className="cursor-pointer text-text_color_desc_light dark:text-text_color_desc_dark"
                      onClick={() => handleLike(blog?.uuid)}
                    />
                  )}

                  <p>{blog?.likesCount}</p>
                </div>

                {/* comment */}
                <div className="flex gap-2 items-center">
                  <FaCommentDots className="text-text_color_desc_light dark:text-text_color_desc_dark" />
                  <p>{blog?.countComments}</p>
                </div>
              </div>
            </div>

            {/* thumbnail */}
            <div className={"w-[200px] h-[150px] hidden lg:block"}>
              <img
                className="w-full h-full object-cover rounded-xl"
                src={blog?.thumbnail[0]}
                alt="thumbnail"
              />
            </div>
          </div>
        ))}
      </section>

      {/* pagination */}
      <Pagination className="flex justify-center mt-6">
        <PaginationContent className="flex gap-2 items-center">
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() =>
                currentPage > 1 && handlePageChange(currentPage - 1)
              } // Go to previous page
            />
          </PaginationItem>

          {/* Display page numbers dynamically */}
          {[...Array(totalPages)].map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                href="#"
                onClick={() => handlePageChange(index + 1)}
                className={
                  currentPage === index + 1 ? "bg-[#B9FF66] text-black" : ""
                } // Highlight active page
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() =>
                currentPage < totalPages && handlePageChange(currentPage + 1)
              } // Go to next page
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
