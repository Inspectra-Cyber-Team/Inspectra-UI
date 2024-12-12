"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useGetBlogByUserUuidQuery } from "@/redux/service/blog";
import { useRouter } from "next/navigation";

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

export default function BlogUserCardComponent({ uuid }: BlogCardProps) {
  const router = useRouter();
  const { data } = useGetBlogByUserUuidQuery({ uuid: uuid });

  return (
    <section>
      {/* Header section below card */}
      <section className={"flex justify-between mt-5 mx-5"}>
        <p className={"font-bold text-[20px]"}>
          More from {data?.data?.[0]?.user?.firstName}{" "}
          {data?.data?.[0]?.user?.lastName}
        </p>
      </section>

      {/* Card blog section */}
      <section
        className={"m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"}
      >
        {data?.data?.slice(0, 6).map((blog: Blog) => (
          <div
            key={blog.uuid}
            className=" mx-auto bg-white dark:bg-card_color_dark rounded-lg shadow-md overflow-hidden w-full"
          >
            <div className="relative w-full h-48">
              <Image
                src={blog.thumbnail[0]} // Use the actual thumbnail URL
                alt={blog.title}
                layout="fill"
                objectFit="cover"
              />
            </div>

            <div className="p-4 h-full relative ">
              <div className=" h-[45%] flex flex-col justify-between ">
                <div>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <img
                      src={blog.user.profile} // Use the actual profile URL
                      alt={`${blog.user.firstName} ${blog.user.lastName}`}
                      className="rounded-full h-8 w-8"
                    />
                    <div className="ml-2 flex justify-between w-full text-text_color_desc_light dark:text-text_color_desc_dark">
                      <p className="font-medium">
                        {blog.user.firstName} {blog.user.lastName}
                      </p>
                      <p>{new Date(blog.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <h2 className="line-clamp-1 text-lg font-semibold text-text_color_light dark:text-text_color_dark mb-2">
                    {blog?.title}
                  </h2>
                  <p className="line-clamp-2 text-text_color_desc_light dark:text-text_color_desc_dark text-sm mb-4">
                    {blog?.description}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <div className={"flex justify-between gap-[20px]"}>
                    <div className="flex items-center space-x-1 text-yellow-500">
                      <span>👏</span>
                      <span>{blog?.likesCount}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-500">
                      <span>💬</span>
                      <span>{blog?.countComments}</span>
                    </div>
                  </div>
                  <div onClick={() => router.push(`/blog/${blog?.uuid}`)} className="text-text_color_desc_light dark:text-text_color_desc_dark cursor-pointer font-medium hover:underline">
                    Read more
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
