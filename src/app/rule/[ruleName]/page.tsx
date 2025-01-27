import React from "react";
import { ruleName } from "@/types/Params";
import RuleComponent from "@/components/RuleComponent/RuleComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rules - Inspectra",
  description:
    "Inspectra provides a comprehensive list of rules to help you identify and address code vulnerabilities. Learn more about our rules and how they can help you secure your code.",
  openGraph: {
    title: "Rules - Inspectra",
    description:
      "Inspectra provides a comprehensive list of rules to help you identify and address code vulnerabilities. Learn more about our rules and how they can help you secure your code.",
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

export default function page(prop: ruleName) {
  const ruleName = prop?.params?.ruleName;

  return (
    <section>
      <RuleComponent ruleKey={ruleName} />
    </section>
  );
}
