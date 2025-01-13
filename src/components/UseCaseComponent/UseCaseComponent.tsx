"use client";

import React, { useEffect } from "react";
import { useTheme } from "next-themes";
import { useCaseData } from "@/data/useCase";
import { useCaseType } from "@/types/UseCase";
import { Check } from "lucide-react";
import Aos from "aos";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function UseCaseComponent() {
  const { theme } = useTheme();
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  const router = useRouter();

  return (
    <div>
      {/* Hero Section */}
      <section className="text-center">
        <h1
          className="inline-block rounded-sm text-text_color_light bg-primary_color px-6 py-2 text-3xl font-bold rounded-tl-[20px] rounded-br-[20px] mt-6"
          data-aos="fade-down"
        >
          Who&apos;s it for ?
        </h1>
        <p className="mx-auto mt-6 w-[90%] text-lg text-text_color_light dark:text-text_color_dark">
          Inspectra is widely used by various roles in software development to
          maintain and improve code quality. Developers rely on it to get
          insights into their code, identifying potential issues like bugs, code
          smells, and security vulnerabilities, which helps them write cleaner
          and more maintainable code. Development teams use Inspectra to enforce
          consistent coding standards across projects, reduce bugs, and track
          areas of technical debt.
        </p>
        <div className="mt-6 flex justify-center">
          <motion.button
            onClick={() => router.push("/project")}
            className="flex justify-between items-center hover:bg-background_dark_mode/80 dark:hover:bg-background_light_mode/90 px-5 text-text_color_dark bg-background_dark_mode dark:bg-background_light_mode dark:text-text_color_light rounded-tl-[20px] rounded-br-[20px] w-[170px] h-[50px] text-text_body_16"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <FaArrowRight />
            </motion.div>
          </motion.button>
        </div>
      </section>

      {/* Use Case Content */}
      <section className="w-[90%] mx-auto px-4 py-10">
        <h2 className="text-text_header_34 font-bold">Use Cases</h2>
        <div className="mt-5 grid gap-8 lg:grid-cols-2">
          <div className="space-y-4" data-aos="fade-right">
            {useCaseData.map((useCase: useCaseType, index) => (
              <div key={index} className="p-2">
                <div className="flex gap-2">
                  <Check className="mt-1 shrink-0 text-ascend_color dark:text-primary_color" />
                  <div>
                    <p className="text-text_title_20 text-text_color_light dark:text-text_color_dark pb-3">
                      {useCase.title}
                    </p>{" "}
                    <p className="text-text_body_16 text-text_color_desc_light dark:text-text_color_desc_dark">
                      {useCase.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-md" data-aos="fade-left">
              {theme === "dark" ? (
                <img src="/images/useCase-white.png" alt="bg-useCase" />
              ) : (
                <img src="/images/useCase.png" alt="bg-useCase" />
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
