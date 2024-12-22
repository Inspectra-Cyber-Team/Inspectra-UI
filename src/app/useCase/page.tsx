import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Metadata } from "next";
import UseCaseComponent from "@/components/UseCaseComponent/UseCaseComponent";
import React from "react";
import Link from "next/link";

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
      {/* Hero Section */}
      <section className="text-center">
        <h1 className="inline-block rounded-sm text-text_color_light bg-primary_color px-6 py-2 text-3xl font-bold rounded-tl-[20px] rounded-br-[20px] mt-6">
          Who&apos;s it for ?
        </h1>
        <p className="mx-auto mt-6 w-[90%] text-lg text-text_color_light dark:text-text_color_dark">
          Inspectra is widely used by various roles in software development to
          maintain and improve code quality. Developers rely on it to get
          insights into their code, identifying potential issues like bugs, code
          smells, and security vulnerabilities, which helps them write cleaner
          and more maintainable code. Development teams use Inspectra to enforce
          consistent coding standards across projects, reduce bugs, and track
          areas of technical debt.
        </p>
        <Link href="/project">
          <Button className="bg-background_dark_mode dark:bg-card_color_dark hover:bg-gray-800 dark:hover:bg-gray-600 text-white rounded-tl-[20px] rounded-br-[20px] px-5 py-2 mt-6 w-[180px] h-[50px]"
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5 sm:h-6 sm:w-6" />
          </Button>
        </Link>
      </section>

      {/* Use Case Section */}
      <UseCaseComponent />
    </main>
  );
}
