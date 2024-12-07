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
      <div className="flex justify-between top-0 ">
        <p className="text-text_title_24">Blog Community</p>
        <Link
          href={"/blog/create"}
          className="px-3 py-2 bg-primary_color text-text_color_light flex rounded-[17px] items-center justify-center"
        >
          Create Blog
          <FaPlus className={"ml-1"} />
        </Link>
      </div>
      <div className="flex justify-between gap-[100px] my-5">
        {/* Conditionally render BlogTopicComponent or BlogComponent */}
        {topic ? <BlogTopicComponent topic={topic} /> : <BlogComponent />}

        {/* Sidebar */}
        <div className="w-[30%] hidden lg:block">
          {/* Common Topics */}
          <div>
            <p className="text-text_title_20 text-black my-2 dark: dark:text-text_color_desc_dark">
              Common Topics
            </p>
            <div className="py-2 flex flex-wrap gap-3">
              {commonTopicData.map((common: CommonTopic) => (
                <div
                  key={common.topic}
                  className="bg-text_color_dark dark:bg-card_color_dark px-4 py-2 rounded-[17px] cursor-pointer"
                  onClick={() => handleTopicClick(common.topic)}
                >
                  {common.topic}
                </div>
              ))}

              {/* Recent Posts */}
              <RecentPostComponent />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
