import FormUpdatePassowrd from "@/components/FormChangePassword/FormChangePassword";
import { Metadata } from "next";

export const metadata: Metadata ={
  title: 'Change Password - Inspectra',
  description:
    'Change up your password and get started with your new password',
  keywords:
    'Inspectra, white-box testing Cambodia, secure development platform, source code analysis, cybersecurity tools, secure coding practices',
  authors: { name: 'Inspectra Team' },
  publisher: 'Inspectra',
  openGraph: {
    title: 'Change Password - Inspectra',
    description:
      'Change up your password and get started with your new password',
    siteName: 'Inspectra',
    locale: 'en_KH',
    type: 'website',
  },
}

export default function page() {
  return <FormUpdatePassowrd />;
}
