"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatTimestamp, timeSince } from "@/lib/utils";
import {
  useGetAllIssueQuery,
  useGetIssueDetailQuery,
} from "@/redux/service/issue";
import { IusseSideBarType } from "@/types/IssueType";
import { useEffect, useState } from "react";
import { FaFile } from "react-icons/fa";
import { GoFileDirectoryFill } from "react-icons/go";
import { IoIosMore } from "react-icons/io";

import Prism from "prismjs";

import { useRouter } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import HowToFix from "./HowToFix";
import WhereIssue from "./WhereIssue";
import WhyIssue from "./WhyIssue";

export default function IusseComponent({ ...props }) {
  const router = useRouter();
  //   state for store filter
  const [fileStore, setFileStore] = useState<string>("");
  const [directoriesStore, setDirectoriesStore] = useState<string>("");
  const [languagesStore, setLanguagesStore] = useState<string>("");
  const [tagStore, setTagStore] = useState<string>("");
  const [impactSeveritiesStore, setImpactSeveritiesStore] =
    useState<string>("");
  const [rulesStore, setRuleStore] = useState<string>("");
  const [cleanCode, setCleanCode] = useState<string>("");

  // check condition render and store project key
  const [activeContent, setActiveContent] = useState(false);
  // store project key
  const [projectKey, setProjectKey] = useState("");
 
  // store rule key
  const [ruleKey, setRuleKey] = useState("");
  const [size, setSize] = useState();

  //   fetch all isssue from api
  const { data: issueData } = useGetAllIssueQuery({
    projectName: props.props,
    page: 1,
    size: size ? size : 10,
    languages: languagesStore,
    tags: tagStore,
    files: fileStore,
    directories: directoriesStore,
    impactSeverities: impactSeveritiesStore,
    rules: rulesStore,
    cleanCodeAttributeCategories: cleanCode,
  });

  //  fetch detail of issue
  const { data: issueDetail } = useGetIssueDetailQuery({
    projectKey: projectKey,
  });

  // fetch rule detail for issue tab
  const issueCardResult = issueData?.data?.issues;
  const issueSideBarResult = issueData?.data.facets;
  const resultIssueDetail = issueDetail?.data;



  useEffect(() => setSize(issueData?.data?.total), [issueData]);
  useEffect(() => {
    Prism.highlightAll();
  });

  return (
    <main className="w-full h-full  flex justify-between">
      {/* when on click issue card */}
      {activeContent === true ? (
        <div className="w-full h-full  flex justify-between">
          {/* filter side bar */}
          <div className="w-[35%] h-[1000px] overflow-y-auto scrollbar-hide hidden lg:block  border border-opacity-30 dark:border-none border-text_color_desc_light dark:bg-background_dark_mode p-5 rounded-[20px]  ">
            <div className="w-full cursor-pointer text-text_body_16 text-text_color_light dark:text-text_color_dark text-end">
              <p> {issueData?.data?.total} issues</p>
              <hr className="text-text_color_desc_light mt-2" />
              {issueCardResult.map((item: any, index: number) => (
                <div
                  onClick={() => {
                    setProjectKey(item.key);
                    setRuleKey(item.rule);
                  }}
                  key={index}
                  className=" flex flex-col my-5 py-2   justify-center hover:border-r-2 hover:border-text_color_light hover:bg-background_light_mode  dark:hover:border-text_color_dark dark:hover:bg-card_color_dark  text-[14px]"
                >
                  <p className=" text-left ">{item.message}</p>
                </div>
              ))}
            </div>
          </div>
          {/* issue detail section */}
          <div className=" w-full h-full px-5  scrollbar-hide overflow-y-auto lg:w-[60%] border border-opacity-30 dark:border-none border-text_color_desc_light dark:bg-background_dark_mode rounded-[20px]  ">
            {resultIssueDetail?.issues?.map((item: any, index: number) => (
              <p
                key={index}
                className="text-text_body_16 w-full  mt-5  text-text_color_light dark:text-text_color_dark"
              >
                {item?.message}
                <span
                  onClick={() => router.push(`/rule/${item?.rule}`)}
                  className=" inline-block mx-2 text-[14px] underline cursor-pointer text-link_color dark:text-blue-600"
                >
                  {item?.rule}
                </span>
              </p>
            ))}
            <hr className="text-text_color_desc_light opacity-15  my-3" />

            <div className="my-5">
              {resultIssueDetail?.issues?.map((item: any, index: number) => (
                <p
                  key={index}
                  className="text-[14px]  text-text_color_desc_light"
                >
                  {" "}
                  <p className="md:whitespace-normal md:max-w-none truncate max-w-full  text-text_color_light  dark:text-text_color_desc_dark">
                    Line affected: L{item?.line} • Effort • {item?.effort} •{" "}
                    Introduced • {timeSince(item?.updateDate)} • {item?.type} •{" "}
                    {item?.severity}
                  </p>
                </p>
              ))}
            </div>

            {/* tab inside issue  */}
            <Tabs defaultValue="Where is the issue?">
              {/* for trigger different tab */}
              <TabsList className="flex  justify-between !bg-transparent overflow-x-auto scrollbar-hide overflow-y-hidden">
                <TabsTrigger
                  value="Where is the issue?"
                  className=" data-[state=active]:shadow-none dark:data-[state=active]:bg-transparent  data-[state=active]:rounded-none data-[state=active]:border-b-2  data-[state=active]:border-ascend_color data-[state=active]:text-acborder-ascend_color"
                >
                  Where is the issue?
                </TabsTrigger>
                <p className="mx-2">|</p>
                <TabsTrigger
                  value="Why is this an issue?"
                  className=" data-[state=active]:shadow-none dark:data-[state=active]:bg-transparent  data-[state=active]:rounded-none data-[state=active]:border-b-2  data-[state=active]:border-ascend_color data-[state=active]:text-acborder-ascend_color"
                >
                  Why is this an issue?
                </TabsTrigger>
                <p className="mx-2">|</p>
                <TabsTrigger
                  value="How Can I fix it?"
                  className=" data-[state=active]:shadow-none dark:data-[state=active]:bg-transparent  data-[state=active]:rounded-none data-[state=active]:border-b-2  data-[state=active]:border-ascend_color data-[state=active]:text-acborder-ascend_color"
                >
                  How Can I fix it?
                </TabsTrigger>
                <p className="mx-2">|</p>
                <TabsTrigger
                  value="Activity"
                  className=" data-[state=active]:shadow-none  dark:data-[state=active]:bg-transparent data-[state=active]:rounded-none data-[state=active]:border-b-2  data-[state=active]:border-ascend_color data-[state=active]:text-acborder-ascend_color"
                >
                  Activity
                </TabsTrigger>
                <p className="mx-2">|</p>
                <TabsTrigger
                  value="More info"
                  className=" data-[state=active]:shadow-none dark:data-[state=active]:bg-transparent  data-[state=active]:rounded-none data-[state=active]:border-b-2  data-[state=active]:border-ascend_color data-[state=active]:text-acborder-ascend_color"
                >
                  More info
                </TabsTrigger>
              </TabsList>
              {/* tab for each content */}
              <TabsContent value="Where is the issue?">
                <WhereIssue issueKey={projectKey} />
              </TabsContent>
              <TabsContent value="Why is this an issue?">
                <WhyIssue ruleKey={ruleKey} />
              </TabsContent>
              <TabsContent value="How Can I fix it?">
                <HowToFix ruleKey={ruleKey} />
              </TabsContent>
              <TabsContent value="Activity">
                <div className="w-full  text-text_color_light dark:text-text_color_dark m-7">
                  <p className=" text-text_title_20 ">Activity</p>
                  <p className="text-text_body_16 mt-5">
                    {resultIssueDetail?.issues?.map(
                      (issue: any, index: number) => (
                        <p key={index}>
                          {formatTimestamp(issue?.creationDate)}
                        </p>
                      )
                    )}
                  </p>
                  <p className="text-text_body_16 text-text_color_desc_light dark:text-text_color_desc_dark">
                    Created Issue
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="More info">
                <div className="w-full  text-text_color_light dark:text-text_color_dark my-5">
                  <div>
                    <HowToFix ruleKey={ruleKey} />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      ) : (
        // default card issue and filter
        <section className="w-full h-full  flex justify-between">
          {/* filter side bar */}
          <div className="w-[35%] hidden lg:block h-full border-2 border-background_light_mode dark:border-none dark:bg-card_color_dark p-5 rounded-[20px]  ">
            <p className="text-text_title_24 text-text_color_light dark:text-text_color_dark ">
              Filter
            </p>
            <hr className="text-text_color_desc_light mt-2" />
            {/* side bar content */}
            <div className="h-full ">
              {issueSideBarResult?.map(
                (issueItem: IusseSideBarType, index: number) => (
                  <div key={index}>
                    <Accordion type="single" collapsible>
                      <AccordionItem value={`item-${index}`}>
                        <AccordionTrigger className="text-text_color_light dark:text-text_color_dark text-left md:text-text_body_16">
                          {issueItem?.property}
                        </AccordionTrigger>
                        {issueItem?.values.map((item: any, index: number) => (
                          <AccordionContent
                            key={index}
                            className="w-full flex justify-between  text-[14px]"
                          >
                            {/* check if count = 0 make color lighter then normal text */}
                            {item.count === 0 ? (
                              <p className=" text-[14px] truncate  text-text_color_desc_light  dark:text-text_color_desc_dark  ">
                                {item.val}
                              </p>
                            ) : // check to make icon if it files
                            issueItem.property === "files" ? (
                              <div
                                onClick={() => {
                                  setFileStore(item.val);
                                }}
                                className="flex  truncate cursor-pointer items-center"
                              >
                                <FaFile />
                                <p className="truncate max-w-[90%] ml-2 text-text_color_light dark:text-text_color_dark">
                                  {item.val}
                                </p>
                              </div>
                            ) : // check is it directories show icon directory
                            issueItem.property === "directories" ? (
                              <div
                                onClick={() => setDirectoriesStore(item.val)}
                                className="flex  truncate cursor-pointer items-center"
                              >
                                <GoFileDirectoryFill />
                                <p className="truncate max-w-[90%] ml-2 text-text_color_light dark:text-text_color_dark">
                                  {item.val}
                                </p>
                              </div>
                            ) : issueItem.property === "languages" ? (
                              <p
                                onClick={() => setLanguagesStore(item.val)}
                                className="truncate cursor-pointer max-w-[90%] text-text_color_light dark:text-text_color_dark"
                              >
                                {item.val}
                              </p>
                            ) : issueItem.property === "tags" ? (
                              <p
                                onClick={() => setTagStore(item.val)}
                                className="truncate cursor-pointer max-w-[90%] text-text_color_light dark:text-text_color_dark"
                              >
                                {item.val}
                              </p>
                            ) : issueItem.property === "severities" ? (
                              <p
                                onClick={() =>
                                  setImpactSeveritiesStore(item.val)
                                }
                                className="truncate cursor-pointer max-w-[90%] text-text_color_light dark:text-text_color_dark"
                              >
                                {item.val}
                              </p>
                            ) : issueItem.property === "rules" ? (
                              <p
                                onClick={() => setRuleStore(item.val)}
                                className="truncate cursor-pointer max-w-[90%] text-text_color_light dark:text-text_color_dark"
                              >
                                {item.val}
                              </p>
                            ) : issueItem.property ===
                              "cleanCodeAttributeCategories" ? (
                              <p
                                onClick={() => setCleanCode(item.val)}
                                className="truncate cursor-pointer max-w-[90%] text-text_color_light dark:text-text_color_dark"
                              >
                                {item.val}
                              </p>
                            ) : (
                              <p className="truncate max-w-[90%] text-text_color_light dark:text-text_color_dark">
                                {item.val}
                              </p>
                            )}
                            {/* change color if it equal 0 */}
                            {item.count === 0 ? (
                              <p className=" text-[14px] text-text_color_desc_light dark:text-text_color_desc_dark ">
                                {item.count}
                              </p>
                            ) : (
                              <p>{item.count}</p>
                            )}
                          </AccordionContent>
                        ))}
                      </AccordionItem>
                    </Accordion>
                  </div>
                )
              )}
            </div>
          </div>
          {/* card issue */}
          <div className=" w-full h-[1000px] scrollbar-hide overflow-y-auto lg:w-[60%] ">
            <section className="h-full">
              {/* fetch issue  */}
              {issueCardResult?.map((issue: any, index: number) => (
                <div
                  key={index}
                  className="w-full mb-5 border-2 border-background_light_mode dark:border-none  dark:bg-card_color_dark p-5 rounded-[20px]"
                >
                  {/* first section*/}
                  <div className="w-full flex justify-between">
                    <p
                      onClick={() => {
                        setActiveContent(true);
                        setProjectKey(issue?.key);

                        setRuleKey(issue.rule);
                      }}
                      className=" text-text_body_16 cursor-pointer truncate  w-[60%] md:w-[75%] xl:w-[80%] text-ascend_color underline"
                    >
                      {issue?.message}
                    </p>
                    <p className=" py-1 px-2 rounded-md text-[14px] text-text_color_light bg-primary_color">
                      {issue?.cleanCodeAttributeCategory}
                    </p>
                  </div>
                  {/* second section */}
                  <div className="flex  justify-between  items-center text-center my-5">
                    <div className=" flex flex-col space-y-2  md:flex-row md:space-y-0 md:space-x-2">
                      {issue?.impacts.map((impact: any, index: number) => (
                        <div
                          key={index}
                          className="flex text-[14px]  md:text-text_body_16 text-center items-center px-3 rounded-md bg-[#60935d21] py-2 "
                        >
                          {impact.severity === "LOW" ? (
                            <img
                              src="/images/iconGood.svg"
                              className="h-5 w-5 md:h-6 md:w-6"
                              alt="Warning Icon"
                            ></img>
                          ) : impact.severity === "MEDIUM" ? (
                            <img
                              src="/images/iconWarning.svg"
                              className=" h-5 w-5 md:h-6 md:w-6"
                              alt="Warning Icon"
                            ></img>
                          ) : (
                            <img
                              src="/images/iconWarning.svg"
                              className="h-5 w-5 md:h-6 md:w-6"
                              alt="Warning Icon"
                            ></img>
                          )}
                          <p className="mx-3">{impact?.softwareQuality} </p>
                        </div>
                      ))}
                    </div>
                    {/* tag */}
                    <div className="flex flex-col space-y-2 md:flex-row text-[14px] md:text-text_body_16 md:space-y-0 md:space-x-2 text-center items-center">
                      {issue?.tags
                        .slice(0, 2)
                        .map((tag: any, index: number) => (
                          <div
                            key={index}
                            className="inline-block bg-[#60935d21] px-2 rounded-md"
                          >
                            {tag === "type-dependent" ? (
                              <p className="md:whitespace-normal md:max-w-none truncate max-w-[40px]">
                                {tag}
                              </p>
                            ) : (
                              <p>{tag}</p>
                            )}
                          </div>
                        ))}

                      {issue?.tags.length > 2 && (
                        <div className=" hidden md:block  items-center">
                          <IoIosMore className="bg-[#60935d21] rounded-md text-text_body_16 h-6 w-5" />
                        </div>
                      )}
                    </div>
                  </div>
                  {/* line */}
                  <hr className="text-text_color_desc_light opacity-10" />
                  <div className="flex  items-center justify-start md:justify-end w-full mt-5 text-[14px] ">
                    <p className="md:whitespace-normal md:max-w-none truncate max-w-full  text-text_color_light  dark:text-text_color_desc_dark">
                      L{issue?.line} • {issue?.effort} effort •{" "}
                      {timeSince(issue?.updateDate)} • {issue?.type} •{" "}
                      <span className="inline md:hidden">
                        {issue?.severity}
                      </span>
                    </p>
                    <div className="hidden md:flex items-center ml-2 text-text_color_light dark:text-text_color_desc_dark">
                      {issue?.severity === "MAJOR" ? (
                        <img
                          src="/images/dangericon.svg"
                          alt=""
                          className="w-[14px] h-full mr-1"
                        />
                      ) : (
                        <img
                          src="/images/iconWarning.svg"
                          alt=""
                          className="w-[14px] h-full mr-1"
                        />
                      )}
                      <p>{issue?.severity}</p>
                    </div>
                  </div>
                </div>
              ))}
            </section>
          </div>
        </section>
      )}
    </main>
  );
}
