import React from "react";
import { Skeleton } from "../ui/skeleton";

export default function HeroSectionSkeletion() {
  return (
    <section className="xl:flex my-[60px] justify-center items-center">
      <Skeleton className=" text-text_title_24 md:text-text_header_34 py-10 text-primary_color">
        Our Working Process
      </Skeleton>
    </section>
  );
}
