"use client";

import { PiExportFill } from "react-icons/pi";
import { useState, useEffect } from "react";

export default function ExportButton({ onClick }: { onClick: () => void }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isOffset, setIsOffset] = useState(false);

  useEffect(() => {
    const handleVisibilityChange = (event: CustomEvent) => {
      setIsOffset(event.detail); // Update the offset based on the ScrollToTopButton visibility
    };

    window.addEventListener("scrollToTopVisibilityChange", handleVisibilityChange as EventListener);

    return () => {
      window.removeEventListener("scrollToTopVisibilityChange", handleVisibilityChange as EventListener);
    };
  }, []);

  const handleClick = async () => {
    setIsLoading(true);
    await onClick();
    setIsLoading(false);
  };

  return (
    <button
      onClick={handleClick}
      title="Export"
      className={`fixed right-4 z-[1100] w-11 h-11 flex justify-center items-center bg-primary_color hover:opacity-70 text-background_dark_mode p-3 rounded-full shadow-sm hover:bg-primary_dark transition-all duration-300 ${
        isOffset ? "bottom-16 mb-1" : "bottom-4"
      }`}
    >
      {isLoading ? (
        <div className="spinner-border animate-spin inline-block w-5 h-5 border-2 rounded-full border-t-2 border-text_color_light border-t-transparent"></div>
      ) : (
        <PiExportFill className="h-5 w-5" />
      )}
    </button>
  );
}
