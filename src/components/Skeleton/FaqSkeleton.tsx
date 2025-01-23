import React from "react";
import { Skeleton } from "../ui/skeleton";

export default function FAQSkeleton() {
  return (
    <div data-aos="fade-left">
      <Skeleton className="h-[30px] w-full md:w-[70%] bg-gray-300 rounded-md mb-4" />
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
        <Skeleton className="h-[20px] w-[90%] bg-gray-300 rounded-md mb-2" />
        <Skeleton className="h-[16px] w-[80%] bg-gray-300 rounded-md" />
      </div>
    </div>
  );
}
