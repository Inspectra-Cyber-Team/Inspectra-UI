import BenefitComponentCard from "@/components/BenefitComponentCard/BenefitComponentCard";
import HomePageFAQComponent from "@/components/FAQsComponent/HomePageFAQComponent";
import FeedbackCard from "@/components/FeedbackCardComponent/FeedbackCard";
import HeroComponent from "@/components/HeroComponent/HeroComponent";
import HomepageComponent from "@/components/HomepageComponent.tsx/HomepageComponent";
import { Metadata } from "next";

export const metadata: Metadata ={
  title: 'Inspectra',
  description:
    'Welcome to Inspectra, a cutting-edge white-box testing platform from Cambodia that ensures secure development through source code analysis and identification of security vulnerabilities.',
  keywords:
    'Inspectra homepage, Inspectra, inspectra, inspect, cambodia, inspectra istad, inspectra.istad, istad, source code scan, scan, code scan, white-box testing Cambodia, secure development platform, source code analysis, cybersecurity tools, secure coding practices',
  authors: { name: 'Inspectra Team' },
  publisher: 'Inspectra',
  openGraph: {
    title: 'Inspectra',
    description:
      'Welcome to Inspectra, a cutting-edge white-box testing platform from Cambodia that ensures secure development through source code analysis and identification of security vulnerabilities.',
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

export default function Home() {
  return (
    <main className="w-[90%] mx-auto relative z-10">

      {/* Hero Section */}
      <HeroComponent />

      {/* Our Working Process */}
     <HomepageComponent/>
     
      {/* benefit section */}
      <section className="w-full text-center lg:my-[80px]">
        <BenefitComponentCard />
      </section>

      {/* feedback section */}
      <section className="w-full text-center my-[80px]">
        <FeedbackCard />
      </section>

      {/* FAQs section */}
      <section className="w-full text-center my-[60px]">
          <HomePageFAQComponent />
      </section>
    </main>
  );
}
//
