import React from "react";
import { Metadata } from "next";
import AboutUsPage from "@/components/AboutUsComponent/AboutUsPage";

export const metadata: Metadata = {
  title: "About Us - Inspectra",
  description:
    "Inspectra mission and vision with the team and mentor. Inspectra empowers you to uncover hidden risks with precision. Through deep, intelligent scanning and proactive insights, we help you secure your code and protect against unseen vulnerabilities—keeping your systems resilient and your data safe based on Sonarqube Architecture",
  keywords:
    "Inspectra About Us, Inspectra, inspectra, inspect, cambodia, inspectra istad, inspectra.istad, istad, source code scan, scan, code scan, white-box testing Cambodia, secure development platform, source code analysis, cybersecurity tools, secure coding practices",
  authors: { name: "Inspectra Team" },
  publisher: "Inspectra",
  openGraph: {
    title: "About Us - Inspectra",
    description:
      "Check up your scanning history of all your previous scans on Inspectra, a leading platform from Cambodia that strengthens secure development with advanced source code analysis tools.",
    siteName: "Inspectra",
    locale: "en_KH",
    type: "website",
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
    <main>
      <AboutUsPage />
    </main>
  );
}
