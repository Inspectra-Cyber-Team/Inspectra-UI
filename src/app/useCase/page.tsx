import { Metadata } from "next";
import UseCaseComponent from "@/components/UseCaseComponent/UseCaseComponent";
import React from "react";

export const metadata: Metadata ={
  title: 'Use Case - Inspectra',
  description:
    'Learn more about Inspectra, a white-box testing platform designed to review source code and identify security weaknesses. Discover our mission, values, and commitment to secure development.',
  keywords:
    'Inspectra use case, Inspectra, inspectra, inspect, source code scan, scan, code scan, use case, white-box testing Cambodia, secure development platform, source code analysis, cybersecurity tools, secure coding practices',
  authors: { name: 'Inspectra Team' },
  publisher: 'Inspectra',
  openGraph: {
    title: 'Use Case - Inspectra',
    description:
      'Verify up your email in the case of forgetting your password and recieve OTP to setup your new password',
    siteName: 'Inspectra',
    locale: 'en_KH',
    type: 'website',
    url: 'https://inspectra.istad.co/'
  },
}

export default function page() {
  return (
    <main>
      <UseCaseComponent />
    </main>
  );
}
