"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCoverageData, getDuplicationData, timeSince } from "@/lib/utils";
import { useGetProjectOverViewUserQuery } from "@/redux/service/project";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CgDanger } from "react-icons/cg";
import { FaCheck } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import LoadProjectComponent from "../Project/LoadingProjectComponent/LoadProjectComponent";
import { Button } from "../ui/button";
import { DialogHeader } from "../ui/dialog";
export default function ScanHistoryComponent() {
  const router = useRouter();
  const [userUUID, setUserUUID] = useState("");

  const [activeTab, setActiveTab] = useState("scanHistory");

  const handleTabClick = (tab: any) => {
    setActiveTab(tab);
    if (tab === "blogHistory") {
      router.push("/blogHistory");
    } else if (tab === "myProfile") {
      router.push("/myProfile");
    } else if (tab === "bookmark") {
      router.push("/bookmark");
    }
  };

  useEffect(() => {
    setUserUUID(localStorage.getItem("userUUID") || "");
  });

  const { data: projectScanByUser, isError } = useGetProjectOverViewUserQuery({
    uuid: userUUID,
    page: 0,
    size: 100,
  });

  console.log(projectScanByUser);

  return (
    <section>
      {/* header */}
      <div className="flex justify-center md:justify-between pb-2">
        <p className="text-text_title_20 text-text_color_light dark:text-text_color_dark hidden md:inline-block">
          Scan History
        </p>
        <div className="flex gap-6 text-text_body_16">
          <button
            onClick={() => handleTabClick("blogHistory")}
            className={`pb-2 ${
              activeTab === "blogHistory"
                ? "border-b-2 border-ascend_color text-ascend_color"
                : "text-text_color_desc_light dark:text-text_color_desc_dark"
            }`}
          >
            Blog <span className="hidden md:inline-block">History</span>
          </button>
          <button
            onClick={() => handleTabClick("bookmark")}
            className={`pb-2 ${
              activeTab === "bookmark"
                ? "border-b-2 border-ascend_color text-ascend_color"
                : "text-text_color_desc_light dark:text-text_color_desc_dark"
            }`}
          >
            <span className="hidden md:inline-block">Blog</span> Bookmark
          </button>
          <button
            onClick={() => setActiveTab("scanHistory")}
            className={`pb-2 ${
              activeTab === "scanHistory"
                ? "border-b-2 border-ascend_color text-ascend_color"
                : "text-text_color_desc_light dark:text-text_color_desc_dark"
            }`}
          >
            Scan <span className="hidden md:inline-block">History</span>
          </button>
          <button
            onClick={() => handleTabClick("myProfile")}
            className={`pb-2 ${
              activeTab === "myProfile"
                ? "border-b-2 border-ascend_color text-ascend_color"
                : "text-text_color_desc_light dark:text-text_color_desc_dark"
            }`}
          >
            Profile <span className="hidden md:inline-block">Setting</span>
          </button>
        </div>
      </div>
      {/* body content */}

      <section className=" bg-card_color_light dark:bg-card_color_dark rounded-[20px] my-10 p-5">
        {/* search and sort */}
        <div className="flex  flex-col md:flex-row justify-between gap-5 ">
          <div className="bg-background_light_mode dark:bg-card_color_dark text-text_color_desc_light dark:text-text_color_desc_dark flex items-center gap-3 px-5 py-3 rounded-xl">
            <IoSearchSharp />
            <input
              type="text"
              // value={inputValue}
              // onChange={handleInputChange}
              // onKeyPress={handleKeyPressforSearchProject}
              placeholder="Search for anything..."
              className="bg-transparent outline-none w-full text-sm placeholder:text-text_color_desc_light dark:placeholder:text-text_color_desc_dark"
            />
          </div>

          <div className="flex gap-5 items-center">
            <p>Sort By</p>
            <Select>
              <SelectTrigger className="w-[180px] bg-background_light_mode dark:bg-card_color_dark border-none">
                <SelectValue placeholder="Name" />
              </SelectTrigger>
              <SelectContent className="bg-background_light_mode dark:bg-background_dark_mode">
                <SelectItem value="light">Name</SelectItem>
                <SelectItem value="dark">Last analysis date</SelectItem>
                <SelectItem value="system">Creation date</SelectItem>
                <SelectItem value="reliability">Reliability</SelectItem>
                <SelectItem value="security">Security</SelectItem>
                <SelectItem value="security review">Security review</SelectItem>
                <SelectItem value="maintainability">Maintainability</SelectItem>
                <SelectItem value="coverage">Coverage</SelectItem>
                <SelectItem value="duplications">Duplications</SelectItem>
                <SelectItem value="size">Size</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* project card */}
        <div className=" my-5">
          {projectScanByUser?.map((projectResult: any, index: number) => {

            return projectResult?.component.component.measures.length !== 0 ||
              !isError ? (
              <div
                key={index}
                className="w-full  my-5 h-full  p-5  border border-opacity-40 border-text_color_desc_light dark:border-primary_color rounded-[20px] "
              >
                <div className="flex justify-between w-full">
                  <p
                    onClick={() =>
                      router.push(
                        `project/${projectResult?.component.component.name}`
                      )
                    }
                    className="text-text_body_16 text-text_color_light dark:text-text_color_dark hover:text-ascend_color hover:underline "
                  >
                    {projectResult?.component.component.name}
                  </p>
                  {projectResult?.branch?.map(
                    (branchItem: any, branchIndex: number) => {
                      return branchItem?.branches?.map(
                        (item: any, index: number) => {
                          return (
                            <div
                              key={`${branchIndex}-${index}`}
                              className="flex text-center items-center "
                            >
                              <div
                                className={`w-[25px] h-[25px] flex items-center justify-center rounded-[5px] ${item.status.qualityGateStatus === "OK"
                                    ? "bg-primary_color"
                                    : "bg-custom_red"
                                  }`}
                              >
                                {item.status.qualityGateStatus === "OK" ? (
                                  <FaCheck className="dark:text-text_color_light" />
                                ) : (
                                  <RxCross2 className="dark:text-text_color_light" />
                                )}
                              </div>
                              <p className="px-2 text-text_body_16">
                                {item.status.qualityGateStatus === "OK"
                                  ? "Passed"
                                  : "Failed"}
                              </p>
                              <p className="mx-2">|</p>

                              <Dialog>
                                <DialogTrigger asChild>
                                  <RxCross2 className="h-6 w-6 text-custom_red cursor-pointer" />
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-md ">
                                  <DialogHeader className="my-2">
                                    <DialogTitle className="w-full flex justify-center items-center ">
                                      <div>
                                        {" "}
                                        <CgDanger className="h-[60px] w-[60px] text-custom_red" />
                                      </div>
                                    </DialogTitle>
                                    <DialogDescription className="text-center ">
                                      Are you sure want to delete this project ?{" "}
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="w-full flex justify-center gap-5 ">
                                    <Button
                                      //disabled={isLoading}
                                      type="button"
                                      className="px-5 hover:bg-custom_red "
                                      variant="secondary"
                                    // onClick={() =>

                                    // }
                                    >
                                      {/* {isLoading ? (
                                        <div className="spinner-border animate-spin  inline-block w-6 h-6 border-2 rounded-full border-t-2 border-text_color_dark border-t-transparent"></div>
                                      ) : (
                                        "Yes"
                                      )} */}
                                      Yes
                                    </Button>
                                    <DialogClose asChild>
                                      <Button
                                        //disabled={isLoading}
                                        type="button"
                                        variant="secondary"
                                        className=" hover:bg-custom_red"
                                      >
                                        Close
                                      </Button>
                                    </DialogClose>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </div>
                          );
                        }
                      );
                    }
                  )}
                </div>
                <p className=" my-2 text-left text-[14px] text-text_color_desc_light dark:text-text_color_desc_dark ">
                  {" "}
                  <span className="text-secondary_color truncate">
                    Last analysis:
                  </span>{" "}
                  {projectResult?.branch?.map(
                    (branchItem: any, branchIndex: number) =>
                      branchItem?.branches?.map((item: any, index: number) => (
                        <span key={`${branchIndex}-${index}`}>
                          {timeSince(item?.analysisDate)} •{" "}
                        </span>
                      ))
                  )}
                  {projectResult?.component?.component?.measures?.map(
                    (item: any, index: number) => {
                      if (item.metric === "ncloc") {
                        return (
                          <span key={index}>{item.value} Lines of Code • </span>
                        );
                      }
                    }
                  )}
                  {projectResult?.component?.component?.measures?.map(
                    (item: any, index: number) => {
                      if (item.metric === "ncloc_language_distribution") {
                        return (
                          <span key={index}>
                            Language •{" "}
                            {item.value
                              .match(/\w+(?==)/g)
                              ?.join(" ")
                              .toUpperCase()}{" "}
                          </span>
                        );
                      }
                    }
                  )}
                </p>

                <hr className="my-5 dark:border-primary_color" />
                {/* result section */}
                <div className="grid grid-cols-2 gap-5 md:gap-0 md:flex md:flex-row justify-center items-center">
                  {/* security */}
                  <div className="w-full h-full ">
                    {/* score security */}
                    <div className="flex w-full justify-center  text-center items-center">
                      {projectResult?.component?.component?.measures?.map(
                        (item: any, index: number) => {
                          if (item.metric === "security_issues") {
                            // check conditon return grade base on score
                            const parsedValue = JSON.parse(item.value);
                            if (parsedValue.INFO > 0) {
                              return (
                                <div
                                  key={index}
                                  className="w-[30px] h-[30px] flex items-center justify-center rounded-[5px] border border-primary_color"
                                >
                                  A
                                </div>
                              );
                            } else if (
                              parsedValue.LOW > 0 &&
                              parsedValue.LOW > parsedValue.INFO &&
                              parsedValue.LOW > parsedValue.MEDIUM &&
                              parsedValue.LOW > parsedValue.HIGH &&
                              parsedValue.LOW > parsedValue.BLOCKER
                            ) {
                              return (
                                <div
                                  key={index}
                                  className="w-[30px] h-[30px] flex items-center justify-center rounded-[5px] border border-[#60935D]"
                                >
                                  B
                                </div>
                              );
                            } else if (
                              parsedValue.MEDIUM > 0 &&
                              parsedValue.MEDIUM > parsedValue.INFO &&
                              parsedValue.MEDIUM > parsedValue.LOW &&
                              parsedValue.MEDIUM > parsedValue.HIGH &&
                              parsedValue.MEDIUM > parsedValue.BLOCKER
                            ) {
                              return (
                                <div
                                  key={index}
                                  className="w-[30px] h-[30px] flex items-center justify-center rounded-[5px] border border-[#F7DC6F]"
                                >
                                  C
                                </div>
                              );
                            } else if (
                              parsedValue.HIGH > 0 &&
                              parsedValue.HIGH > parsedValue.INFO &&
                              parsedValue.HIGH > parsedValue.LOW &&
                              parsedValue.HIGH > parsedValue.MEDIUM &&
                              parsedValue.HIGH > parsedValue.BLOCKER
                            ) {
                              return (
                                <div
                                  key={index}
                                  className="w-[30px] h-[30px] flex items-center justify-center rounded-[5px] border border-[#F9B800]"
                                >
                                  D
                                </div>
                              );
                            } else if (
                              parsedValue.BLOCKER > 0 &&
                              parsedValue.BLOCKER > parsedValue.INFO &&
                              parsedValue.BLOCKER > parsedValue.LOW &&
                              parsedValue.BLOCKER > parsedValue.MEDIUM &&
                              parsedValue.BLOCKER > parsedValue.HIGH
                            ) {
                              return (
                                <div
                                  key={index}
                                  className="w-[30px] h-[30px] flex items-center justify-center rounded-[5px] border border-[#EA4335]"
                                >
                                  F
                                </div>
                              );
                            } else {
                              return (
                                <div
                                  key={index}
                                  className="w-[30px] h-[30px] flex items-center justify-center rounded-[5px] border border-primary_color"
                                >
                                  A
                                </div>
                              );
                            }
                          }
                        }
                      )}

                      {projectResult?.component?.component?.measures?.map(
                        (item: any, index: number) => {
                          if (item.metric === "security_issues") {
                            return (
                              <p key={index} className="mx-2">
                                {JSON.parse(item.value).total}
                              </p>
                            );
                          }
                        }
                      )}
                    </div>
                    <div className="mt-5 w-full flex items-center justify-center">
                      Security
                    </div>
                  </div>
                  {/* reliability */}
                  <div className="w-full h-full">
                    {/* score reliability */}
                    <div className="flex w-full justify-center  text-center items-center">
                      {/* grade */}
                      {projectResult?.component?.component?.measures?.map(
                        (item: any, index: number) => {
                          if (item.metric === "reliability_issues") {
                            // check conditon return grade base on score
                            const parsedValue = JSON.parse(item.value);
                            if (parsedValue.INFO > 0) {
                              return (
                                <div
                                  key={index}
                                  className="w-[30px] h-[30px] flex items-center justify-center rounded-[5px] border border-primary_color"
                                >
                                  A
                                </div>
                              );
                            } else if (
                              parsedValue.LOW > 0 &&
                              parsedValue.LOW > parsedValue.INFO &&
                              parsedValue.LOW > parsedValue.MEDIUM &&
                              parsedValue.LOW > parsedValue.HIGH &&
                              parsedValue.LOW > parsedValue.BLOCKER
                            ) {
                              return (
                                <div
                                  key={index}
                                  className="w-[30px] h-[30px] flex items-center justify-center rounded-[5px] border border-[#60935D]"
                                >
                                  B
                                </div>
                              );
                            } else if (
                              parsedValue.MEDIUM > 0 &&
                              parsedValue.MEDIUM > parsedValue.INFO &&
                              parsedValue.MEDIUM > parsedValue.LOW &&
                              parsedValue.MEDIUM > parsedValue.HIGH &&
                              parsedValue.MEDIUM > parsedValue.BLOCKER
                            ) {
                              return (
                                <div
                                  key={index}
                                  className="w-[30px] h-[30px] flex items-center justify-center rounded-[5px] border border-[#F7DC6F]"
                                >
                                  C
                                </div>
                              );
                            } else if (
                              parsedValue.HIGH > 0 &&
                              parsedValue.HIGH > parsedValue.INFO &&
                              parsedValue.HIGH > parsedValue.LOW &&
                              parsedValue.HIGH > parsedValue.MEDIUM &&
                              parsedValue.HIGH > parsedValue.BLOCKER
                            ) {
                              return (
                                <div
                                  key={index}
                                  className="w-[30px] h-[30px] flex items-center justify-center rounded-[5px] border border-[#F9B800]"
                                >
                                  D
                                </div>
                              );
                            } else if (
                              parsedValue.BLOCKER > 0 &&
                              parsedValue.BLOCKER > parsedValue.INFO &&
                              parsedValue.BLOCKER > parsedValue.LOW &&
                              parsedValue.BLOCKER > parsedValue.MEDIUM &&
                              parsedValue.BLOCKER > parsedValue.HIGH
                            ) {
                              return (
                                <div
                                  key={index}
                                  className="w-[30px] h-[30px] flex items-center justify-center rounded-[5px] border border-[#EA4335]"
                                >
                                  F
                                </div>
                              );
                            } else {
                              return (
                                <div
                                  key={index}
                                  className="w-[30px] h-[30px] flex items-center justify-center rounded-[5px] border border-primary_color"
                                >
                                  No Data
                                </div>
                              );
                            }
                          }
                        }
                      )}
                      {/* total score */}
                      {projectResult?.component?.component?.measures?.map(
                        (item: any, index: number) => {
                          if (item.metric === "reliability_issues") {
                            return (
                              <p key={index} className="mx-2">
                                {JSON.parse(item.value).total}
                              </p>
                            );
                          }
                        }
                      )}
                    </div>
                    <div className="mt-5 w-full flex items-center justify-center">
                      Reliability
                    </div>
                  </div>
                  {/* Maintainability */}
                  <div className="w-full h-full">
                    {/* Maintainability */}
                    <div className="flex w-full justify-center  text-center items-center">
                      {/* grade */}
                      {projectResult?.component?.component?.measures?.map(
                        (item: any, index: number) => {
                          if (item.metric === "maintainability_issues") {
                            // check conditon return grade base on score
                            const parsedValue = JSON.parse(item.value);
                            if (parsedValue.INFO > 0) {
                              return (
                                <div
                                  key={index}
                                  className="w-[30px] h-[30px] flex items-center justify-center rounded-[5px] border border-primary_color"
                                >
                                  A
                                </div>
                              );
                            } else if (
                              parsedValue.LOW > 0 &&
                              parsedValue.LOW > parsedValue.INFO &&
                              parsedValue.LOW > parsedValue.MEDIUM &&
                              parsedValue.LOW > parsedValue.HIGH &&
                              parsedValue.LOW > parsedValue.BLOCKER
                            ) {
                              return (
                                <div
                                  key={index}
                                  className="w-[30px] h-[30px] flex items-center justify-center rounded-[5px] border border-[#60935D]"
                                >
                                  B
                                </div>
                              );
                            } else if (
                              parsedValue.MEDIUM > 0 &&
                              parsedValue.MEDIUM > parsedValue.INFO &&
                              parsedValue.MEDIUM > parsedValue.LOW &&
                              parsedValue.MEDIUM > parsedValue.HIGH &&
                              parsedValue.MEDIUM > parsedValue.BLOCKER
                            ) {
                              return (
                                <div
                                  key={index}
                                  className="w-[30px] h-[30px] flex items-center justify-center rounded-[5px] border border-[#F7DC6F]"
                                >
                                  C
                                </div>
                              );
                            } else if (
                              parsedValue.HIGH > 0 &&
                              parsedValue.HIGH > parsedValue.INFO &&
                              parsedValue.HIGH > parsedValue.LOW &&
                              parsedValue.HIGH > parsedValue.MEDIUM &&
                              parsedValue.HIGH > parsedValue.BLOCKER
                            ) {
                              return (
                                <div
                                  key={index}
                                  className="w-[30px] h-[30px] flex items-center justify-center rounded-[5px] border border-[#F9B800]"
                                >
                                  D
                                </div>
                              );
                            } else if (
                              parsedValue.BLOCKER > 0 &&
                              parsedValue.BLOCKER > parsedValue.INFO &&
                              parsedValue.BLOCKER > parsedValue.LOW &&
                              parsedValue.BLOCKER > parsedValue.MEDIUM &&
                              parsedValue.BLOCKER > parsedValue.HIGH
                            ) {
                              return (
                                <div
                                  key={index}
                                  className="w-[30px] h-[30px] flex items-center justify-center rounded-[5px] border border-[#EA4335]"
                                >
                                  F
                                </div>
                              );
                            } else {
                              return (
                                <div
                                  key={index}
                                  className="w-[30px] h-[30px] flex items-center justify-center rounded-[5px] border border-primary_color"
                                >
                                  No Data
                                </div>
                              );
                            }
                          }
                        }
                      )}
                      {/* score */}
                      {projectResult?.component?.component?.measures?.map(
                        (item: any, index: number) => {
                          if (item.metric === "maintainability_issues") {
                            return (
                              <p key={index} className="mx-2">
                                {JSON.parse(item.value).total}
                              </p>
                            );
                          }
                        }
                      )}
                    </div>
                    <div className="mt-5 w-full flex items-center justify-center">
                      Maintainability
                    </div>
                  </div>
                  {/* Hotspot Reviewed */}
                  <div className="w-full h-full">
                    {/* Hotspot Reviewed */}
                    <div className="flex w-full justify-center  text-center items-center">
                      {/* grade */}
                      {projectResult?.component?.component?.measures?.map(
                        (item: any, index: number) => {
                          if (item.metric === "reliability_issues") {
                            // check conditon return grade base on score
                            const parsedValue = JSON.parse(item.value);
                            if (parsedValue.INFO > 0) {
                              return (
                                <div
                                  key={index}
                                  className="w-[30px] h-[30px] flex items-center justify-center rounded-[5px] border border-primary_color"
                                >
                                  A
                                </div>
                              );
                            } else if (
                              parsedValue.LOW > 0 &&
                              parsedValue.LOW > parsedValue.INFO &&
                              parsedValue.LOW > parsedValue.MEDIUM &&
                              parsedValue.LOW > parsedValue.HIGH &&
                              parsedValue.LOW > parsedValue.BLOCKER
                            ) {
                              return (
                                <div
                                  key={index}
                                  className="w-[30px] h-[30px] flex items-center justify-center rounded-[5px] border border-[#60935D]"
                                >
                                  B
                                </div>
                              );
                            } else if (
                              parsedValue.MEDIUM > 0 &&
                              parsedValue.MEDIUM > parsedValue.INFO &&
                              parsedValue.MEDIUM > parsedValue.LOW &&
                              parsedValue.MEDIUM > parsedValue.HIGH &&
                              parsedValue.MEDIUM > parsedValue.BLOCKER
                            ) {
                              return (
                                <div
                                  key={index}
                                  className="w-[30px] h-[30px] flex items-center justify-center rounded-[5px] border border-[#F7DC6F]"
                                >
                                  C
                                </div>
                              );
                            } else if (
                              parsedValue.HIGH > 0 &&
                              parsedValue.HIGH > parsedValue.INFO &&
                              parsedValue.HIGH > parsedValue.LOW &&
                              parsedValue.HIGH > parsedValue.MEDIUM &&
                              parsedValue.HIGH > parsedValue.BLOCKER
                            ) {
                              return (
                                <div
                                  key={index}
                                  className="w-[30px] h-[30px] flex items-center justify-center rounded-[5px] border border-[#F9B800]"
                                >
                                  D
                                </div>
                              );
                            } else if (
                              parsedValue.BLOCKER > 0 &&
                              parsedValue.BLOCKER > parsedValue.INFO &&
                              parsedValue.BLOCKER > parsedValue.LOW &&
                              parsedValue.BLOCKER > parsedValue.MEDIUM &&
                              parsedValue.BLOCKER > parsedValue.HIGH
                            ) {
                              return (
                                <div
                                  key={index}
                                  className="w-[30px] h-[30px] flex items-center justify-center rounded-[5px] border border-[#EA4335]"
                                >
                                  F
                                </div>
                              );
                            } else {
                              return (
                                <div
                                  key={index}
                                  className="w-[30px] h-[30px] flex items-center justify-center rounded-[5px] border border-primary_color"
                                >
                                  No Data
                                </div>
                              );
                            }
                          }
                        }
                      )}
                      {/* score  */}
                      {projectResult?.component?.component?.measures?.map(
                        (item: any, index: number) => {
                          if (item.metric === "security_hotspots") {
                            return (
                              <p key={index} className="mx-2">
                                {item.value}
                              </p>
                            );
                          }
                        }
                      )}
                    </div>
                    <div className="mt-5 w-full flex items-center text-center justify-center">
                      Hotspot
                    </div>
                  </div>
                  {/* Coverage Reviewed */}
                  <div className="w-full h-full">
                    {/* Coverage Reviewed */}
                    <div className="flex w-full justify-center  text-center items-center">
                      {projectResult?.component?.component?.measures?.map(
                        (item: any, index: number) => {
                          if (item.metric === "coverage") {
                            return (
                              <div
                                key={index}
                                className="w-[60px] h-[30px] flex items-center justify-center"
                              >
                                <Image
                                  width={50}
                                  height={50}
                                  alt="coverage"
                                  src={
                                    getCoverageData(item?.value)?.image ||
                                    "/default-image.png"
                                  }
                                />
                              </div>
                            );
                          }
                        }
                      )}
                      {projectResult?.component?.component?.measures?.map(
                        (item: any, index: number) => {
                          if (item.metric === "coverage") {
                            return (
                              <p key={index} className="mx-2">
                                {item.value}
                              </p>
                            );
                          }
                        }
                      )}
                    </div>
                    <div className="mt-5 w-full flex items-center text-center justify-center">
                      Coverage
                    </div>
                  </div>
                  {/* duplicated */}
                  <div className="w-full h-full">
                    {/* duplicated */}
                    <div className="flex w-full justify-center  text-center items-center">
                      {projectResult?.component?.component?.measures?.map(
                        (item: any, index: number) => {
                          if (item.metric === "duplicated_lines_density") {
                            return (
                              <div
                                key={index}
                                className="w-[35px] h-[30px] flex items-center justify-center"
                              >
                                <Image
                                  width={35}
                                  height={30}
                                  alt="coverage"
                                  src={getDuplicationData(item.value).image}
                                />
                              </div>
                            );
                          }
                        }
                      )}
                      {projectResult?.component?.component?.measures?.map(
                        (item: any, index: number) => {
                          if (item.metric === "duplicated_lines_density") {
                            return (
                              <p key={index} className="mx-2">
                                {item.value}
                              </p>
                            );
                          }
                        }
                      )}
                    </div>
                    <div className="mt-5 w-full flex items-center justify-center">
                      Duplicated
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="my-10" key={index}>
                <LoadProjectComponent textDisplay={"No Scan History"} />
              </div>
            );
          })}
        </div>
      </section>
    </section>
  );
}
