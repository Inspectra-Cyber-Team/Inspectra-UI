import React from "react";
import { Skeleton } from "../ui/skeleton";

export default function RepoSkeleton() {
  return (
    <div className="flex flex-wrap justify-between ">
      {Array.from({ length: 20 }).map((_, index) => (
        <div key={index} className="flex  my-10">
          <Skeleton className="h-5 w-5 mr-4  bg-text_color_light dark:bg-text_color_dark" />
          <Skeleton className="w-[250px] h-5 bg-text_color_light dark:bg-text_color_dark" />
        </div>
      ))}
    </div>
  );
}
