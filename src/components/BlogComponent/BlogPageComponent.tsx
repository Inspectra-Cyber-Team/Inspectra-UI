"use client";
import BlogComponent from "@/components/BlogComponent/BlogComponent";
import RecentPostComponent from "@/components/BlogComponent/RecentPostComponent";
import { FaPlus } from "react-icons/fa6";
import { commonTopicData } from "@/data/commonTopic";
import { CommonTopic } from "@/types/CommonTopic";
import Link from "next/link";
import { useState } from "react";
import BlogTopicComponent from "./BlogtopicComponent";

export default function BlogPageComponent() {
  
  const [topic, setTopic] = useState<string>("");

  const handleTopicClick = (topicName: string) => {
    if (topicName === topic) {
      setTopic(""); // Clear the selected topic if clicked again
    } else {
      setTopic(topicName); // Set the new topic
    }
  };

  return (
    <section>
      <div className="flex justify-between">
        <h2 className="text-text_title_24 font-bold">Blog Community</h2>
        <Link
          href={"/blog/create"}
          className="px-3 py-2 bg-primary_color text-text_color_light flex rounded-[17px] items-center justify-center"
        >
          <span className="md:block">Create Blog</span>
          <FaPlus className={"ml-1"} />
        </Link>
      </div>
      <div className="flex justify-between gap-14 my-5">
        {/* Main Content */}
        <div className="w-full lg:w-[70%]">
          {topic ? <BlogTopicComponent topic={topic} /> : <BlogComponent />}
        </div>

        {/* Sidebar */}
        <div className="hidden lg:block w-[30%]">
          {/* Common Topics */}
          <div>
            <p className="text-text_title_20 text-text_color_light dark:text-text_color_dark my-2 font-semibold">
              Common Topics
            </p>
            <div className="py-2 mb-8 flex flex-wrap gap-3">
              {commonTopicData.map((common: CommonTopic) => (
                <button
                  key={common.topic}
                  className="bg-card dark:bg-card_color_dark px-3 py-2 rounded-2xl cursor-pointer hover:bg-primary_color text-center justify-center"
                  onClick={() => handleTopicClick(common.topic)}
                >
                  {common.topic}
                </button>
              ))}
            </div>
            {/* Recent Posts */}
            <RecentPostComponent />
          </div>
        </div>
      </div>

    </section>
  );
}
