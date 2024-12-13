import React from "react";
import { Metadata } from "next";
import BlogPageComponent from "@/components/BlogComponent/BlogPageComponent";

export const metadata: Metadata = {
  title: "Blog - Inspectra",
  description:
    "Learn more about Inspectra, a white-box testing platform designed to review source code and identify security weaknesses. Discover our mission, values, and commitment to secure development.",
};

export default function page() {
  return (
    <section className="w-[90%] mx-auto my-[60px]">
      <BlogPageComponent />
    </section>
  );
}
