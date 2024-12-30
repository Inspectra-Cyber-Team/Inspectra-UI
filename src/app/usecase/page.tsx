import { Metadata } from "next";
import UseCaseComponent from "@/components/UseCaseComponent/UseCaseComponent";
import React from "react";

export const metadata: Metadata = {
  title: "Use Case - Inspectra",
  description:
    "Inspectra is design specifically for developers, offering tools to make code scannning and development more easier and secure",
  keywords:
    "Inspectra use case, use case, Inspectra, inspectra, inspect, cambodia, inspectra istad, inspectra.istad, istad, source code scan, scan, code scan, use case, white-box testing Cambodia, secure development platform, source code analysis, cybersecurity tools, secure coding practices",
  authors: { name: "Inspectra Team" },
  publisher: "Inspectra",
  openGraph: {
    title: "Use Case - Inspectra",
    description:
      "Inspectra is design specifically for developers, offering tools to make code scannning and development more easier and secure",
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
    <section>
      {/*  */}
      <UseCaseComponent />
    </section>
  );
}
