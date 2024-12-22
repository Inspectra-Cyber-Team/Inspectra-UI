import ProjectContent from "@/components/Project/CardResultComponent/ProjectContentComponent";
import ProjectComponent from "@/components/Project/ProjectComponent";
import { Metadata } from "next";

export const metadata: Metadata ={
  title: 'Project - Inspectra',
  description:
    'Access the Inspectra Project Dashboard, a centralized platform to scan, analyze, and review source code for vulnerabilities. Ensure secure development with advanced tools and detailed insights.',
  keywords:
    'Inspectra project, white-box testing Cambodia, secure development platform, source code analysis, cybersecurity tools, secure coding practices',
  authors: { name: 'Inspectra Team' },
  publisher: 'Inspectra',
  openGraph: {
    title: 'Project - Inspectra',
    description:
      'Access the Inspectra Project Dashboard, a centralized platform to scan, analyze, and review source code for vulnerabilities. Ensure secure development with advanced tools and detailed insights.',
    siteName: 'Inspectra',
    locale: 'en_KH',
    type: 'website',
  },
}

export default function page() {
  return (
    <main className="w-[90%] mx-auto">
      <ProjectComponent />
      <ProjectContent />
    </main>
  );
}
