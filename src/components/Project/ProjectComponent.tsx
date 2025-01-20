"use client";
import React, { useEffect, useState } from "react";
import CreateProjectComponent from "./CreateProjectComponent/CreateProjectComponent";
import { useSession } from "next-auth/react";
export default function ProjectComponent() {
  const [isGitUser, setIsGitUser] = useState("");

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

  return (
    <section className="w-full flex justify-between items-center my-5">
      <h1 className="text-text_title_20 font-semibold md:text-text_title_24 text-text_color_light dark:text-text_color_dark">
        Scan Project
      </h1>
      {isGitUser === "github" ? <p></p> : <CreateProjectComponent />}
    </section>
  );
}
