import CreateBlogComponen from "@/components/BlogComponent/CreateBlogComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Blog - Inspectra",
  description:
    "Create your blog on Inspectra, a leading platform from Cambodia that strengthens secure development with advanced source code analysis tools.",
  keywords:
    "Inspectra Create Blog, Inspectra, inspectra, inspect, cambodia, inspectra istad, inspectra.istad, istad, source code scan, scan, code scan, blog create, create blog, white-box testing Cambodia, secure development platform, source code analysis, cybersecurity tools, secure coding practices, Cybersecurity tools Cambodia, cybersecurity, code scanner, white box testing, white-box tools, white-box website, white box website, scan code for vulnerabilities, vulnerabilities scan, scan for bugs, bug scan, scan for report, report from scanning code, SAST platform, sast platform, SAST, code scanning for developer, code vulnerability scanner, code scanner, cyber content, cyber blog, cyber security blog, cyber security content, cyber security news, cyber security articles, cyber security information, cyber security resources, cyber security tips, cyber security guide, cyber security tutorial, cyber security best practices, cyber security tools, cyber security platform, cyber security community, cyber security community blog, reply blog, like blog, comment blog",
  authors: { name: "Inspectra Team" },
  publisher: "Inspectra",
  openGraph: {
    title: "Create Blog - Inspectra",
    description:
      "Create your blog on Inspectra, a leading platform from Cambodia that strengthens secure development with advanced source code analysis tools.",
    siteName: "Inspectra",
    locale: "en_KH",
    type: "website",
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
};

export default function page() {
  return (
    <section>
      <CreateBlogComponen />
    </section>
  );
}
