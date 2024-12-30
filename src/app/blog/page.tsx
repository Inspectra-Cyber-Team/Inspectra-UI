import React from "react";
import { Metadata } from "next";
import BlogPageComponent from "@/components/BlogComponent/BlogPageComponent";

export const metadata: Metadata = {
  title: "Blog community - Inspectra",
  description:
    "Blog community of Inspectra, a leading platform from Cambodia that strengthens secure development with advanced source code analysis tools.",
  keywords:
    "Inspectra Blog, blog community, blog, Inspectra, inspectra, inspect, cambodia, inspectra istad, inspectra.istad, istad, source code scan, scan, code scan, white-box testing Cambodia, secure development platform, source code analysis, cybersecurity tools, secure coding practices",
  authors: { name: "Inspectra Team" },
  publisher: "Inspectra",
  openGraph: {
    title: "Blog community - Inspectra",
    description:
      "Blog community of Inspectra, a leading platform from Cambodia that strengthens secure development with advanced source code analysis tools.",
    siteName: "Inspectra",
    locale: "en_KH",
    type: "website",
    url: "https://inspectra.istad.co/",
    images: [
      {
        url: "https://api-inspectra.istad.co/images/3639a448-5eb8-43f4-bba9-a7f98c27792e.png",
        width: 1200,
        height: 630,
        alt: "Inspectra",
      },
    ],
  },
};

export default function page() {
  return (
    <section className="w-[90%] mx-auto my-5">
      <BlogPageComponent />
    </section>
  );
}
