"use client";
import { useGetAllIssueQuery } from "@/redux/service/issue";
import React from "react";

import { FaPlus } from "react-icons/fa6";
export default function IssueCardComponet({ ...props }) {
  const { data: issueData } = useGetAllIssueQuery({
    projectName: props.props,
    page: "0",
    size: "25",
  });
  const issueResult = issueData?.data;
  console.log(issueResult)
  return (
    <section className="w-full bg-background_light_mode dark:bg-background_dark_mode p-5 rounded-[20px]">
      {/* first section*/}
      <div className="w-full flex justify-between">
        <p className="text-text_body_16 text-ascend_color underline">test</p>
        <p className=" py-1 px-2 rounded-md text-[14px] text-text_color_light bg-primary_color">
          INTENTIONAL
        </p>
      </div>
      {/* second section  */}
      <div className="flex w-full items-center text-center my-5">
        {/*  */}
        <div className="w-full flex space-x-2">
          <div className="flex w-[180px] text-text_body_16 justify-between px-3 rounded-md bg-[#60935d21] py-2 ">
            <img
              src="/images/iconWarning.svg"
              className="h-6 w-6"
              alt="Warning Icon"
            ></img>
            <p>Maintainability </p>
          </div>
          <div className="flex w-[180px] text-text_body_16 justify-between px-3 rounded-md bg-[#60935d21] py-2 ">
            <img
              src="/images/iconGood.svg"
              className="h-6 w-6"
              alt="Warning Icon"
            ></img>
            <p>Maintainability </p>
          </div>
        </div>
        {/* tag */}
        <div className="flex space-x-2 text-center items-center">
          <p className="bg-[#60935d21] px-2 rounded-md ">unused</p>
          <div className="">
            <FaPlus className="bg-[#60935d21]  text-text_body_16" />
          </div>
        </div>
      </div>
      {/* line */}
      <hr className="text-text_color_desc_light opacity-10" />
      <div className="flex items-center justify-end w-full my-5 text-[14px] ">
        <p className="text-text_color_light dark:text-text_color_desc_dark">
          L43 • 5min effort • 3 months ago • Code Smell -
        </p>
        <div className="flex items-center ml-2 text-text_color_light dark:text-text_color_desc_dark">
          <img src="/images/dangericon.svg" alt="" className="w-4 h-4 mr-1" />
          <p> Major</p>
        </div>
      </div>
    </section>
  );
}
