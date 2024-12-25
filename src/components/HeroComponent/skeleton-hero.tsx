import { motion } from "framer-motion";

export function SkeletonHero() {
  return (
    <section className="xl:flex my-[60px] justify-between items-centerr">
      {/* Content Section */}
      <section className="text-center xl:text-left space-y-5">
        <motion.div 
          className="w-[350px] h-[60px] bg-gray-200 dark:bg-gray-700 mx-auto xl:mx-0 rounded-md"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        />
        <motion.div 
          className="xl:w-[600px] h-[300px] bg-gray-200 dark:bg-gray-700 rounded-md"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut", delay: 0.2 }}
        />
        <motion.div 
          className="w-[200px] h-[50px] bg-gray-200 dark:bg-gray-700 mx-auto xl:mx-0 rounded-md"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut", delay: 0.4 }}
        />
      </section>

      {/* Image Section */}
      <section className="hidden justify-end items-end xl:block w-[50%]">
        <motion.div 
          className="w-full h-full bg-gray-200 dark:bg-gray-700 rounded-md"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut", delay: 0.6 }}
        />
      </section>
    </section>
  );
}

