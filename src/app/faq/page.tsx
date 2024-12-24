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
    url: 'https://inspectra.istad.co/'
  },
}

export default function page() {
  return (
    <section className="w-[90%] mx-auto relative z-10 my-[60px] ">
     
      <FAQsComponent />
    </section>
  );
}
