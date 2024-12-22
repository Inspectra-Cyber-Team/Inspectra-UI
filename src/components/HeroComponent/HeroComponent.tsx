"use client";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import React from "react";
import { FaArrowRight } from "react-icons/fa6";
export default function HeroComponent() {
  const { theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const router = useRouter();

  // This effect ensures the component is only rendered on the client-side
  React.useEffect(() => {
    setMounted(true); // Set mounted to true after the component is mounted
  }, []);

  if (!mounted) {
    return (
      <section className="xl:flex my-[60px] justify-center items-center">
        {/* Content Section */}
        <section className="text-center xl:text-left space-y-5">
          <p className="text-[30px] md:text-[40px] xl:text-[60px] px-5 py-1 inline rounded-tl-[20px] text-text_color_light rounded-br-[20px] bg-primary_color font-semibold">
            Inspectra
          </p>
          <p className="lg:w-full xl:w-[80%] text-text_body_16 md:text-text_title_24 text-text_color_light font-medium dark:text-text_color_dark">
            Through deep, intelligent scanning and proactive insights empowers
            you to uncover hidden risks with precision Keeping your systems
            resilient and your data safe
          </p>
          {/* Centering Button */}
          <section className="flex justify-center lg:justify-center xl:justify-start">
            <button
              onClick={() => router.push("/project")}
              className="flex justify-between items-center hover:bg-primary_color dark:hover:bg-primary_color hover:text-text_color_light px-5 text-text_color_dark bg-background_dark_mode dark:bg-background_light_mode dark:text-text_color_light rounded-tl-[20px] rounded-br-[20px] w-[160px] h-[50px] text-text_body_16"
            >
              Try Now
              <FaArrowRight />
            </button>
          </section>
        </section>

        {/* Image Section */}
        <section className="hidden justify-end items-end xl:block w-[40%]">
          <img
            src="/images/hero section.png"
            alt="hero section image"
            className="object-cover w-[400px]"
          />
        </section>
      </section>
    ); // Or return a placeholder (like a spinner)
  }

  return (
    <section className="xl:flex my-[60px] justify-center items-center">
      {/* Content Section */}
      <section className="text-center  xl:text-left space-y-5">
        <p className="text-[30px] md:text-[40px] xl:text-[60px] px-2 inline rounded-tl-[20px] text-text_color_light rounded-br-[20px] bg-primary_color font-semibold">
          Inspectra
        </p>
        <p className="lg:w-full  xl:w-[80%] text-text_body_16 md:text-text_title_24 text-text_color_light font-medium dark:text-text_color_dark">
          Through deep, intelligent scanning and proactive insights empowers you
          to uncover hidden risks with precision
          <span className="block lg:my-5 xl:mt-10">
            Keeping your systems resilient and your data safe
          </span>
        </p>
        {/* Centering Button */}
        <section className="flex justify-center lg:justify-center xl:justify-start">
          <button
            onClick={() => router.push("/project")}
            className="flex justify-between items-center hover:bg-primary_color dark:hover:bg-primary_color hover:text-text_color_light px-5 text-text_color_dark bg-background_dark_mode dark:bg-background_light_mode dark:text-text_color_light rounded-tl-[20px] rounded-br-[20px] w-[160px] h-[50px] text-text_body_16"
          >
            Try Now
            <FaArrowRight />
          </button>
        </section>
      </section>

      {/* Image Section */}
      <section className="hidden justify-end items-end xl:block w-[40%]">
        {theme === "dark" ? (
          <img
            src="/images/hero-section-white.png"
            alt="hero section image"
            className="object-cover w-[400px]"
          />
        ) : (
          <img
            src="/images/hero section.png"
            alt="hero section image"
            className="object-cover w-[400px]"
          />
        )}
      </section>
    </section>
  );
}
