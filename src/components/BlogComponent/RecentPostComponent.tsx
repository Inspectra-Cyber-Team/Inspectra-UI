"use client";

import React from "react";
import { FaCommentDots } from "react-icons/fa";
import { FaHandsClapping } from "react-icons/fa6";
import { useGetAllBlogQuery } from "@/redux/service/blog";
import { Blog } from "@/types/Blog";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

export default function RecentPostComponent() {
  const {
    data: blogData,
    isLoading,
    isError,
  } = useGetAllBlogQuery({ page: 0, pageSize: 10 });

  const router = useRouter();

  const blogList = blogData?.content.slice(0, 4);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-5 w-32" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-3">
            <Skeleton className="h-16 w-16 rounded-lg" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-48" />
              <div className="flex gap-2">
                <Skeleton className="h-3 w-8" />
                <Skeleton className="h-3 w-8" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return <p className="text-center">Something went wrong</p>;
  }

  return (
    <div>
      <p className="text-text_title_20  text-text_color_light dark:text-text_color_dark font-semibold my-2">
        Recent Posts
      </p>
      <div className="py-3 flex flex-col space-y-5">
        {blogList?.map((blog: Blog, index: number) => (
          <div
            key={index}
            onClick={() => router.push(`/blog/${blog?.uuid}`)}
            className="rounded-lg overflow-hidden flex w-full h-24 cursor-pointer "
          >
            {/* Image Section */}
            <div className="w-[120px] h-24">
              <img
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                src={blog?.thumbnail[0]}
                alt="thumbnail"
              />
            </div>
 
            {/* Content Section */}
            <div className="flex-1 bg-text_color_dark dark:bg-card_color_dark px-3 py-2">
              <p className="line-clamp-2 h-12">{blog.title}</p>
              <div className="flex gap-4 pt-2">
                <div className="text-orange-400 flex gap-2 items-center">
                  <FaHandsClapping className="mb-[3px]"/>
                  {blog.likesCount}
                </div>
                <div className="flex gap-2 items-center text-text_color_desc_light dark:text-text_color_desc_dark">
                  <FaCommentDots />
                  {blog.countComments}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
