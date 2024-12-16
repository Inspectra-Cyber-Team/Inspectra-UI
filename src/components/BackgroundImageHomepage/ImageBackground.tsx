"use client";

import React from "react";
import { usePathname } from "next/navigation";

export default function ImageBackground() {
  const pathname = usePathname(); // Get the current path.

  // Hide images only on the '/aboutUs' page.
  const isRender =
    pathname === "/aboutUs" ||
    pathname === "/useCase" ||
    pathname === "/project" ||
    pathname === "/useCase" ||
    pathname === "/blog" ||
    pathname === "/faq" ||
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/signup" ||
    pathname === "/forgetpassword" ||
    pathname === "/newpassword" ||
    pathname === "/newpassword" ||
    pathname === "/verify" ||
    pathname === "/scanHistory" ||
    pathname === "/blogHistory" ||
    pathname === "/change-password" ||
    pathname === "/forget-password" ||
    pathname === "/myProfile";

  return (
    <>
      {!isRender && (
        <>
          <img
            src="/images/Ellipse-bg.png"
            alt="Background Top Right"
            className="absolute hidden lg:block md:h-[500px] xl:h-[600px] xl:w-[600px] -z-30 -top-10 -right-10 filter blur-2xl"
          />
          <img
            src="/images/Ellipse-bg.png"
            alt="Background Bottom Left"
            className="absolute hidden lg:block md:h-[500px] md:w-[500px] xl:h-[600px] xl:w-[600px] -z-30 -bottom-[5px] -left-[200px] md:top-[140px] md:-left-[250px] lg:top-[140px] lg:-left-[250px] xl:top-[300px] xl:-left-[400px] filter blur-3xl"
          />
        </>
      )}
    </>
  );
}
