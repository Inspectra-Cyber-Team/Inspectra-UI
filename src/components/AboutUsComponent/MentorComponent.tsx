"use client";

import React, { useEffect } from "react";
import { useTheme } from "next-themes";

import { mentorData } from "@/data/mentor";
import Link from "next/link";
import { AboutUs, SocialMedia } from "@/types/AboutUs";
import Aos from "aos";
import Image from "next/image";

export default function MentorComponent() {
  const { theme } = useTheme();
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <div>
      <section className="relative">
        <div
          className="absolute top-0 -z-20 hidden md:block w-full"

        >
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
              <p
                className="text-text_color_light dark:text-primary_color"
                data-aos="fade-up"
              >
                Meet Our Mentor
              </p>
            </div>
            <div className="w-[90%] mx-auto">
              <p
                className="text-text_color_desc_light md:text-text_color_dark dark:text-text_color_desc_dark dark:md:text-text_color_light text-text_title_16 my-5 text-lg"
                data-aos="fade-up"
              >
                Meet our diverse mentors of world-class Frontend and Backend
                Developer
              </p>
            </div>
          </div>

          {/* mentors card */}
          <div>
            <div
              className="flex flex-wrap justify-center gap-10 md:gap-32"
              data-aos="fade-up"
            >
              {mentorData.map((mentor: AboutUs, index) => (
                <div key={index}>
                  {/* Mentor Name */}
                  <div className="text-text_body_16 inline-flex px-5 font-semibold bg-primary_color dark:bg-text_color_light py-2 rounded-tl-[20px] rounded-br-[20px]">
                    <p className="text-text_color_light dark:text-primary_color">
                      {mentor.name}
                    </p>
                  </div>

                  {/* Mentor Image */}
                  <div className="w-60 h-60 mx-auto relative my-3">
                    <Image
                      src={mentor.image}
                      alt={`${mentor.name}'s profile`}
                      fill
                      unoptimized
                      className="object-contain"
                    />
                  </div>

                  {/* Social Media Links */}
                  <div className="flex justify-center space-x-4">
                    {mentor.socialMedia.map((social: SocialMedia, idx) => (
                      <Link
                        key={idx}
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-icon"
                        aria-label={`Link to ${mentor.name}'s ${social.platform}`}
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
