"use client";

import React, { useEffect } from "react";
import { useTheme } from "next-themes";
import { teamData } from "@/data/team";
import Link from "next/link";
import { AboutUs, SocialMedia } from "@/types/AboutUs";
import Aos from "aos";

export default function TeamComponent() {
  const { theme } = useTheme();
   useEffect(() => {
                  Aos.init({ duration: 1000 });
                }, []);
  return (
    <div>
      <section className="relative">
        <div className="absolute top-0 -z-20 hidden md:block w-full">
          {theme === "dark" ? (
            <img
              src="/images/about us background_white.png"
              alt="bg-aboutus"
              className="object-cover w-[100%] h-[100%]"
            />
          ) : (
            <img
              src="/images/about us background.png"
              alt="bg-aboutus"
              className="object-cover w-[100%] h-[100%]"
            />
          )}
        </div>
        <div className="w-[90%] mx-auto text-center my-10 md:pt-24">
          <div>
            <div className="text-[20px] md:text-[30px] xl:text-[40px] inline-flex px-5 font-semibold bg-primary_color dark:bg-text_color_light py-2 rounded-tl-[20px] rounded-br-[20px]">
              <p className="text-text_color_light dark:text-primary_color" data-aos="fade-up">
                Meet Our Teams
              </p>
            </div>
            <div className="w-[90%] mx-auto">
              <p className="text-text_color_desc_light md:text-text_color_dark dark:text-text_color_desc_dark dark:md:text-text_color_light text-text_title_16 my-5 text-lg" data-aos="fade-up">
                Meet our diverse teams of world-class Frontend and Backend
                Developer
              </p>
            </div>
          </div>

          {/* teams card */}
          <div>
            <div className="flex flex-wrap lg:flex-nowrap justify-center md:justify-between gap-10" data-aos="fade-up">
              {teamData.map((team: AboutUs, index) => (
                <div
                  key={index}
                  className={`relative ${
                    (index + 1) % 2 === 0 ? "lg:pt-10" : "" // Add padding-top for even indices
                  }`}
                >
                  {/* Teams Name */}
                  <div className="text-text_body_16 inline-flex px-3 font-semibold bg-primary_color dark:bg-text_color_light py-2 rounded-tl-[20px] rounded-br-[20px]">
                    <p className="text-text_color_light dark:text-primary_color">
                      {team.name}
                    </p>
                  </div>

                  {/* Teams Image */}
                  <div className="my-3 overflow-hidden rounded-tl-[20px] rounded-br-[20px]">
                    <img
                      src={team.image}
                      alt={`${team.name}'s profile`}
                      className="w-60 h-60 mx-auto object-cover"
                    />
                  </div>

                  {/* Social Media Links */}
                  <div className="flex justify-center space-x-4">
                    {team.socialMedia.map((social: SocialMedia, idx) => (
                      <Link
                        key={idx}
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-icon"
                        aria-label={`Link to ${team.name}'s ${social.platform}`}
                      >
                        <social.icon className="w-6 h-6 text-text_color_desc_dark hover:text-text_color_light dark:hover:text-primary_color transition-colors duration-200" />
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
