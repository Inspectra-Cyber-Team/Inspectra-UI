import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import NavbarComponent from "@/components/NavbarComponent/NavbarComponent";
import FooterComponent from "@/components/FooterComponent/FooterComponent";
import { Toaster } from "@/components/ui/toaster";
import ScrollToTopButton from "@/components/ScrollToTopComponent/ScrollToTopComponent";
import { Suspense } from "react";
import StoreProvider from "./StoreProvider";
import ImageBackground from "@/components/BackgroundImageHomepage/ImageBackground";
import SessionWrapper from "@/app/SessionProvider";
import { Metadata } from "next";
import BannerComponent from "@/components/BannerComponent/BannerComponent";
import dynamic from "next/dynamic";
import { GoogleAnalytics } from "@next/third-parties/google";
import ScrollProgressBarComponent from "@/components/NavbarComponent/ScrollProgressBarComponent";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600"],
  subsets: ["latin"],
});

const NetworkProvider = dynamic(
  () => import("@/components/NetworkStatusProvider"),
  { ssr: false }
);
export const metadata: Metadata = {
  title: "Inspectra: Secure Your Development with White-box Testing",
  description:
    "Inspectra, Cambodia's cutting-edge white-box testing platform, ensures secure development by analyzing your source code for vulnerabilities and security flaws. Leverage our powerful tools to prevent bugs and enhance your software’s security.",
  keywords:
    "Inspectra, white-box testing, source code scan, vulnerabilities scan, secure development, cybersecurity, code scanner, SAST platform, software security, cybersecurity tools, bug scan, inspect source code, secure coding practices, Cambodia cybersecurity, Inspectra code scan, bug vulnerability scanner, white-box website tools, cybersecurity for developers, inspect code Cambodia, secure software development, code scanning tools, prevent security flaws, code vulnerability checker",
  authors: { name: "Inspectra Team" },
  publisher: "Inspectra",
  openGraph: {
    title: "Inspectra - Secure Your Development with White-box Testing",
    description:
      "Inspectra, Cambodia's cutting-edge white-box testing platform, ensures secure development through advanced source code analysis to uncover security vulnerabilities.",
    siteName: "Inspectra",
    locale: "en_KH",
    type: "website",
    url: "https://inspectra.istad.co/",
    images: [
      {
        url: "https://api-inspectra.istad.co/images/3639a448-5eb8-43f4-bba9-a7f98c27792e.png",
        width: 1200,
        height: 630,
        alt: "Inspectra: Secure Development Platform",
      },
    ],
  },
  verification: {
    google: "8aJbxb2nySDM1wRTq0jzp9rk03yVGo0f3OLj-yA0HjM",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.className}  relative   overflow-y-auto scrollbar  overflow-x-hidden bg-background_light_mode  dark:bg-background_dark_mode flex flex-col justify-between  `}
      >
        <SessionWrapper>
          <NetworkProvider>
            <StoreProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="light"
                enableSystem={false}
                disableTransitionOnChange
              >
                <BannerComponent />
                <NavbarComponent />
                <Suspense fallback={""}>
                  {children}
                  <Toaster />
                </Suspense>

                <ImageBackground />
                <ScrollToTopButton />
                <FooterComponent />
              </ThemeProvider>
            </StoreProvider>
          </NetworkProvider>
        </SessionWrapper>
      </body>
      <GoogleAnalytics gaId={`${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`} />
    </html>
  );
}
