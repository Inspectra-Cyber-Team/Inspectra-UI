"use client"
import React, { useEffect, useState } from "react";
import CreateProjectComponent from "./CreateProjectComponent/CreateProjectComponent";

export default function ProjectComponent() {
  const [userUUID, setUserUUID] = useState("");

  useEffect(() => {
    setUserUUID(localStorage.getItem("userUUID") || "");
  });
  return (
    <section className="w-full flex justify-between items-center mt-[60px] mb-5 md:my-[60px]">
      <p className="text-text_title_20 md:text-text_title_24 text-text_color_light dark:text-text_color_dark">
        Scan Project
      </p>
      <div className="flex w-auto gap-3 justify-between">
        {userUUID === "" ? (
          <p></p>
        ) : (
          <div className="p-2 rounded-2xl w-[50px] items-center text-text_color_light flex justify-center bg-primary_color">
            All
          </div>
        )}
        <CreateProjectComponent />
      </div>
    </section>
  );
}
