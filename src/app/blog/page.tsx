import React from "react";
import { Metadata } from "next";
import BlogPageComponent from "@/components/BlogComponent/BlogPageComponent";

export const metadata: Metadata = {
  title: 'Blog community - Inspectra',
  description:
    'Blog community of Inspectra, a leading platform from Cambodia that strengthens secure development with advanced source code analysis tools.',
  keywords:
    'Inspectra Blog, blog community, white-box testing Cambodia, secure development platform, source code analysis, cybersecurity tools, secure coding practices',
  authors: { name: 'Inspectra Team' },
  publisher: 'Inspectra',
  openGraph: {
    title: 'Blog community - Inspectra',
    description:
      'Blog community of Inspectra, a leading platform from Cambodia that strengthens secure development with advanced source code analysis tools.',
    siteName: 'Inspectra',
    locale: 'en_KH',
    type: 'website',
  },
};

export default function page() {
  return (
    <section className="w-[90%] mx-auto my-[60px]">
      <BlogPageComponent />
    </section>
  );
}
