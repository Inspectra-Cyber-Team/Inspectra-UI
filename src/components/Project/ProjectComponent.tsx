import React from "react";
import CreateProjectComponent from "./CreateProjectComponent/CreateProjectComponent";

export default function ProjectComponent() {
  return (
    <section className="w-full flex justify-between items-center my-5">
      <h1 className="text-text_title_20 md:text-text_title_24 text-text_color_light dark:text-text_color_dark">
        Scan Project
      </h1>
      <CreateProjectComponent />
    </section>
  );
}
