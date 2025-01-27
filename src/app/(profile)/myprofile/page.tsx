import React from "react";
import { Metadata } from "next";
import MyProfileComponent from "@/components/MyProfileComponent/MyProfileComponent";

export const metadata: Metadata = {
  title: "My profile - Inspectra",
  description:
    "Change up your profile on Inspectra, a leading platform from Cambodia that strengthens secure development with advanced source code analysis tools.",
  openGraph: {
    title: "My profile - Inspectra",
    description:
      "Change up your profile on Inspectra, a leading platform from Cambodia that strengthens secure development with advanced source code analysis tools.",
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
    <section className="w-[90%] mx-auto my-[60px]">
      <MyProfileComponent />
    </section>
  );
}
