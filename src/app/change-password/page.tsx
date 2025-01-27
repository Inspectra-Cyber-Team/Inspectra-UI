import FormUpdatePassowrd from "@/components/FormChangePassword/FormChangePassword";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Change Password - Inspectra",
  description: "Change up your password and get started with your new password",
  openGraph: {
    title: "Change Password - Inspectra",
    description:
      "Change up your password and get started with your new password",
    siteName: "Inspectra",
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
  return <FormUpdatePassowrd />;
}
