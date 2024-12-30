"use client";

import { useGetUserHistoryBlogQuery } from "@/redux/service/user";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaCalendarAlt, FaCommentDots, FaEye } from "react-icons/fa";
import { FaHandsClapping } from "react-icons/fa6";
import LoadProjectComponent from "../Project/LoadingProjectComponent/LoadProjectComponent";
import { Blog } from "@/types/Blog";
import { convertToDayMonthYear } from "@/lib/utils";

export default function BlogHistoryComponent() {
  const router = useRouter();
  const [userUUID, setUserUUID] = useState("");
  useEffect(() => {
    setUserUUID(localStorage.getItem("userUUID") || "");
  });

  const [activeTab, setActiveTab] = useState("bloghistory");

  const handleTabClick = (tab: any) => {
    setActiveTab(tab);
    if (tab === "scanhistory") {
      router.push("/scanhistory");
    } else if (tab === "myprofile") {
      router.push("/myprofile");
    } else if (tab === "bookmark") {
      router.push("/bookmark");
    }
  };

  const { data: userBlogData } = useGetUserHistoryBlogQuery({
    uuid: userUUID,
  });

  const blogHistory = userBlogData?.data?.blog;

  return (
    <section>
      {/* header */}
      <div className="flex justify-center md:justify-between pb-2">
        <p className="text-text_title_20 text-text_color_light dark:text-text_color_dark hidden md:inline-block">
          Blog History
        </p>
        <div className="flex gap-6 text-text_body_16">
          <button
            onClick={() => setActiveTab("bloghistory")}
            className={`pb-2 ${
              activeTab === "bloghistory"
                ? "border-b-2 border-ascend_color text-ascend_color"
                : "text-text_color_desc_light dark:text-text_color_desc_dark"
            }`}
          >
            Blog <span className="hidden md:inline-block">History</span>
          </button>
          <button
            onClick={() => handleTabClick("bookmark")}
            className={`pb-2 ${
              activeTab === "bookmark"
                ? "border-b-2 border-ascend_color text-ascend_color"
                : "text-text_color_desc_light dark:text-text_color_desc_dark"
            }`}
          >
            <span className="hidden md:inline-block">Blog</span> Bookmark
          </button>
          <button
            onClick={() => handleTabClick("scanhistory")}
            className={`pb-2 ${
              activeTab === "scanhistory"
                ? "border-b-2 border-ascend_color text-ascend_color"
                : "text-text_color_desc_light dark:text-text_color_desc_dark"
            }`}
          >
            Scan <span className="hidden md:inline-block">History</span>
          </button>
          <button
            onClick={() => handleTabClick("myprofile")}
            className={`pb-2 ${
              activeTab === "myprofile"
                ? "border-b-2 border-ascend_color text-ascend_color"
                : "text-text_color_desc_light dark:text-text_color_desc_dark"
            }`}
          >
            Profile <span className="hidden md:inline-block">Setting</span>
          </button>
        </div>
      </div>
      {/* body */}

      <div className="w-full bg-card_color_light dark:bg-card_color_dark rounded-[20px] my-10 p-10">
        {blogHistory?.length > 0 ? (
          <section>
            {blogHistory?.map((blog: Blog, index: number) => (
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
                  <p
                    className="text-text_body_16  cursor-pointer  text-text_color_desc_light dark:text-text_color_desc_dark line-clamp-1"
                    dangerouslySetInnerHTML={{
                      __html: blog?.description || "",
                    }}
                  ></p>

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
                        className="cursor-pointer text-text_color_desc_light dark:text-text_color_desc_dark"
                        //onClick={() => handleLike(blog?.uuid)}
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
                <div
                  className={
                    "w-[200px] h-[150px] hidden lg:block overflow-hidden"
                  }
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
        ) : (
          <LoadProjectComponent textDisplay={"No Blog History"} />
        )}
      </div>
    </section>
  );
}
