import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectScanSkeleton() {
  return (
    <div className="w-full  mx-auto p-4 border border-background_light_mode rounded-lg space-y-4">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-40 bg-background_light_mode" />{" "}
        {/* Project Title */}
        <Skeleton className="h-6 w-16 rounded-full bg-background_light_mode" />{" "}
        {/* Status Badge */}
      </div>

      {/* Analysis Details */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-60 bg-background_light_mode" />{" "}
        {/* Last Analysis */}
        <Skeleton className="h-4 w-full bg-background_light_mode" />{" "}
        {/* Code Stats */}
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
        {Array(6)
          .fill(null)
          .map((_, index) => (
            <div key={index} className="space-y-2 flex flex-col mx-auto ">
              <Skeleton className="w-[30px] h-[30px] rounded-[5px] ml-5 border border-background_light_mode" />
              <Skeleton className="h-4 w-20 bg-background_light_mode" />
            </div>
          ))}
      </div>
    </div>
  );
}
