
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import NavbarComponent from "@/components/NavbarComponent/NavbarComponent";
import FooterComponent from "@/components/FooterComponent/FooterComponent";
import { Toaster } from "@/components/ui/toaster";

import { Suspense } from "react";
import StoreProvider from "./StoreProvider";
import ImageBackground from "@/components/BackgroundImageHomepage/ImageBackground";
import SessionWrapper from "@/app/SessionProvider";
import { Metadata } from "next";
import BannerComponent from "@/components/BannerComponent/BannerComponent";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600"],
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "Inspectra",
  description:
    "Provide a white-box testing platform for reviewing the source code in order to identify the security weakness.",
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
          <StoreProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <BannerComponent />
              <NavbarComponent />
              <Suspense fallback={""}>
                {children}
                <Toaster />
              </Suspense>
              <ImageBackground />
              <FooterComponent />
            </ThemeProvider>
          </StoreProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
