import CreateBlogComponen from "@/components/BlogComponent/CreateBlogComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Blog - Inspectra",
  description:
    "Create your blog on Inspectra, a leading platform from Cambodia that strengthens secure development with advanced source code analysis tools.",
  keywords:
    "Inspectra Create Blog, Inspectra, inspectra, inspect, source code scan, scan, code scan, blog create, create blog, white-box testing Cambodia, secure development platform, source code analysis, cybersecurity tools, secure coding practices",
  authors: { name: "Inspectra Team" },
  publisher: "Inspectra",
  openGraph: {
    title: "Create Blog - Inspectra",
    description:
      "Create your blog on Inspectra, a leading platform from Cambodia that strengthens secure development with advanced source code analysis tools.",
    siteName: "Inspectra",
    locale: "en_KH",
    type: "website",
    url: 'https://inspectra.istad.co/'
  },
};

export default function page() {
  return (
    <section>
      <CreateBlogComponen />
    </section>
  );
}
