import React from "react";
import BlogHistoryComponent from "@/components/MyProfileComponent/BlogHistoryComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog History - Inspectra",
  description:
    "Explore Inspectra’s history, a cutting-edge white-box testing platform from Cambodia that ensures secure development through source code analysis and identification of security vulnerabilities.",
  openGraph: {
    title: "Blog History - Inspectra",
    description:
      "Delve into the history of Inspectra, a leading platform from Cambodia that strengthens secure development with advanced source code analysis tools.",
    siteName: "Inspectra",
    url: "https://inspectra.istad.co/",
    images: [
      {
        url: "https://api-inspectra.istad.co/images/1b42a22a-897f-4bd0-b4f2-ba1a9e9e3659.png",
        width: 1200,
        height: 630,
        alt: "Inspectra",
      },
    ],
  },
};

export default function page() {
  return (
    <div className="w-[90%] mx-auto my-[60px]">
      <BlogHistoryComponent />
    </div>
  );
}
