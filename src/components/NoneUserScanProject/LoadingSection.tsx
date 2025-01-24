import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import animationLoading from "@/components/loadingAnimation.json";
import { Search, File, Check } from "lucide-react";

const steps = [
  { icon: Check, label: "Repository Connect" },
  { icon: Search, label: "Analyzing Code" },
  { icon: File, label: "Generating Report" },
];

const LoadingSection: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentStep(1); // Move to 'Analyzing Code' step
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center pt-10 mx-auto  ">
      <div className="w-full mb-12">
        <ol className="flex items-center justify-between relative ">
          {steps.map((step, index) => (
            <li
              key={index}
              className="relative flex flex-col items-center z-10 "
            >
              <div className="relative flex flex-col items-center">
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 0.8, opacity: 1 }}
                  transition={{ delay: index * 0.5, duration: 0.5 }}
                  className="mb-2"
                >
                  <AnimatePresence>
                    {currentStep === index && (
                      <motion.div
                        initial={{ scale: 1 }}
                        animate={{ scale: [1, 1.2, 1] }}
                        exit={{ scale: 1 }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="absolute inset-0 bg-primary_color opacity-30 rounded-full"
                      />
                    )}
                  </AnimatePresence>
                  <div
                    className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center ${
                      index <= currentStep
                        ? "bg-primary_color text-text_color_light"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    <step.icon className="w-8 h-8 md:w-10 md:h-10" />
                  </div>
                </motion.div>
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.5 + 0.25, duration: 0.5 }}
                  className="md:text-base text-sm font-medium text-text_color_light dark:text-text_color_desc_dark text-center"
                >
                  {step.label}
                </motion.span>
              </div>
              {index < steps.length - 1 && (
                <motion.div
                  className="absolute top-8 left-[calc(50%+0.5rem)] lg:left-[calc(50%+4rem)] w-[calc(50%+0.2rem)] transform h-1 bg-primary_color"
                  initial={{ width: "0%" }}
                  animate={{ width: currentStep > index ? "100%" : "0%" }}
                  transition={{ duration: 1.0 }}
                ></motion.div>
              )}
            </li>
          ))}
        </ol>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="text-center w-full"
      >
        <div className="relative">
          <Lottie
            animationData={animationLoading}
            loop={true}
            className="mx-auto w-80 h-80"
          />
        </div>
      </motion.div>
      <p className="text-text_color_desc_light dark:text-text_color_dark mb-2">© 2025 Inpestra Team. All rights reserved.</p>
    </div>
  );
};

export default LoadingSection;
