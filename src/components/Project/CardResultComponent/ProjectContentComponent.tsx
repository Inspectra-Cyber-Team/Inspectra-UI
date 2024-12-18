"use client";
import React, { useEffect, useState } from "react";
import QualityCardComponent from "./QualityGateCardComponent";
import ResultCardComponent from "./ResultCardComponent";
import ProjectCardComponent from "../CardProjectComponent/ProjectCardComponent";
import NoneUserScan from "@/components/NoneUserScanProject/NoneUserScan";

export default function ProjectContent() {
  const [userUUID, setUserUUID] = useState("");
  useEffect(() => {
    setUserUUID(localStorage.getItem("userUUID") || "");
  });
  return (
    <section>
      {userUUID === "" ? (
        <div className=" lg:w-[70%] bg-card_color_light dark:bg-card_color_dark p-10 rounded-[20px] mb-[60px] mx-auto">
          <NoneUserScan />
        </div>
      ) : (
        <div className="w-full h-full flex justify-between mb-[60px] md:my-[60px]">
          <div className="w-[30%] hidden lg:block">
            <QualityCardComponent />
            <ResultCardComponent />
          </div>
          <div className="w-full h-full text-center lg:w-[65%] p-10 rounded-[20px] bg-text_color_dark dark:bg-card_color_dark">
            <ProjectCardComponent />
          </div>
        </div>
      )}
    </section>
  );
}
