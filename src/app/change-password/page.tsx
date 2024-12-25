import FormUpdatePassowrd from "@/components/FormChangePassword/FormChangePassword";
import { Metadata } from "next";

export const metadata: Metadata ={
  title: 'Change Password - Inspectra',
  description:
    'Change up your password and get started with your new password',
  keywords:
    'Inspectra, white-box testing Cambodia, Inspectra, inspectra, inspect, source code scan, scan, code scan, secure development platform, source code analysis, cybersecurity tools, secure coding practices',
  authors: { name: 'Inspectra Team' },
  publisher: 'Inspectra',
  openGraph: {
    title: 'Change Password - Inspectra',
    description:
      'Change up your password and get started with your new password',
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
  return <FormUpdatePassowrd />;
}
