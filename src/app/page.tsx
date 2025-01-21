import BenefitComponentCard from "@/components/BenefitComponentCard/BenefitComponentCard";
import HomePageFAQComponent from "@/components/FAQsComponent/HomePageFAQComponent";
import FeedbackCard from "@/components/FeedbackCardComponent/FeedbackCard";
import HeroComponent from "@/components/HeroComponent/HeroComponent";
import HomepageComponent from "@/components/HomepageComponent.tsx/HomepageComponent";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Inspectra: Secure Your Development with White-box Testing",
  description:
    "Inspectra, Cambodia's cutting-edge white-box testing platform, ensures secure development by analyzing your source code for vulnerabilities and security flaws. Leverage our powerful tools to prevent bugs and enhance your software’s security.",
  keywords:
    "Inspectra, white-box testing, source code scan, vulnerabilities scan, secure development, cybersecurity, code scanner, SAST platform, software security, cybersecurity tools, bug scan, inspect source code, secure coding practices, Cambodia cybersecurity, Inspectra code scan, bug vulnerability scanner, white-box website tools, cybersecurity for developers, inspect code Cambodia, secure software development, code scanning tools, prevent security flaws, code vulnerability checker",
  authors: { name: "Inspectra Team" },
  publisher: "Inspectra",
  openGraph: {
    title: "Inspectra - Secure Your Development with White-box Testing",
    description:
      "Inspectra, Cambodia's cutting-edge white-box testing platform, ensures secure development through advanced source code analysis to uncover security vulnerabilities.",
    siteName: "Inspectra",
    locale: "en_KH",
    type: "website",
    url: "https://inspectra.istad.co/",
    images: [
      {
        url: "https://api-inspectra.istad.co/images/3639a448-5eb8-43f4-bba9-a7f98c27792e.png",
        width: 1200,
        height: 630,
        alt: "Inspectra: Secure Development Platform",
      },
    ],
  },
  verification: {
    google: "8aJbxb2nySDM1wRTq0jzp9rk03yVGo0f3OLj-yA0HjM",
  },
};


export default function Home() {
  return (
    <main className="w-[90%] mx-auto relative z-10">
      {/* Hero Section */}
      <HeroComponent />

      {/* Our Working Process */}
      <HomepageComponent />

      {/* benefit section */}
      <section className="w-full text-center  lg:my-[80px]">
        <BenefitComponentCard />
      </section>

      {/* feedback section */}
      <section className="w-full text-center my-[80px]">
        <FeedbackCard />
      </section>

      {/* FAQs section */}
      <section className="w-full text-center my-[80px]">
        <HomePageFAQComponent />
      </section>
    </main>
  );
}
//
