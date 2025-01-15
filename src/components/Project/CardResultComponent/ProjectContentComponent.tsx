"use client";
import NoneUserScan from "@/components/NoneUserScanProject/NoneUserScan";
import NoneUserScanSkeletion from "@/components/Skeleton/NoneUserScanSkeletion";
import { useEffect, useState } from "react";
import ProjectCardComponent from "../CardProjectComponent/ProjectCardComponent";
import QualityCardComponent from "./QualityGateCardComponent";
import ResultCardComponent from "./ResultCardComponent";
// from next auth
import { useSession } from "next-auth/react";
import { ListRepoComponent } from "./ListRepoComponent";
export default function ProjectContent() {
  const [userUUID, setUserUUID] = useState("");
  const [isGitUser, setIsGitUser] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  // check is session user is github
  const { data: session } = useSession();
  const userData = () => {
    if (session) {
      const data = (session as any).provider;
      setIsGitUser(data);
    } else {
    }
  };
  useEffect(() => {
    userData();
  }, [session]);

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
      ) : // for git user
      isGitUser === "github" ? (
        <ListRepoComponent />
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
