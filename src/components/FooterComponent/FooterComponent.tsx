"use client";
import Link from "next/link";
import React from "react";
import { FaGithub } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { useTheme } from "next-themes";
import { MdEmail } from "react-icons/md";
import { FeaturesFooter, SupportFooter } from "@/data/footer";
import { usePathname } from "next/navigation";
export default function FooterComponent() {
  const { theme } = useTheme();
  const pathname = usePathname();
  const isRender =
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/forget-password" ||
    pathname === "/newpassword" ||
    pathname === "/verify" ||
    pathname === "/change-password";

  return (
    <footer>
      {!isRender && (
        <div className="w-[95%] my-5 md:w-[98%] z-20 rounded-[20px] bg-card_color_light dark:bg-card_color_dark  mx-auto">
          <section className="w-[95%] flex flex-col md:flex-row justify-between mx-auto ">
            {/* Section 1: Logo */}
            <section className="w-auto md:w-[30%]">
              <div className="p-2 md:p-5">
                <div className="flex items-center">
                  <div className="w-[40px] h-[40px] overflow-hidden rounded-full">
                    <img
                      src="/images/logo.jpg"
                      alt="Logo"
                      width={50}
                      height={50}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <span className="text-text_body_16 ml-2 text-text_color_light dark:text-text_color_dark">
                    Inspectra
                  </span>
                </div>
                {/* Content */}
                <div className="text-text_body_16 lg:text-text_title_24 text-text_color_light dark:text-text_color_dark mt-5">
                  <div className="flex md:block lg:flex">
                    <p className="mr-2">
                      See the{" "}
                      <span className="md:text-text_body_16 lg:text-text_title_24 text-secondary_color">
                        Unseen
                      </span>
                    </p>
                  </div>
                  <div className="md:block lg:flex">
                    <p className="mr-2">
                      Secure the{" "}
                      <span className="md:text-text_body_16 lg:text-text_title_24 text-secondary_color">
                        Unknown
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 2: Features and Others */}
            <section className="w-auto flex flex-col md:flex-row justify-end">
              <div className="flex flex-row-reverse md:flex-row justify-between">
                {/* Features */}
                <div className="p-2 md:p-5 w-[50%] md:w-auto">
                  <div className="text-text_body_16 text-text_color_desc_light dark:text-text_color_desc_dark">
                    Feature
                  </div>
                  <div className="mt-5">
                    {FeaturesFooter.map((featuresItem, index: number) => (
                      <Link
                        key={index}
                        className="my-3 block text-text_body_16 text-text_color_light dark:text-text_color_dark"
                        href={featuresItem.link}
                      >
                        {featuresItem.name}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Support */}
                <div className="p-2 md:p-5">
                  <div className="text-text_body_16 text-text_color_desc_light dark:text-text_color_desc_dark">
                    Support
                  </div>
                  <div className="mt-5">
                    {SupportFooter.map((featuresItem, index: number) => (
                      <Link
                        key={index}
                        className="my-3 block text-text_body_16 text-text_color_light dark:text-text_color_dark"
                        href={featuresItem.link}
                      >
                        {featuresItem.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sponsors */}
              <div className="p-2 w-auto md:p-5">
                <div className="text-text_body_16 text-text_color_desc_light dark:text-text_color_desc_dark">
                  Our Sponsors
                </div>
                <div className="w-[90%] flex flex-col xl:justify-between lg:space-y-0 space-y-4 xl:flex-row xl:grid xl:grid-cols-3 gap-4 mt-5">
                  {/* First Image */}
                  <div className="flex justify-center md:justify-start xl:justify-center">
                    <img
                      src="/images/CBRD_Logo.png"
                      alt="CBRD logo"
                      className="object-contain w-[200px] h-auto"
                    />
                  </div>

                  {/* Second Image */}
                  <div className="flex justify-center md:justify-start xl:justify-center">
                    <img
                      src="/images/MPTC-Logo.png"
                      alt="MPTC"
                      className="object-contain w-[200px] h-auto"
                    />
                  </div>

                  {/* Third Image */}
                  <div className="flex justify-center md:justify-start xl:justify-center">
                    <div className="w-[200px] h-auto flex items-center justify-center">
                      {theme === "dark" ? (
                        <img
                          src="/images/istad-logo-white.png"
                          alt="Logo"
                          className="object-contain w-full h-full"
                        />
                      ) : (
                        <img
                          src="/images/istad-logo.png"
                          alt="Logo"
                          className="object-contain w-full h-full"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </section>

          <section className="w-[95%] mx-auto flex flex-col md:flex-row border-t border-text_color_desc_light dark:border-text_color_desc_dark py-5 space-y-4 mt-5 md:space-y-0">
            {/* Left Section */}
            <div className="w-full md:w-1/2 text-center md:text-left text-text_body_16 text-text_color_desc_light dark:text-text_color_desc_dark">
              © 2024 Inspectra Inc. <br /> All rights reserved.
            </div>

            {/* Social Links Section */}
            <section className="w-full md:w-1/2 grid grid-cols-2 gap-3 md:flex md:flex-row justify-end items-center text-text_color_desc_light dark:text-text_color_desc_dark mx-auto">
              {/* GitHub Card */}
              <Link target="blank" href={"https://github.com/MuyleangIng"}>
                <button className="flex items-center space-x-2 px-4 py-2 border rounded-full hover:bg-text_color_desc_light hover:text-text_color_dark">
                  <FaGithub className="w-5 h-5" />
                  <span>GitHub</span>
                </button>
              </Link>

              {/* Facebook Card */}
              <Link
                target="blank"
                href={
                  "https://www.facebook.com/share/1XTYkShkpg/?mibextid=LQQJ4d"
                }
              >
                <button className="flex items-center space-x-2 px-4 py-2 border rounded-full hover:bg-text_color_desc_light hover:text-text_color_dark">
                  <FaFacebook className="w-5 h-5" />
                  <span>Facebook</span>
                </button>
              </Link>

              {/* Telegram Card */}
              <Link target="blank" href={"https://t.me/istadkh"}>
                <button className="flex items-center space-x-2 px-4 py-2 border rounded-full hover:bg-text_color_desc_light hover:text-text_color_dark">
                  <FaTelegram className="w-5 h-5" />
                  <span>Telegram</span>
                </button>
              </Link>

              {/* Email Card */}
              <Link target="blank" href={"mailto:info.istad@gmail.com"}>
                <button className="flex items-center space-x-2 px-4 py-2 border rounded-full hover:bg-text_color_desc_light hover:text-text_color_dark">
                  <MdEmail className="w-5 h-5" />
                  <span>Email</span>
                </button>
              </Link>
            </section>
          </section>
        </div>
      )}
    </footer>
  );
}
