"use client";
import React, { useState, useEffect, useRef } from "react";
import { FaCalendarAlt, FaEye, FaCommentDots } from "react-icons/fa";
import { FaHandsClapping } from "react-icons/fa6";
import { Blog } from "@/types/Blog";
import { useGetAllBlogQuery} from "@/redux/service/blog";
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
import { Skeleton } from "@/components/ui/skeleton";


export default function BlogComponent() {
 
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1); // Track current page state
  const [totalPages, setTotalPages] = useState(1); // Track total pages based on API response

  const { data: blogData, isLoading } = useGetAllBlogQuery({
    page: currentPage - 1,
    pageSize: 4,
  });

  // Adjust for zero-based page indexing
  const [blogList, setBlogList] = useState<Blog[]>([]);

  // calling websocket
  const [socket, setSocket] = useState<WebSocket | null>(null);
   const receivedUuidsRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    const connectWebSocket = () => {
      const ws = new WebSocket(process.env.NEXT_PUBLIC_WS_URL as string);

      ws.onopen = () => console.log("WebSocket connection established.");
      ws.onmessage = (event) => {
        try {
          const newBlog = JSON.parse(event.data);
          
          if (newBlog?.data?.uuid && newBlog?.event === "verify-blog" && !receivedUuidsRef.current.has(newBlog?.data?.uuid)) {
            setBlogList((prevData) => {
              // Ensure that prevData is an array before spreading it
              return Array.isArray(prevData)
                ? [newBlog?.data, ...prevData]
                : [newBlog.data];
            });
            receivedUuidsRef.current.add(newBlog?.data?.uuid);
          } else if (newBlog?.data?.uuid && newBlog?.event === "delete-blog") {
            setBlogList((prevData) => {
              return prevData.filter((blog) => blog.uuid !== newBlog?.data?.uuid);
            });
          }
        } catch (error) {
          console.error("Error parsing WebSocket message:", error);
        }
      };
      ws.onerror = () => console.error("WebSocket error. Retrying...");
      ws.onclose = () => console.error("WebSocket closed. Retrying...");

      setSocket(ws);
    };

    if (!socket) connectWebSocket();

    return () => {
      socket?.close();
    };
  }, [socket]);

  // Set total pages from the API response
  useEffect(() => {
    if (blogData) {
      setBlogList(blogData?.content || []);
      setTotalPages(blogData?.totalPages || 0);
    }
  }, [blogData]);

  // Function to handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };



  if (isLoading) {
    return (
      <div className="w-full max-w-7xl mx-auto p-4">
        {/* Main Content */}
        <div className="space-y-8 ">
          {/* Blog Post Skeleton */}
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex w-full gap-4 ">
              <div className="flex-1 space-y-4">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <div className="flex items-center gap-4">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
              {/* Image placeholder on the right */}
              <Skeleton className="h-32 w-32 rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (blogData?.content.length === 0) {
    return (
      <div className="w-full max-w-7xl mx-auto p-4">
        <img src="/images/error1.png" alt="empty" className="w-1/2 mx-auto" />
      </div>
    );
  }

  return (
    <div>
      {/* blog card */}
      <section>
        {blogList?.map((blog: Blog, index: number) => (
          <div
            key={index}
            onClick={() => router.push(`/blog/${blog?.uuid}`)}
            className="flex my-5 flex-wrap lg:flex-nowrap justify-center lg:justify-between cursor-pointer items-center border-b border-b-text_color_desc_light dark:border-b-text_color_desc_dark pb-5"
          >
            <div className="flex flex-col gap-3 lg:w-[55%] w-[100%]">
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
              <h4 className="text-text_title_20 cursor-pointer line-clamp-2 text-text_color_light dark:text-text_color_dark font-semibold">
                {blog?.title}
              </h4>

              {/* description */}
              <p
                className="text-text_body_16  cursor-pointer  text-text_color_desc_light dark:text-text_color_desc_dark line-clamp-1"
                dangerouslySetInnerHTML={{ __html: blog?.description || "" }}
              ></p>

              {/* created at */}
              <div className="flex space-x-8 mt-3">
                <div className="flex gap-2 items-center">
                  <FaCalendarAlt className="text-text_color_desc_light dark:text-text_color_desc_dark text-xl" />
                  <p>{convertToDayMonthYear(blog?.createdAt)}</p>
                </div>

                {/* view */}
                <div className="flex gap-2 items-center">
                  <FaEye className="text-text_color_desc_light dark:text-text_color_desc_dark text-2xl" />
                  <p>{blog?.viewsCount}</p>
                </div>

                {/* like */}
                <div className="flex gap-2 items-center ">
                   <FaHandsClapping
                      className="cursor-pointer text-text_color_desc_light dark:text-text_color_desc_dark mb-1 text-xl"
                  
                    />

                  <p>{blog?.likesCount}</p>
                </div>

                {/* comment */}
                <div className="flex gap-2 items-center">
                  <FaCommentDots className="text-text_color_desc_light dark:text-text_color_desc_dark text-xl" />
                  <p>{blog?.countComments}</p>
                </div>
              </div>
            </div>

            {/* thumbnail */}
            <div
              className={"w-[300px] h-[180px] hidden lg:block overflow-hidden"}
            >
              <img
                className="w-full h-full object-cover rounded-xl transition-transform duration-300 hover:scale-110"
                src={blog?.thumbnail[0]}
                alt="thumbnail"
              />
            </div>
          </div>
        ))}
      </section>

      {/* pagination */}
      <Pagination className="flex justify-center mt-10">
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
