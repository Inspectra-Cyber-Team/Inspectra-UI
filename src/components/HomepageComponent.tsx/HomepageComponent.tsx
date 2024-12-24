"use client";
import React, { useEffect } from "react";
import WorkingProcessCard from "../WorkingProcessCard/WorkingProcessCard";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import Aos from "aos";
import LogoSliderComponent from "../LogoSliderComponent/LogoSliderComponent";

export default function HomepageComponent() {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  return (
    <section>
       {/* Our Working Process */}
      <section className="w-full relative h-[1550px]  md:h-[1200px]  lg:h-[1150px] xl:h-[900px]">
        <section className="w-full rounded-tl-[50px] text-center rounded-br-[50px]   md:h-[900px] lg:h-[900px] xl:h-[650px] bg-text_color_light ">
          <p
            className=" text-text_title_24 md:text-text_header_34 py-10 text-primary_color"
          >
            Our Working Process
          </p>
          <section className="w-full h-full flex flex-col-reverse xl:flex-row">
            {/* First Content */}
            <section
              className="w-full md:w-[60%] md:absolute md:bottom-[130px] md:right-[200px] lg:absolute lg:bottom-20 lg:right-[232px] xl:relative xl:bottom-auto xl:right-auto"
              data-aos="fade-right"
            >
              <WorkingProcessCard />
            </section>

            {/* Second Content */}
            <section
              className=" w-full md:w-[40%] md:absolute md:-bottom-[120px] md:right-[320px]  lg:absolute lg:top-[130px] lg:right-[340px] xl:relative xl:top-[100px] xl:right-auto h-full flex flex-col md:justify-start md:items-start"
              data-aos="fade-left"
            >
              <p className=" md:w-[500px] text-center xl:text-start text-text_body_16 text-secondary_color ">
                Steps into getting your work started
              </p>
              <p className=" w-full text-center text-text_title_20 md:w-[500px] xl:w-[300px] md:text-left text-text_color_dark md:text-text_header_34">
                Inspect, Improve, Innovative
              </p>
              <section className="my-10 flex justify-center items-center xl:justify-start">
                <Link
                  href={"/project"}
                  className="flex justify-between items-center bg-primary_color px-5 text-text_color_light rounded-tl-[20px] rounded-br-[20px] w-[160px] hover:bg-ascend_color hover:text-white h-[50px] text-text_body_16"
                >
                  Try Now
                  <FaArrowRight />
                </Link>
              </section>
            </section>
          </section>
        </section>
      </section>

        {/* Second Section */}
      <section className="text-center lg:my-[60px] space-y-5">
        <section className="flex w-full justify-center">
          <section className="space-y-2 text-right text-text_title_24 md:text-text_header_34 pr-4 font-medium text-text_color_light dark:text-text_color_dark" data-aos="fade-down">
            <p>See the</p>
            <p>Secure the</p>
          </section>
          <section className="space-y-2 text-left text-text_title_24 md:text-text_header_34">
            <p className="rounded-tl-[20px] rounded-br-[20px] bg-primary_color font-medium text-text_color_light px-2 inline-block" data-aos="fade-up">
              Unseen
            </p>
            <p className="rounded-tl-[20px] rounded-br-[20px] bg-primary_color font-medium text-text_color_light px-2" data-aos="fade-up">
              Unknown
            </p>
          </section>
        </section>
        <p className="text-text_body_16 md:text-text_title_24 text-text_color_desc_light dark:text-text_color_desc_dark mx-auto lg:w-[80%] xl:w-[65%]">
          Through deep, intelligent scanning and proactive insights, we help you
          secure your code and protect against unseen vulnerabilities with these
          supported popular frameworks
        </p>
        <LogoSliderComponent />
      </section>
    </section>
  );
}
