import {
  useGetProjectByUserUuidQuery,
  useGetProjectDetailQuery,
  useGetProjectOverviewUserQuery,
} from "@/redux/service/overview";
import { Metadata } from "next";
import React, { useEffect, useRef, useState } from "react";
import { SiTicktick } from "react-icons/si";
import { FaCodeBranch } from "react-icons/fa";
import { BsPatchQuestionFill } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import CheckGrade from "@/lib/checkGrade";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useGetProjectOverViewUserQuery } from "@/redux/service/project";
import { get } from "http";

type OverviewProps = {
  projectName: string;
};

type MetricType = {
  metric: string;
  value: string;
  bestValue?: boolean;
};

export const metadata: Metadata = {
  title: "ProjectOverview - Inspectra",
  description:
    "Learn more about Inspectra, a white-box testing platform designed to review source code and identify security weaknesses. Discover our mission, values, and commitment to secure development.",
};

export default function PageOverviewProjectDetail({
  projectName,
}: OverviewProps) {
  const nameOfProject = projectName;

  const [userUUID, setUserUUID] = useState<string>("");

  useEffect(() => {
    const storedUUID = localStorage.getItem("userUUID") || "";
    setUserUUID(storedUUID);
  });

  const [isloading, setIsLoading] = useState(false);

  const { data } = useGetProjectDetailQuery({
    projectName: nameOfProject,
  });

  const metrics = data?.[0]?.component?.measures || [];

  const ncLock =
    data?.[0]?.component?.measures?.find(
      (metric: any) => metric.metric === "ncloc"
    )?.value || 0;

  const contentRef = useRef<HTMLDivElement>(null);

  // handleExportPDF function
  const handleExportPDF = async (projectName: string) => {
    setIsLoading(true);
    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}pdf/${projectName}`;
    const response = await fetch(endpoint);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");

    // Set download attributes
    link.href = url;
    link.download = `${projectName}.pdf`; // Set the filename as `pName.pdf`
    document.body.appendChild(link);
    link.click(); // Trigger the download
    setIsLoading(false);
    document.body.removeChild(link); // Cleanup
  };

  // get project by user uuid
  const { data: projectUuid } = useGetProjectOverviewUserQuery({projectName: nameOfProject});

  const [getProjectByUserUuid, setProjectByUserUuid] = useState<any>(null);

  useEffect(() => {
    if (projectUuid) {

      const branch = projectUuid?.branch?.[0]?.branches?.[0]
      
      if (branch) {
        setProjectByUserUuid(branch);
      }
    }
  }, [projectUuid]);
  
  // check data and time
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    // Fix the date format by replacing "+0000" with "Z"
    const fixedDateString = dateString.replace("+0000", "Z");
    const date = new Date(fixedDateString);
    // Get individual parts of the date
    const options: Intl.DateTimeFormatOptions = {
      month: "long",
      day: "numeric",
      year: "numeric",
    };
    const datePart = new Intl.DateTimeFormat("en-US", options).format(date);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${datePart} ${hours}:${minutes}`;
  };

  const formattedDate = formatDate(getProjectByUserUuid?.analysisDate);

  // Find the highest total issues dynamically across all metrics
  const maxIssues = metrics.reduce((max: any, metric: any) => {
    try {
      const value =
        metric.value.startsWith("{") && metric.value.endsWith("}")
          ? JSON.parse(metric.value)?.total || 0
          : parseFloat(metric.value) || 0;
      return Math.max(max, value);
    } catch (err) {
      console.error(`Error parsing metric: ${metric.metric}`, err);
      return max;
    }
  }, 0); // Default to 0 if no issues found

  return (
    <section
      className="px-6 md:px-10 lg:px-14 border border-gray-300 dark:border-gray-700 rounded-xl pb-12"
      ref={contentRef}
    >
      {/* Header Section */}
      <div className="w-full flex flex-col gap-4 sm:gap-6 sm:flex-row sm:justify-between sm:items-center py-4">
        <div className="text-gray-800 dark:text-gray-200 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <FaCodeBranch className="text-2xl text-gray-600 dark:text-gray-400" />
            <p className="text-base sm:text-lg font-medium">
              {getProjectByUserUuid?.name || "main"}
            </p>
          </div>
        </div>

        {/* Info Section */}
        <div>
          <ul className="flex flex-wrap items-center gap-4 text-sm sm:text-base text-gray-600 dark:text-gray-400">
            <li>{ncLock || "1817"} Lines of Code</li>
            <li>Version not Provided</li>
            <li>
              <button
                className="bg-primary_color text-text_color_light px-4 py-2 rounded-md hover:bg-green-600 transition-all flex justify-center items-center"
                onClick={() => handleExportPDF(nameOfProject)}
              >
                {isloading ? (
                  <div className="spinner-border animate-spin inline-block w-6 h-6 border-2 rounded-full border-t-2 border-text_color_light border-t-transparent"></div>
                ) : (
                  "Export"
                )}
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-b border-gray-300 dark:border-gray-600 mb-6"></div>

      {/* Quality Gate Section */}
      <div className="w-full flex flex-col md:flex-row justify-between gap-6">
        <div className="flex items-center gap-4">
          <h2
            className={`p-4 rounded-lg text-text_color_light text-xl ${getProjectByUserUuid?.status.qualityGateStatus === "OK"
                ? "bg-primary_color"
                : "bg-red-500"
              }`}
          >
            {getProjectByUserUuid?.status.qualityGateStatus === "OK" ? (
              <SiTicktick />
            ) : (
              <AiOutlineClose />
            )}
          </h2>
          <div>
            <div className="flex gap-2 items-center">
              <p className="text-sm dark:text-gray-400">Quality Gate</p>
              <HoverCard>
                <HoverCardTrigger>
                  <BsPatchQuestionFill className="text-text_color_desc_light dark:text-text_color_desc_dark" />
                </HoverCardTrigger>
                <HoverCardContent className="text-sm">
                A Quality Gate is a set of measure-based Boolean conditions. It helps you know immediately whether your project is production-ready. If your current status is not Passed, you'll see which measures caused the problem and the values required to pass.
                </HoverCardContent>
              </HoverCard>
            </div>
            <p className="text-lg font-semibold dark:text-white">
              {getProjectByUserUuid?.status.qualityGateStatus === "OK"
                ? "Passed"
                : "Failed"}
            </p>
          </div>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Last Analysis:{" "}
          <span className="text-gray-800 dark:text-white">{formattedDate}</span>
        </p>
      </div>

      {/* Metrics Section */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {metrics.map((metric: any, index: any) => {
          let grade = "N/A";
          let percentage = 0;
          let gradient = "";
          let parsedValue = null;

          try {
            if (metric.value.startsWith("{") && metric.value.endsWith("}")) {
              parsedValue = JSON.parse(metric.value);
              const totalIssues = parsedValue.total || 0;
              percentage = maxIssues > 0 ? (totalIssues / maxIssues) * 100 : 0;
            } else {
              const value = parseFloat(metric.value) || 0;
              percentage = maxIssues > 0 ? (value / maxIssues) * 100 : 0;
            }

            grade =
              percentage <= 0
                ? "A"
                : percentage <= 20
                  ? "B"
                  : percentage <= 40
                    ? "C"
                    : percentage <= 60
                      ? "D"
                      : percentage <= 80
                        ? "E"
                        : "F";
            gradient =
              percentage > 0
                ? `conic-gradient(lime 0% ${percentage}%, red ${percentage}% 100%)`
                : `conic-gradient(lime ${percentage}% 100%)`;
          } catch (err) {
            console.error("Error parsing JSON for metric:", metric.metric, err);
          }

          const formattedMetric = metric.metric
            .replace(/_/g, " ")
            .toUpperCase();

          if (metric.metric === "ncloc") {
            // don't show card for ncloc
          } else {
            return (
              <div
                key={index}
                className="flex flex-col gap-4 p-4 border border-gray-300 dark:border-primary_color rounded-lg"
              >
                <p className="text-lg font-semibold text-gray-700 dark:text-white">
                  {formattedMetric}
                </p>
                <div className="flex justify-between items-center">
                  <p className="text-base font-medium text-gray-700 dark:text-gray-300">

                    {parsedValue?.total || 0}{" "}
                    {metric.metric === "ncloc"
                      ? "Lines of Code"
                      : "Open Issues"}
                  </p>
                  {
                    <CheckGrade
                      key={index}
                      parsedValue={parsedValue}
                      index={index}
                    />
                  }
                </div>

                {parsedValue ? (
                  <div className="flex justify-between gap-2">
                    <span className="px-3 py-1 bg-red-100 text-red-500 rounded-md text-sm font-medium">
                      {parsedValue.HIGH || 0} H
                    </span>
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-500 rounded-md text-sm font-medium">
                      {parsedValue.MEDIUM || 0} M
                    </span>
                    <span className="px-3 py-1 bg-green-100 text-green-500 rounded-md text-sm font-medium">
                      {parsedValue.LOW || 0} L
                    </span>
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">
                    No additional details available
                  </p>
                )}
              </div>
            );
          }
        })}
      </div>
    </section>
  );
}
