"use client";
import React from "react";
import { useTheme } from "next-themes";
export default function LoadProjectComponent({ textDisplay }: any) {
  const { theme } = useTheme();
  return (
    <section>
      <div className="w-full h-full flex justify-center items-center ">
        {theme === "dark" ? (
          <img
            src={"/images/loading.png"}
            alt="loading"
            className=" md:h-[300px] md:w-[300px] lg:h-[400px] lg:w-[400px] object-cover"
          />
        ) : (
          <img
            src={"/images/loading-light.png"}
            alt="loading"
            className=" md:h-[300px] md:w-[300px] lg:h-[400px] lg:w-[400px] object-cover"
          />
        )}
      </div>
      <p className="my-5 text-center text-text_color_light dark:text-text_color_dark xl:text-text_title_24">
       {textDisplay}
      </p>
    </section>
  );
}
