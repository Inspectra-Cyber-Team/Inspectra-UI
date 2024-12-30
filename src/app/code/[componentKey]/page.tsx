import ShowCodeComponent from "@/components/codeComponent/ShowCodeComponent";
import React from "react";
import { componentParams } from "@/types/Params";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Code - Inspectra",
  description:
    "Inspectra provides a comprehensive list of code to help you identify and address code vulnerabilities. Learn more about our code and how they can help you secure your code.",
  openGraph: {
    title: "Code - Inspectra",
    description:
      "Inspectra provides a comprehensive list of code to help you identify and address code vulnerabilities. Learn more about our code and how they can help you secure your code.",
    siteName: "Inspectra",
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

export default function page(prod: componentParams) {
  const componentKey = prod.params.componentKey;

  return <ShowCodeComponent componentKey={componentKey} />;
}
