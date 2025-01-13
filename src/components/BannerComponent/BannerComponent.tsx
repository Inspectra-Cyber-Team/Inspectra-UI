"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function BannerComponent() {
  const pathname = usePathname(); // Get the current path.

  const [isScrolled, setIsScrolled] = useState(false); // Track scroll position.

  const isRender =
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/forgetpassword" ||
    pathname === "/newpassword" ||
    pathname === "/verify" ||
    pathname === "/change-password" ||
    pathname === "/forget-password";

    useEffect(() => {
      const handleScroll = () => {
        const scrollTop = window.scrollY;
        // Set isScrolled to true when scrolled beyond 30px.
        setIsScrolled(scrollTop > 30);
      };
  
      window.addEventListener("scroll", handleScroll);
  
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);

  return (
    <>
      {!isRender && (
        <div
        className={`w-full mx-auto z-40 backdrop-blur-2xl sticky top-0 h-[30px] ${
          isScrolled
            ? "bg-white dark:bg-card_color_dark text-black" // Change background and text color when scrolled.
            : "bg-background_dark_mode dark:bg-card_color_dark text-primary_color"
        } flex justify-center items-center text-[12px] transition-colors duration-300`}
      >
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
