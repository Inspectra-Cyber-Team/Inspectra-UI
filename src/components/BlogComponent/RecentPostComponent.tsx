"use client";

import React from "react";
import { FaCommentDots } from "react-icons/fa";
import { FaHandsClapping } from "react-icons/fa6";
import { useGetAllBlogQuery } from "@/redux/service/blog";
import { Blog } from "@/types/Blog";
import { useRouter } from "next/navigation";

export default function RecentPostComponent() {
  const { data: blogData } = useGetAllBlogQuery({ page: 0, pageSize: 10 });
  const router = useRouter();

  const blogList = blogData?.content.slice(0, 4);

  return (
    <div>
      <p className="text-text_title_20 text-black my-2 dark: dark:text-text_color_desc_dark">
        Recent Posts
      </p>
      <div className="py-3 flex flex-col gap-3">
  {blogList?.map((blog: Blog, index: number) => (
    <div
      key={index}
      onClick={() => router.push(`/blog/${blog?.uuid}`)}
      className="rounded-lg overflow-hidden flex w-full h-28 cursor-pointer"
    >
      {/* Image Section */}
      <div className="w-[100px] h-full flex-shrink-0">
        <img
          className="w-full h-full object-cover"
          src={blog?.thumbnail[0]}
          alt="thumbnail"
        />
      </div>

      {/* Content Section */}
      <div className="flex-1 bg-text_color_dark dark:bg-card_color_dark p-2">
        <p className="line-clamp-2">{blog.title}</p>
        <div className="flex gap-5 pt-3">
          <div className="flex gap-3 items-center">
            <FaHandsClapping />
            {blog.likesCount}
          </div>
          <div className="flex gap-3 items-center">
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
