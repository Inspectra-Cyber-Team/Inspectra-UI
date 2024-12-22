"use client";
import React from "react";
import { usePathname } from "next/navigation";

export default function BannerComponent() {
  const pathname = usePathname(); // Get the current path.

  const isRender =
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/forgetpassword" ||
    pathname === "/newpassword" ||
    pathname === "/verify" ||
    pathname === "/change-password" ||
    pathname === "/forget-password";
  return (
    <>
      {!isRender && (
        <div className="w-full mx-auto z-40 backdrop-blur-2xl sticky top-0 h-[30px] bg-background_dark_mode dark:bg-card_color_dark flex justify-center items-center text-primary_color text-[12px]">
          <img src="/images/Announcement.svg" className="h-5 w-5 mx-2 hidden md:block"></img>
          <p><span className="hidden md:inline-block">Announcement :</span> We have updated our project! Check it out !</p>
          <img
            src="/images/Announcement.svg"
            className="h-5 w-5 mx-2 scale-x-[-1] hidden md:block"
          ></img>
        </div>
      )}
    </>
  );
}
