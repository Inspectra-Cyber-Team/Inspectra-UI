"use client";
import BlogComponent from "@/components/BlogComponent/BlogComponent";
import RecentPostComponent from "@/components/BlogComponent/RecentPostComponent";
import { FaPlus } from "react-icons/fa6";
import { CommonTopic } from "@/types/CommonTopic";
import Link from "next/link";
import { useState } from "react";
import BlogTopicComponent from "./BlogtopicComponent";
import { useGetAllTopicQuery } from "@/redux/service/topic";

export default function BlogPageComponent() {
  const [isLoading, setIsloading] = useState<boolean>(false);

  const [topic, setTopic] = useState<string>("");

  const handleTopicClick = (topicName: string) => {
    if (topicName === topic) {
      setTopic(""); // Clear the selected topic if clicked again
    } else {
      setTopic(topicName);
    }
  };

  const { data: topicData, isLoading: topicLoading } = useGetAllTopicQuery({
    page: 0,
    pageSize: 25,
  });

  return (
    <section>
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center my-3">
        <h2 className="text-text_title_24 font-bold">Blog Community</h2>
        <Link
          onClick={() => setIsloading(true)}
          href={"/blog/create"}
          className="px-3 py-2 bg-primary_color hover:bg-primary_color/70 text-text_color_light flex rounded-[17px] items-center justify-center text-sm sm:text-base"
        >
          <span className="sm:block">
            {isLoading ? (
              <div className="spinner-border animate-spin inline-block w-5 h-5 border-2 rounded-full border-t-2 border-text_color_light border-t-transparent"></div>
            ) : (
              <span className="flex items-center">
                <span className="hidden sm:block md:flex ">
                  Create Blog <span className="ml-2 mt-1"><FaPlus /></span>
                </span>
                <span className="block sm:hidden">
                  <FaPlus />
                </span>
              </span>
            )}
          </span>
        </Link>
      </div>

      {/* Common Topics as Navbar */}
      <div className="py-2 flex gap-3 overflow-x-auto whitespace-nowrap lg:hidden scrollbar-hide">
        {topicData?.content.map((common: CommonTopic) => (
          <button
            key={common?.uuid}
            className={`bg-card dark:bg-card_color_dark px-3 py-2 rounded-3xl cursor-pointer hover:bg-primary_color text-sm sm:text-base text-center justify-center
            ${
                        topic === common?.name
                          ? "bg-primary_color dark:bg-primary_color dark:text-text_color_light"
                          : "bg-card  dark:bg-card_color_dark hover:bg-primary_color"
                      }`}
            onClick={() => handleTopicClick(common?.name)}
          >
            {common?.name}
          </button>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row justify-between lg:gap-14 lg:my-2">
        {/* Main Content */}
        <div className="w-full lg:w-[70%]">
          {topic ? <BlogTopicComponent topic={topic} /> : <BlogComponent />}
        </div>
        {/* Sidebar */}
        <div className="lg:w-[30%] w-full order-1 lg:order-none">
          {/* Common Topics (Hidden on Smaller Screens) */}
          <div className="hidden lg:block">
            <p className="text-text_title_20 text-text_color_light dark:text-text_color_dark my-2 font-semibold">
              Common Topic
            </p>
            {topicLoading && (
              <div className="flex justify-center items-center">
                <div className="spinner-border animate-spin inline-block w-6 h-6 border-2 rounded-full border-t-2 border-text_color_light border-t-transparent "></div>
              </div>
            )}
            <div className="py-2 flex flex-wrap gap-3">
              {topicData?.content
                .filter((common: CommonTopic) => common?.name !== "other")
                .map((common: CommonTopic) => (
                  <button
                    key={common?.uuid}
                    className={`px-3 py-2 rounded-3xl cursor-pointer text-sm sm:text-base text-center justify-center 
                      ${
                        topic === common?.name
                          ? "bg-primary_color dark:bg-primary_color dark:text-text_color_light"
                          : "bg-card dark:bg-card_color_dark hover:bg-primary_color"
                      }`}
                    onClick={() => handleTopicClick(common?.name)}
                  >
                    {common?.name}
                  </button>
                ))}
            </div>
          </div>
          {/* Recent Posts */}
          <div className="mt-10">
            <RecentPostComponent />
          </div>
        </div>
      </div>
    </section>
  );
}
