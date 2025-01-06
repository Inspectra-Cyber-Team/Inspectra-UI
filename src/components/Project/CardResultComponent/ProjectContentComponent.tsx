"use client";
import React, { useEffect, useState } from "react";
import QualityCardComponent from "./QualityGateCardComponent";
import ResultCardComponent from "./ResultCardComponent";
import ProjectCardComponent from "../CardProjectComponent/ProjectCardComponent";
import NoneUserScan from "@/components/NoneUserScanProject/NoneUserScan";
import NoneUserScanSkeletion from "@/components/Skeleton/NoneUserScanSkeletion";
// from next auth
import {useSession } from "next-auth/react";
export default function ProjectContent() {
  const [userUUID, setUserUUID] = useState("");
  const [isLoading, setIsLoading] = useState(true);


  // and this get the user data
  const {data:session} = useSession();
  const userData = async () => {
    const result = await session;
    console.log(result);
  };
  userData();
 

  useEffect(() => {
    setUserUUID(localStorage.getItem("userUUID") || "");
    setIsLoading(false);
  });
  return (
    <section>
      {userUUID === "" ? (
        // for non user login
        <div className=" lg:w-full">
          {isLoading ? <NoneUserScanSkeletion /> : <NoneUserScan />}
        </div>
      ) : (
        // for user login
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
