import ProjectContent from "@/components/Project/CardResultComponent/ProjectContentComponent";
import ProjectComponent from "@/components/Project/ProjectComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Project - Inspectra",
  description:
    "Access the Inspectra Project Dashboard, a centralized platform to scan, analyze, and review source code for vulnerabilities. Ensure secure development with advanced tools and detailed insights.",
  keywords:
    "Inspectra project, white-box testing Cambodia, Inspectra, inspectra, inspect, cambodia, inspectra istad, inspectra.istad, istad, source code scan, scan, code scan, secure development platform, source code analysis, cybersecurity tools, secure coding practices, Cybersecurity tools Cambodia, cybersecurity, code scanner, white box testing, white-box tools, white-box website, white box website, scan code for vulnerabilities, vulnerabilities scan, scan for bugs, bug scan, scan for report, report from scanning code, SAST platform, sast platform, SAST, code scanning for developer, code vulnerability scanner, project, project dashboard, project scan, project analysis, project review, project vulnerability, project secure development, project advanced tools, project detailed insights",
  authors: { name: "Inspectra Team" },
  publisher: "Inspectra",
  openGraph: {
    title: "Project - Inspectra",
    description:
      "Access the Inspectra Project Dashboard, a centralized platform to scan, analyze, and review source code for vulnerabilities. Ensure secure development with advanced tools and detailed insights.",
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

export default function page() {
  return (
    <main className="w-[90%] mx-auto">
      {/*  for create prject */}
      <ProjectComponent />
      {/* project page */}
      <ProjectContent />
    </main>
  );
}
