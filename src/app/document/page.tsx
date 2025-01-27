import Document from "@/components/DocumentComponent/Document";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Document - Inspectra",
  description:
    "Inspectra documentation providing step by step guide and code scanning, set up quality gateway through custom rules, issue, rule violations and enhancing CI/CD pipelines.",
  keywords:
    "Inspectra Document, document, Inspectra, inspectra, inspect, cambodia, inspectra istad, inspectra.istad, istad, source code scan, scan, code scan, white-box testing Cambodia, secure development platform, source code analysis, cybersecurity tools, secure coding practices",
  authors: { name: "Inspectra Team" },
  publisher: "Inspectra",
  openGraph: {
    title: "Document - Inspectra",
    description:
      "Inspectra documentation providing step by step guide and code scanning, set up quality gateway through custom rules, issue, rule violations and enhancing CI/CD pipelines.",
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

export default function DocumentPage() {
  return <Document />;
}
