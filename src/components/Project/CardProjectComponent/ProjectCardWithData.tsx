"use client";
import { toast } from "@/components/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import CheckGrade from "@/lib/checkGrade";
import { getCoverageData, getDuplicationData, timeSince } from "@/lib/utils";
import { useDeleteProjectMutation } from "@/redux/service/project";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CgDanger } from "react-icons/cg";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";

export default function ProjectCardWithData({ index, projectResult }: any) {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const router = useRouter();
  // rtk for delete project
  const [deleteProject, { isSuccess: isDeleteSuccess }] =
    useDeleteProjectMutation();
  // handle delete project
  const handleDeleteProject = (projectName: string) => {
    setIsDeleteLoading(true);
    deleteProject({ projectName: projectName });
  };

  useEffect(() => {
    if (isDeleteSuccess) {
      toast({
        description: "Project Delete Successully",
        variant: "success",
      });
      setIsDeleteOpen(false);
      setIsDeleteLoading(false);
    }
  }, [isDeleteSuccess]);
  return (
    <section
      key={index}
      className="w-full  my-5 h-full  p-5  border border-opacity-40 border-text_color_desc_light dark:border-primary_color rounded-[20px] "
    >
      <div className="flex  justify-between w-full">
        <p
          onClick={() =>
            router.push(`project/${projectResult?.component.component.name}`)
          }
          className="text-text_body_16 cursor-pointer text-text_color_light dark:text-text_color_dark hover:text-ascend_color hover:underline "
        >
          {/* Display different text based on screen size */}
          <span className="block md:hidden">
            {projectResult?.component.component.name.split('--')[1] || projectResult?.component.component.name}
          </span>
          <span className="hidden md:block">
            {projectResult?.component.component.name}
          </span>
        </p>
        <div className="flex">
          {projectResult?.branch?.map(
            (branchItem: any, branchIndex: number) => {
              return branchItem?.branches?.map((item: any, index: number) => {
                return (
                  <div
                    key={`${branchIndex}-${index}`}
                    className="flex text-center items-center"
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
                    <p className="px-2 text-text_body_16 hidden md:block">
                      {item.status.qualityGateStatus === "OK"
                        ? "Passed"
                        : "Failed"}
                    </p>
                    <p className="mx-2">|</p>
                  </div>
                );
              });
            }
          )}
          {/* for delete project */}
          <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
            <AlertDialogTrigger asChild>
              <RxCross2 className="h-6 w-6 text-custom_red cursor-pointer" />
            </AlertDialogTrigger>
            <AlertDialogContent className="sm:max-w-[450px]">
              <AlertDialogHeader className="items-center">
                <div>
                  <CgDanger className="h-[60px] w-[60px] text-custom_red" />
                </div>
              </AlertDialogHeader>
              <AlertDialogTitle className="text-center  text-text_color_light dark:text-text_color_dark">
                Are you sure you want to delete project
                <span className="text-secondary_color">
                  {" "}
                  {projectResult?.component?.component.name}
                </span>
              </AlertDialogTitle>
              <AlertDialogFooter className="w-full flex justify-center gap-5">
                <Button
                  disabled={isDeleteLoading}
                  type="button"
                  className="px-5 hover:bg-custom_red"
                  variant="secondary"
                  onClick={() =>
                    handleDeleteProject(
                      projectResult?.component?.component.name
                    )
                  }
                >
                  {isDeleteLoading ? (
                    <div className="spinner-border animate-spin inline-block w-6 h-6 border-2 rounded-full border-t-2 border-text_color_dark border-t-transparent"></div>
                  ) : (
                    "Yes"
                  )}
                </Button>
                <AlertDialogCancel asChild>
                  <Button
                    disabled={isDeleteLoading}
                    type="button"
                    variant="secondary"
                    className="hover:bg-custom_red"
                  >
                    Close
                  </Button>
                </AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      <p className=" my-2 text-left text-[14px] text-text_color_desc_light dark:text-text_color_desc_dark ">
        {" "}
        <span className="text-secondary_color truncate">
          Last analysis:
        </span>{" "}
        {projectResult?.branch?.map((branchItem: any, branchIndex: number) =>
          branchItem?.branches?.map((item: any, index: number) => (
            <span key={`${branchIndex}-${index}`}>
              {timeSince(item?.analysisDate)}{" "}
            </span>
          ))
        )}
        {projectResult?.component?.component?.measures?.map(
          (item: any, index: number) => {
            if (item.metric === "ncloc") {
              return <span key={index}>{item.value} • Lines of Code • </span>;
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

      <div className="grid  grid-cols-2 md:grid-cols-3 lg:gap-4 xl:gap-5">
        {/* security */}
        <div className="w-full h-full ">
          {/* score security */}
          <div className="flex w-full justify-center  text-center items-center">
            {projectResult?.component?.component?.measures?.map(
              (item: any, index: number) => {
                if (item.metric === "security_issues") {
                  // check conditon return grade base on score
                  const parsedValue = JSON.parse(item.value);
                  return (
                    <CheckGrade
                      key={index}
                      parsedValue={parsedValue}
                      index={index}
                    />
                  );
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
          <div className="my-5 cursor-default w-full flex items-center justify-center">
            <HoverCard>
              <HoverCardTrigger>Security</HoverCardTrigger>
              <HoverCardContent className="text-text_body_16">
                Security is the protection of your software from unauthorized
                access, use, or destruction.
              </HoverCardContent>
            </HoverCard>
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
                  return (
                    <CheckGrade
                      key={index}
                      parsedValue={parsedValue}
                      index={index}
                    />
                  );
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
          <div className="my-5 cursor-default w-full flex items-center justify-center">
            <HoverCard>
              <HoverCardTrigger>Reliability</HoverCardTrigger>
              <HoverCardContent className="text-text_body_16 ">
                Reliability is a measure of how your software is capable of
                maintaining its level of performance under stated conditions for
                a stated period of time.
              </HoverCardContent>
            </HoverCard>
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
                  return (
                    <CheckGrade
                      key={index}
                      parsedValue={parsedValue}
                      index={index}
                    />
                  );
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
          <div className="my-5 cursor-default w-full flex items-center justify-center">
            <HoverCard>
              <HoverCardTrigger>Maintainability</HoverCardTrigger>
              <HoverCardContent className="text-text_body_16 ">
                Maintainability refers to the ease with which you can repair,
                improve and understand software code.
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>
        {/* Hotspot Reviewed */}
        <div className="w-full h-full">
          {/* Hotspot Reviewed */}
          <div className="flex w-full justify-center  text-center items-center">
            {/* grade */}
            {projectResult?.component?.component?.measures?.map(
              (item: any, index: number) => {
                if (item.metric === "security_hotspots") {
                  // check conditon return grade base on score
                  const parsedValue = JSON.parse(item.value);
                  return (
                    <CheckGrade
                      key={index}
                      parsedValue={parsedValue}
                      index={index}
                    />
                  );
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
            <HoverCard>
              <HoverCardTrigger>Hotspot</HoverCardTrigger>
              <HoverCardContent className="text-text_body_16 ">
                Areas of code that may require a closer look but aren't
                necessarily vulnerabilities.
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>
        {/* Coverage Reviewed */}
        <div className="w-full h-full">
          {/* Coverage Reviewed */}
          <div className="flex w-full justify-center  text-center items-center">
            {projectResult?.component?.component?.measures.includes(
              "coverage"
            ) ? (
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
                              "/images/20percent.png"
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
            ) : (
              <p className="mt-2 text-text_color_light dark:text-text_color_dark">
                {" "}
                No Data{" "}
              </p>
            )}
          </div>
          <div className="mt-5 w-full flex items-center text-center justify-center">
            <HoverCard>
              <HoverCardTrigger> Coverage</HoverCardTrigger>
              <HoverCardContent className="text-text_body_16 ">
                Measures how well your unit tests cover the codebase.
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>
        {/* duplicated */}
        <div className="w-full h-full">
          {/* duplicated */}
          <div className="flex w-full justify-center  text-center items-center">
            {projectResult?.component?.component?.measures.includes(
              "duplicated_lines_density"
            ) ? (
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
            ) : (
              <p className="mt-2 text-text_color_light dark:text-text_color_dark">
                {" "}
                No Data{" "}
              </p>
            )}
          </div>
          <div className="mt-5 w-full flex items-center justify-center">
            <HoverCard>
              <HoverCardTrigger> Duplicated</HoverCardTrigger>
              <HoverCardContent className="text-text_body_16 ">
                Identifies duplicate or copy-pasted code.
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>
      </div>
    </section>
  );
}
