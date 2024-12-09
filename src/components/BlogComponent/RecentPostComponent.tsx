"use client";

import React from "react";
import { FaCommentDots } from "react-icons/fa";
import { FaHandsClapping } from "react-icons/fa6";
import { useGetAllBlogQuery } from "@/redux/service/blog";
import { Blog } from "@/types/Blog";

export default function RecentPostComponent() {
  const { data: blogData } = useGetAllBlogQuery({ page: 0, pageSize: 10 });

  const blogList = blogData?.content.slice(0, 4);

  return (
    <div>
      <p className="text-text_title_20 text-text_color_desc_light dark: dark:text-text_color_desc_dark">
        Recent Posts
      </p>
      <div className="py-3 flex flex-col gap-3">
        {blogList?.map((blog: Blog, index: number) => (
          <div key={index} className="rounded-lg overflow-hidden flex">
            <div className="w-[200px] h-[90px]">
              <img
                className="w-full h-full"
                src={blog?.thumbnail[0]}
                alt="thumbnail"
              />
            </div>
            <div className="bg-text_color_dark dark:bg-card_color_dark p-2">
              <p className="line-clamp-2">{blog.title}</p>
              <div className="flex gap-5 pt-5">
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
