import FormForgetPassowrd from "@/components/FormForgetPassword/FormForgetPassword";
import { Metadata } from "next";

export const metadata: Metadata ={
  title: 'Forget password - Inspectra',
  description:
    'Forgot off your password? Complete the form here to get started',
  keywords:
    'Inspectra forget password, white-box testing Cambodia, secure development platform, source code analysis, cybersecurity tools, secure coding practices',
  authors: { name: 'Inspectra Team' },
  publisher: 'Inspectra',
  openGraph: {
    title: 'Forget password - Inspectra',
    description:
      'Forgot off your password? Complete the form here to get started',
    siteName: 'Inspectra',
    locale: 'en_KH',
    type: 'website',
  },
}

export default function page() {
  return <FormForgetPassowrd />;
}
