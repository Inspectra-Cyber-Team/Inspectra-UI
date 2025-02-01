"use client";

import { RiRobot2Fill } from "react-icons/ri";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function AiButtonComponent() {
  const [isOffset, setIsOffset] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const isRender =
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/forget-password" ||
    pathname === "/newpassword" ||
    pathname === "/newpassword" ||
    pathname === "/verify" ||
    pathname === "/ai" ||
    pathname.startsWith("/project/") ||
    pathname === "/change-password";

  useEffect(() => {
    const handleVisibilityChange = (event: CustomEvent) => {
      setIsOffset(event.detail);
    };

    window.addEventListener("scrollToTopVisibilityChange", handleVisibilityChange as EventListener);

    return () => {
      window.removeEventListener("scrollToTopVisibilityChange", handleVisibilityChange as EventListener);
    };
  }, []);

  const handleClick = () => {
    router.push("/ai");
  };

  return (
    <>
    {!isRender && (
        <button
        onClick={handleClick}
        title="Go to AI Page"
        className={`fixed right-4 z-[1100] w-11 h-11 flex justify-center items-center bg-primary_color hover:opacity-70 text-background_dark_mode p-3 rounded-full shadow-sm hover:bg-primary_dark transition-all duration-300 ${
          isOffset ? "bottom-16 mb-1" : "bottom-4"
        }`}
      >
        <RiRobot2Fill className="h-5 w-5" />
      </button>
    )}
    </>
  );
}
