"use client";

import Image from "next/image";
import { useGetBlogByUserUuidQuery } from "@/redux/service/blog";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { FaCommentDots, FaHandsClapping } from "react-icons/fa6";
import { Button } from "../ui/button";
import { convertToDayMonthYear } from "@/lib/utils";

type BlogCardProps = {
  uuid: string;
};

type Blog = {
  uuid: string;
  title: string;
  likesCount: number;
  viewsCount: number;
  countComments: number;
  description: string;
  thumbnail: string[];
  user: {
    uuid: string;
    firstName: string;
    lastName: string;
    profile: string;
  };
  createdAt: string;
};

export default function BlogUserCardComponent({
  uuid,
}: Readonly<BlogCardProps>) {

  const router = useRouter();

  const [currentSize, setCurrentSize] = useState(6);

  const { data, isLoading, isError } = useGetBlogByUserUuidQuery({
    uuid: uuid,
    page: 0,
    size: currentSize,
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="flex flex-col space-y-3">
          
          <Skeleton className="h-[125px] w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
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
    <section>
      {/* Header section below card */}
      <section className="flex justify-between items-center lg:mx-5 mt-4">
        <section className={"flex items-center justify-betwee"}>
          <p className={"font-semibold lg:text-text_title_24 text-text_body_16"}>
            More from {data?.content?.[0]?.user?.firstName}{" "}
            {data?.content?.[0]?.user?.lastName}
          </p>
        </section>
       
          <Button
            onClick={() => setCurrentSize(currentSize + 3)} className="bg-primary_color text-text_color_light rounded-2xl"
          >
            See More
          </Button>
      </section>
      {/* Card blog section */}
      <section
        className={"m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"}
      >
        {data?.content?.map((blog: Blog) => (
          <div
            key={blog.uuid}
            className=" mx-auto bg-white cursor-pointer dark:bg-card_color_dark rounded-lg overflow-hidden w-full"
            onClick={() => router.push(`/blog/${blog?.uuid}`)}
          >
            <div className="relative w-auto h-40 m-4">
              <Image
                src={blog.thumbnail[0]} // Use the actual thumbnail URL
                alt={blog.title}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 hover:scale-110 rounded-md"
              />
            </div>

            <div className="mx-4 my-4 h-full relative ">
              <div className="flex flex-col justify-between ">
                <div>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <img
                      src={blog.user.profile} // Use the actual profile URL
                      alt={`${blog.user.firstName} ${blog.user.lastName}`}
                      className="rounded-full h-8 w-8"
                    />
                    <div className="ml-2 flex justify-between w-full text-text_color_desc_light dark:text-text_color_desc_dark">
                      <p className="text-base">
                        {blog.user.firstName} {blog.user.lastName}</p>
                      <p className="text-base">{convertToDayMonthYear(blog.createdAt)}</p>
                    </div>
                  </div>
                  <h2 className="line-clamp-1 text-lg font-semibold text-text_color_light dark:text-text_color_dark mb-2">
                    {blog?.title}
                  </h2>
                  <p className="line-clamp-1 text-text_color_desc_light dark:text-text_color_desc_dark mb-2 text-base"  dangerouslySetInnerHTML={{ __html: blog?.description || "" }}>
                    {/* {blog?.description} */}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <div className={"flex justify-between space-x-4"}>
                    <div className="flex items-center space-x-2 text-text_color_desc_light dark:text-text_color_desc_dark  text-lg">
                      <div className="mb-1">
                      <FaHandsClapping/>
                      </div>
                      <p>{blog?.likesCount}</p>
                    </div>
                    <div className="flex items-center space-x-2 text-text_color_desc_light dark:text-text_color_desc_dark text-lg">
                      <FaCommentDots/>
                      <p>{blog?.countComments}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </section>
  );
}
