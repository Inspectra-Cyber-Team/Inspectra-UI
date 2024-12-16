"use client";

import React from "react";
import { useRouter } from "next/navigation";
import BlogComponent from "../BlogComponent/BlogComponent";

export default function BlogHistoryComponent() {
  const router = useRouter();

  return (
    <section>
      {/* header */}
      <div className="flex justify-between">
        <p className="text-text_title_20 text-text_color_light dark:text-text_color_dark">
          Blog History
        </p>
        <div className="flex gap-3 text-text_body_16 text-text_color_desc_light dark:text-text_color_desc_dark">
          <p className="text-ascend_color">
            Blog <span className="hidden md:inline-block">History</span>
          </p>
          <span>/</span>
          <button onClick={() => router.push("/scanHistory")}>
            Scan <span className="hidden md:inline-block">History</span>
          </button>
          <span>/</span>
          <button onClick={() => router.push("/myProfile")}>
            Profile <span className="hidden md:inline-block">Setting</span>
          </button>
        </div>
      </div>
      {/* body */}

      <div className="w-full bg-card_color_light dark:bg-card_color_dark rounded-[20px] my-10 p-10">
        <BlogComponent />
      </div>
    </section>
  );
}
