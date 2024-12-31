"use client";
import React, { useEffect, useState } from "react";

import Prism from "prismjs";
import "prismjs/themes/prism.css";
import { useRouter } from "next/navigation";
import { IoIosArrowRoundUp } from "react-icons/io";
import { sliceString } from "@/lib/utils";
import {
  useGetSourcesIssueQuery,
  useGetIssueDetailQuery,
} from "@/redux/service/issue";
export default function WhereIssue({ issueKey }: any) {

   // store component key
   const [componentKey, setComponentKey] = useState("");

  const { data: issueDetail } = useGetIssueDetailQuery({
    projectKey: issueKey,
  });

  const { data: issueSource } = useGetSourcesIssueQuery({
    projectKey: issueKey,
  });

  const router = useRouter();
  const resultIssueDetail = issueDetail?.data;


  useEffect(() => {
    const matchingItem = resultIssueDetail?.components?.find((item: any) =>
      item?.key?.includes(":clone_repos")
    );

    if (matchingItem) {
      setComponentKey(matchingItem.key);
    }
  }, [resultIssueDetail]);


  const issueSourceResult = issueSource?.data?.[componentKey];

  useEffect(() => {
    // Run Prism's highlightAll function when ruleIssue changes or component mounts
    Prism.highlightAll();
  }) // Only run when ruleIssue data changes

  return (
    <div className="w-full h-full my-5  border border-1 border-opacity-30 border-text_color_desc_light  rounded-[20px] text-text_color_light dark:text-text_color_desc_dark ">
      {/* header content */}
      <div className=" w-full border-b border-opacity-30 border-text_color_desc_light  p-5">
        <div className="w-full  md:w-[60%] lg:w-[80%] xl:w-[40%] flex justify-between">
          <p
            onClick={() => router.push(`/project`)}
            className=" hidden md:block hover:underline hover:cursor-pointer hover:text-blue-500"
          >
            {issueSourceResult?.component?.projectName}
          </p>
          <p className="hidden md:block">{"|"}</p>
          <p className="truncate ">
            {issueSourceResult?.component?.longName
              ? sliceString(issueSourceResult?.component?.longName)
              : "No Data"}
          </p>
        </div>
      </div>
      {/* code content */}
      <div className="w-full h-full  p-5 ">
        {issueSourceResult?.sources.map((item: any, index: number) => (
          <div key={index} className="flex flex-row w-full">
            <p>{item.line}</p>
            <pre
              style={{
                background: "transparent",
                paddingLeft: "30px",
                paddingTop: "0",
                margin: 0,
                width: "100%",
                height: "100%",
                overflow: "auto",
              }}
            >
              <code
                className="language-javascript"
                dangerouslySetInnerHTML={{ __html: item.code }}
                style={{
                  width: "100%",
                }}
              ></code>

              {resultIssueDetail?.issues?.map(
                (issue: any, issueIndex: number) => (
                  <div key={issueIndex} className="w-full flex">
                    {issue?.textRange?.endLine === item.line ? (
                      <div>
                        <IoIosArrowRoundUp className="h-8 w-8 mx-auto text-custom_red" />
                        <p className="my-3 p-3 rounded-md border-2 border-custom_red break-words whitespace-normal">
                          {issue?.message}
                        </p>
                      </div>
                    ) : null}
                  </div>
                )
              )}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}
