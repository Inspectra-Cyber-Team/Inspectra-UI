import FormForgetPassowrd from "@/components/FormForgetPassword/FormForgetPassword";
import { Metadata } from "next";

export const metadata: Metadata ={
  title: 'Forget password - Inspectra',
  description:
    'Forgot off your password? Complete the form here to get started',
  keywords:
    'Inspectra forget password, Inspectra, inspectra, inspect, source code scan, scan, code scan, white-box testing Cambodia, secure development platform, source code analysis, cybersecurity tools, secure coding practices',
  authors: { name: 'Inspectra Team' },
  publisher: 'Inspectra',
  openGraph: {
    title: 'Forget password - Inspectra',
    description:
      'Forgot off your password? Complete the form here to get started',
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

export default function page() {
  return <FormForgetPassowrd />;
}
