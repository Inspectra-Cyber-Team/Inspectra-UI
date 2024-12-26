import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function NoneUserScanSkeletion() {
  return (
    <section className="flex mx-auto justify-center lg:justify-between xl:justify-around">
      {/* Image skeleton */}
      <div className=" h-[350px] hidden lg:flex justify-center items-center">
        <Skeleton className="h-full w-[500px] bg-card_color_light dark:bg-card_color_dark" />
      </div>

      {/* Scanning project skeleton */}
      <div className="h-full lg:w-[50%] p-10 rounded-[20px] bg-card_color_light dark:bg-card_color_dark flex text-start flex-col justify-between space-y-6">
        {/* Title skeleton */}
        <Skeleton className="h-8 w-3/4 mx-auto" />

        {/* Git URL input skeleton */}
        <div className="relative">
          <Skeleton className="h-12 w-full" />
        </div>

        {/* Branch selection skeleton */}
        <div>
          <Skeleton className="h-4 w-16 mb-2" />
          <Skeleton className="h-12 w-full" />
        </div>

        {/* Submit button skeleton */}
        <Skeleton className="h-12 w-full mt-4" />
      </div>
    </section>
  );
}
