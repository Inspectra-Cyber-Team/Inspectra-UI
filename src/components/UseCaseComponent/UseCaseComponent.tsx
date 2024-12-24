"use client";

import React, { useEffect } from "react";
import { useTheme } from "next-themes";
import { useCaseData } from "@/data/useCase";
import { useCaseType } from "@/types/UseCase";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import Aos from "aos";

export default function UseCaseComponent() {
  const { theme } = useTheme();
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

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
        <Link href="/project">
          <Button
            className="bg-background_dark_mode dark:bg-card_color_dark hover:bg-gray-800 dark:hover:bg-gray-600 text-white rounded-tl-[20px] rounded-br-[20px] px-5 py-2 mt-6 w-[180px] h-[50px]"
            data-aos="fade-up"
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5 sm:h-6 sm:w-6" />
          </Button>
        </Link>
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
