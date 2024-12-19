import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function NoneUserScanSkeletion() {
  return (
    <section className="h-full  flex text-start flex-col justify-between">
      <Skeleton className=" w-[50%] h-[20px] border mx-auto bg-background_light_mode dark:bg-card_color_dark mb-5">
        {""}
      </Skeleton>
      {/* form input git */}
      <Skeleton className=" w-full   h-[40px] mx-auto border dark:text-text_color_dark bg-background_light_mode dark:bg-card_color_dark mb-5"></Skeleton>
      {/* branch */}
      <Skeleton className=" w-[80px]  h-[40px] border dark:text-text_color_dark bg-background_light_mode dark:bg-card_color_dark mb-5">
        {""}
      </Skeleton>
      <Skeleton className=" w-full  h-[40px] mx-auto border dark:text-text_color_dark bg-background_light_mode dark:bg-card_color_dark mb-5">
        {""}
      </Skeleton>
      <Skeleton className=" w-full  h-[50px] mx-auto border dark:text-text_color_dark bg-background_light_mode dark:bg-card_color_dark mb-5">
        {""}
      </Skeleton>
    </section>
  );
}
