import FAQsComponent from "@/components/FAQsComponent/FAQsComponent";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQs - Inspectra",
  description:
    "Inspectra frequently asked questions to answers all your doubt on the scanning and tools or technique been used in the website",
  keywords:
    "Inspectra faqs, faqs, faq, Inspectra, inspectra, inspect, cambodia, inspectra istad, inspectra.istad, istad, source code scan, scan, code scan, faqs, white-box testing Cambodia, secure development platform, source code analysis, cybersecurity tools, secure coding practices, Cybersecurity tools Cambodia, cybersecurity, code scanner, white box testing, white-box tools, white-box website, white box website, scan code for vulnerabilities, vulnerabilities scan, scan for bugs, bug scan, scan for report, report from scanning code, SAST platform, sast platform, SAST, code scanning for developer, code vulnerability scanner, frequently asked questions, faq, faq page, faq section, faq page, faq website, faq website page, faq website section",
  authors: { name: "Inspectra Team" },
  publisher: "Inspectra",
  openGraph: {
    title: "FAQs - Inspectra",
    description:
      "Inspectra frequently asked questions to answers all your doubt on the scanning and tools or technique been used in the website",
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
    <section className="w-[90%] mx-auto relative z-10 my-[60px] ">
      <FAQsComponent />
    </section>
  );
}
