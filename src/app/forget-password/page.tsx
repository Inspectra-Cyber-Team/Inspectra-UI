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
        url: "https://api-inspectra.istad.co/images/3639a448-5eb8-43f4-bba9-a7f98c27792e.png",
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
