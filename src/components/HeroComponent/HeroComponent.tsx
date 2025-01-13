'use client';

import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import { motion } from "framer-motion";
import { SkeletonHero } from "@/components/HeroComponent/skeleton-hero";
import 'aos/dist/aos.css';

export default function HeroComponent() {
  const { theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const router = useRouter();
  
  // This effect ensures the component is only rendered on the client-side
  React.useEffect(() => {
    const timer = setTimeout(() => setMounted(true)); // Simulate loading delay
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  if (!mounted) {
    return <SkeletonHero />;
  }

  return (
    <motion.section 
      className="xl:flex my-[60px] justify-center items-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Content Section */}
      <motion.section className="text-center xl:text-left space-y-5" variants={itemVariants}>
        <motion.h1 
          className="text-[30px] md:text-[40px] xl:text-[60px] px-5 inline rounded-tl-[20px] text-text_color_light rounded-br-[20px] bg-primary_color font-semibold"
          variants={itemVariants}
        >
          Inspectra
        </motion.h1>
        <motion.p 
          className="lg:w-full xl:w-[80%] text-text_body_16 md:text-text_title_24 text-text_color_light font-medium dark:text-text_color_dark"
          variants={itemVariants}
        >
          Through deep, intelligent scanning and proactive insights empowers
          you to uncover hidden risks with precision
          <motion.span className="block lg:my-5 xl:mt-10" variants={itemVariants}>
            Keeping your systems resilient and your data safe
          </motion.span>
        </motion.p>

        {/* Centering Button */}
        <motion.section 
          className="flex justify-center lg:justify-center xl:justify-start"
          variants={itemVariants}
        >
          <motion.button
            onClick={() => router.push("/project")}
            className="flex justify-between items-center hover:bg-background_dark_mode/80 dark:hover:bg-background_light_mode/90 px-5 text-text_color_dark bg-background_dark_mode dark:bg-background_light_mode dark:text-text_color_light rounded-tl-[20px] rounded-br-[20px] w-[140px] h-[50px] text-text_body_16"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Try Now
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <FaArrowRight />
            </motion.div>
          </motion.button>
        </motion.section>
      </motion.section>

      {/* Image Section */}
      <motion.section 
        className="hidden justify-end items-end xl:block w-[40%]"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        {theme === "dark" ? (
          <motion.img
            src="/images/hero-section-white.png"
            alt="hero section image"
            className="object-cover w-[400px]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          />
        ) : (
          <motion.img
            src="/images/hero section.png"
            alt="hero section image"
            className="object-cover w-[400px]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </motion.section>
    </motion.section>
  );
}

