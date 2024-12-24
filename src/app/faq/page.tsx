import FAQsComponent from "@/components/FAQsComponent/FAQsComponent";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata ={
  title: 'FAQs - Inspectra',
  description:
    'Inspectra frequently asked questions to answers all your doubt on the scanning and tools or technique been used in the website',
  keywords:
    'Inspectra faqs, Inspectra, inspectra, inspect, source code scan, scan, code scan, faqs, white-box testing Cambodia, secure development platform, source code analysis, cybersecurity tools, secure coding practices',
  authors: { name: 'Inspectra Team' },
  publisher: 'Inspectra',
  openGraph: {
    title: 'FAQs - Inspectra',
    description:
      'Inspectra frequently asked questions to answers all your doubt on the scanning and tools or technique been used in the website',
    siteName: 'Inspectra',
    locale: 'en_KH',
    type: 'website',
    url: 'https://inspectra.istad.co/',
    images: [
      {
        url: '/images/openGraph.png',
        width: 1200,
        height: 630,
        alt: 'Inspectra',
      },
    ],
  },
}

export default function page() {
  return (
    <section className="w-[90%] mx-auto relative z-10 my-[60px] ">
      {/* title */}
      <div className="text-text_title_20 md:text-text_header_34 mb-[60px] text-center rounded-tl-[20px] rounded-br-[20px] text-text_color_light  p-2 bg-primary_color w-full md:w-[500px] h-full">
        Get your doubts answered
      </div>
      <FAQsComponent />
    </section>
  );
}
