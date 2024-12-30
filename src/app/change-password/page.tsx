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
        url: "https://api-inspectra.istad.co/images/3639a448-5eb8-43f4-bba9-a7f98c27792e.png",
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
