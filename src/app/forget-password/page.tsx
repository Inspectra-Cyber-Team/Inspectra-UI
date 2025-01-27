import FormForgetPassowrd from "@/components/FormForgetPassword/FormForgetPassword";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forget password - Inspectra",
  description:
    "Forgot off your password? Complete the form here to get started",
  openGraph: {
    title: "Forget password - Inspectra",
    description:
      "Forgot off your password? Complete the form here to get started",
    url: "https://inspectra.istad.co/",
    siteName: "Inspectra",
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
  return <FormForgetPassowrd />;
}
