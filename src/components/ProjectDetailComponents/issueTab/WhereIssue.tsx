"use client";
import React, { useEffect } from "react";

import Prism from "prismjs";
import { useRouter } from "next/navigation";
import { sliceString } from "@/lib/utils";
import {
  useGetSourcesIssueQuery,
  useGetIssueDetailQuery,
} from "@/redux/service/issue";
export default function WhereIssue({ projectKey }: any) {
  const { data: issueDetail } = useGetIssueDetailQuery({
    projectKey: projectKey,
  });

  const { data: issueSource } = useGetSourcesIssueQuery({
    projectKey: projectKey,
  });
  const router = useRouter();
  const resultIssueDetail = issueDetail?.data;

  const component = resultIssueDetail?.components[1]?.key;
  const issueSourceResult = issueSource?.data?.[component];

  useEffect(() => {
    // Run Prism's highlightAll function when ruleIssue changes or component mounts
    Prism.highlightAll();
  }, [issueSource, issueDetail]); // Only run when ruleIssue data changes

  return (
    <div className="w-full h-full my-5  border border-1 border-opacity-30 border-text_color_desc_light  rounded-[20px] text-text_color_light dark:text-text_color_desc_dark ">
      {/* header content */}
      <div className=" w-full border-b border-opacity-30 border-text_color_desc_light  p-5">
        <div className="w-full md:w-[75%] lg:w-[95%] xl:w-[70%]  flex justify-between">
          <p
            onClick={() => router.push(`/project`)}
            className=" hidden md:block hover:underline hover:cursor-pointer hover:text-blue-500"
          >
            {issueSourceResult?.component?.projectName}
          </p>
          <p className="hidden md:block">{"|"}</p>
          <p>{sliceString(issueSourceResult?.component?.longName)}</p>
        </div>
      </div>
      {/* code content */}
      <div className="w-full h-full  p-5 ">
        {issueSourceResult?.sources.map((item: any, index: number) => (
          <div key={index} className="flex flex-row w-full ">
            <p>{item.line}</p>
            <pre
              style={{
                background: "transparent",
                paddingLeft: "30px", // Add this line
                paddingTop: "0",

                margin: 0,
                width: "100%",
                height: "100%",
                overflow: "auto",
              }}
            >
              <code
                className="language-javascript   "
                dangerouslySetInnerHTML={{ __html: item.code }}
                style={{
                  width: "100%",
                  wordBreak: "break-word",
                  whiteSpace: "normal",
                }}
              ></code>
              {resultIssueDetail?.issues?.map((issue: any, index: number) => (
                <div key={index} className="w-full flex">
                  {issue?.textRange?.endLine === item.line ? (
                    <p className="my-3 p-3 rounded-md border-2 border-custom_red break-words whitespace-normal">
                      {issue?.message}
                    </p>
                  ) : null}
                </div>
              ))}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}
