"use client";
import React, { useState, useEffect } from "react";
import { FaCalendarAlt, FaEye, FaCommentDots } from "react-icons/fa";
import { FaHandsClapping } from "react-icons/fa6";
import { Blog } from "@/types/Blog";
import { useLikeBlogMutation } from "@/redux/service/blog";
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
import { useUseGetTopicNameQuery } from "@/redux/service/topic";

type BlogTopicComponentProps = Readonly<{
  topic: string;
}>;

export default function BlogTopicComponent({ topic }: BlogTopicComponentProps) {
  console.log("Topic:", topic);
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(1);
  const [likedBlogs, setLikedBlogs] = useState<string[]>([]); 

  // Fetch blog data for the specific topic and pagination
  const { data: blogData } = useUseGetTopicNameQuery({
    topicName: topic, // Dynamically use the topic prop
    page: currentPage - 1,
    pageSize: 4,
  });

  const blogList = blogData?.content?.flatMap((item: any) => item.blogs) ?? []; // Safely handle empty response

  useEffect(() => {
    if (blogData) {
      setTotalPages(blogData.totalPages);
    }
  }, [blogData]);

  console.log("Blog list", blogList);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const [likeBlog] = useLikeBlogMutation();

  const handleLike = async (uuid: string) => {
    try {
      const res = await likeBlog({ uuid });
      if (res?.data?.success) {
        setLikedBlogs((prev) => [...prev, uuid]); // Add liked blog UUID to state
      }
      console.log("Like blog response:", res);
    } catch (error) {
      console.error("Error liking the blog:", error);
    }
  };

  return (
    <div>
      {/* blog card */}
      <section>
        {blogList.length === 0 ? (
          <div>No data</div>
        ) : (
          blogList?.map((blog: Blog) => (
            <button
              key={blog?.uuid}
              onClick={() => router.push(`/blog/${blog?.uuid}`)}
              className="flex my-2 flex-wrap lg:flex-nowrap justify-center lg:justify-between items-center border-b border-b-text_color_desc_light dark:border-b-text_color_desc_dark pb-5 lg:pb-0"
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
                  <p className="text-text_color_desc_light cursor-pointer dark:text-text_color_desc_dark">
                    {blog?.user?.firstName} {blog?.user?.lastName}
                  </p>
                </div>

                {/* title */}
                <p className="text-text_title_20 cursor-pointer line-clamp-2 text-text_color_light dark:text-text_color_dark">
                  {blog?.title}
                </p>

                {/* description */}
                <p className="text-text_body_16 cursor-pointer text-text_color_desc_light dark:text-text_color_desc_dark line-clamp-2">
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
                    <FaHandsClapping
                      className={`cursor-pointer ${
                        likedBlogs.includes(blog?.uuid)
                          ? "text-orange-400"
                          : "text-text_color_desc_light dark:text-text_color_desc_dark"
                      }`}
                      onClick={() => handleLike(blog?.uuid)}
                    />
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
              <div className={"w-[200px] h-[150px]"}>
                <img
                  className="w-full h-full object-contain rounded-xl"
                  src={blog?.thumbnail[0]}
                  alt="thumbnail"
                />
              </div>
            </button>
          ))
        )}
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
                }
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
