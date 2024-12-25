import Document from "@/components/DocumentComponent/Document";
import { Metadata } from "next";

export const metadata: Metadata ={
  title: 'Document - Inspectra',
  description:
    'Inspectra documentation providing step by step guide and code scanning, set up quality gateway through custom rules, issue, rule violations and enhancing CI/CD pipelines.',
  keywords:
    'Inspectra Document, document, Inspectra, inspectra, inspect, cambodia, inspectra istad, inspectra.istad, istad, source code scan, scan, code scan, white-box testing Cambodia, secure development platform, source code analysis, cybersecurity tools, secure coding practices',
  authors: { name: 'Inspectra Team' },
  publisher: 'Inspectra',
  openGraph: {
    title: 'Document - Inspectra',
    description:
      'Inspectra documentation providing step by step guide and code scanning, set up quality gateway through custom rules, issue, rule violations and enhancing CI/CD pipelines.',
    siteName: 'Inspectra',
    locale: 'en_KH',
    type: 'website',
    url: 'https://inspectra.istad.co/',
    images: [
      {
        url: 'http://136.228.158.126:4011/images/3639a448-5eb8-43f4-bba9-a7f98c27792e.png',
        width: 1200,
        height: 630,
        alt: 'Inspectra',
      },
    ],
  },
}

export default function DocumentPage() {
  return(
    <Document />
  )
}