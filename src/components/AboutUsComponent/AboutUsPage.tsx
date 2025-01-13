"use client";
import React, { useEffect } from "react";
import MentorComponent from "./MentorComponent";
import TeamComponent from "./TeamComponent";
import FeedbackComponent from "../Feedback/FeedbackComponent";
import Aos from "aos";

export default function AboutUsPage() {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <main className="my-[60px]">
      {/* hero section */}
      <section className="mx-auto text-center w-[90%]">
        <div className="text-[20px] md:text-[30px] xl:text-[40px] inline-flex px-5 font-semibold bg-text_color_light py-2 rounded-tl-[20px] rounded-br-[20px]">
          <p className="text-primary_color " data-aos="fade-down">
            See the Unseen, Secure the Unknown.
          </p>
        </div>
        <div className="my-5 w-[90%] lg:w-[70%] mx-auto" data-aos="fade-up">
          <p className="text-[18px]">
            Inspectra empowers you to uncover hidden risks with precision.
            Through deep, intelligent scanning and proactive insights, we help
            you secure your code and protect against unseen
            vulnerabilities—keeping your systems resilient and your data safe
            based on Sonarqube Architecture
          </p>
        </div>
      </section>

      {/* mentor section */}
      <MentorComponent/>

      {/* mission and vision section */}
      <section className="w-[90%] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 md:py-5">
        <div className="flex flex-col items-center justify-center">
          <div className="text-[20px] md:text-[30px] xl:text-[40px] inline-flex px-5 font-semibold bg-primary_color dark:bg-text_color_light py-2 rounded-tl-[20px] rounded-br-[20px]">
            <p
              className="text-text_color_light dark:text-primary_color text-center"
              data-aos="fade-up"
            >
              Our Mission
            </p>
          </div>
          <div className="w-[90%] mx-auto">
            <p
              className="text-text_color_desc_light dark:text-text_color_desc_dark text-text_title_16 my-5"
              data-aos="fade-up"
            >
              Our Mission of{" "}
              <span className="text-secondary_color">Inspectra</span> is to
              empower developers and security teams to proactively identify and
              address code vulnerabilities. By scanning project code for
              weaknesses,{" "}
              <span className="text-secondary_color">Inspectra</span> helps
              ensure secure development practices, minimizes the risk of
              potential exploits, and strengthens the overall security posture
              of software applications.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center">
          <div className="text-[20px] md:text-[30px] xl:text-[40px] inline-flex px-5 font-semibold bg-primary_color dark:bg-text_color_light py-2 rounded-tl-[20px] rounded-br-[20px]">
            <p
              className="text-text_color_light dark:text-primary_color text-center"
              data-aos="fade-up"
            >
              Our Vision
            </p>
          </div>
          <div className="w-[90%] mx-auto">
            <p
              className="text-text_color_desc_light dark:text-text_color_desc_dark text-text_title_16 my-5"
              data-aos="fade-up"
            >
              The vision of{" "}
              <span className="text-secondary_color">Inspectra</span> is to
              become a leading, trusted platform for secure code analysis,
              enabling developers to build safer software from the ground up. By
              integrating seamlessly into development workflows,{" "}
              <span className="text-secondary_color">Inspectra</span> aims to
              foster a proactive security culture, reducing vulnerabilities and
              making secure coding practices accessible, efficient, and standard
              in software development worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* team section */}
      <TeamComponent />

      {/* feedback section */}
      <FeedbackComponent />
    </main>
  );
}
