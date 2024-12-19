import { useGetProjectByUserUuidQuery, useGetProjectDetailQuery } from '@/redux/service/overview';
import { Metadata } from "next";
import React, { useRef } from 'react';
import { LuDot } from 'react-icons/lu';
import { SiTicktick } from 'react-icons/si';
import { FaCodeBranch } from 'react-icons/fa';


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

export default function PageOverviewProjectDetail({ projectName }: OverviewProps) {
    const nameOfProject = projectName;
    const uuidOfUser = typeof window !== "undefined" ? localStorage.getItem("userUUID") : null;

    const { data } = useGetProjectDetailQuery({
        projectName: nameOfProject,
    });


    const metrics = data?.[0]?.component?.measures || [];

    const ncLock = data?.[0]?.component?.measures?.find((metric: any) => metric.metric === 'ncloc')?.value || 0;

    const contentRef = useRef<HTMLDivElement>(null);

    // handleExportPDF function
    const handleExportPDF = async (projectName:string) => {
        const endpoint = `http://136.228.158.126:4011/api/v1/pdf/${projectName}`;
        const response = await fetch(endpoint);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');

        // Set download attributes
        link.href = url;
        link.download = `${projectName}.pdf`; // Set the filename as `pName.pdf`
        document.body.appendChild(link);
        link.click();  // Trigger the download
        document.body.removeChild(link); // Cleanup
    };

    // get project by user uuid
    const { data: projectUuid } = useGetProjectByUserUuidQuery({ uuid: uuidOfUser ?? '' });
    const getProjectByUserUuid = projectUuid?.[0]?.branch?.[0]?.branches?.[0];

    // check data and time
    const formatDate = (dateString: string) => {
        if (!dateString) return ""; 
        // Fix the date format by replacing "+0000" with "Z"
        const fixedDateString = dateString.replace("+0000", "Z");
        const date = new Date(fixedDateString);
        // Get individual parts of the date
        const options: Intl.DateTimeFormatOptions = { month: "long", day: "numeric", year: "numeric" };
        const datePart = new Intl.DateTimeFormat("en-US", options).format(date);
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        return `${datePart} ${hours}:${minutes}`;
    };

    const formattedDate = formatDate(getProjectByUserUuid?.analysisDate);

    // Find the highest total issues dynamically across all metrics
    const maxIssues = metrics.reduce((max: any, metric: any) => {
        try {
            const value = metric.value.startsWith('{') && metric.value.endsWith('}')
                ? JSON.parse(metric.value)?.total || 0
                : parseFloat(metric.value) || 0;
            // console.log("Hel",metric,value)
            return Math.max(max, value);
        } catch (err) {
            console.error(`Error parsing metric: ${metric.metric}`, err);
            return max;
        }
    }, 0); // Default to 0 if no issues found

    return (
        <section className="px-4 md:px-8 lg:px-12 border border-1 border-background_light_mode dark:border-ascend_color  rounded-[20px]" ref={contentRef}>
            {/* First Section of Page */}
            <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4">

                <div className="text-text_color_light flex items-center gap-3">
                    <h2 className=" text-text_color_light dark:text-text_color_dark text-md">
                        <FaCodeBranch />
                    </h2>
                    <div>
                        <p className="text-xs md:text-sm dark:text-white">{getProjectByUserUuid?.name}</p>
                    </div>
                </div>

                <div>
                    <ul className="flex flex-wrap items-center gap-3 p-3 text-text_color_light dark:text-text_color_dark">
                        <li className="text-sm md:text-base ">{ncLock} Lines of Code</li> <LuDot />
                        <li className="text-sm md:text-base">Version not Provided</li> <LuDot />
                        <li >
                            <button className="bg-primary_color text-black px-4 py-2 rounded-full w-full md:w-[100px]" onClick={()=>{
                                handleExportPDF(nameOfProject)
                            }}>
                                Export
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="border-b border-ascend_color mt-3 mb-5"></div>

            {/* Second Section of Page */}
            <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-text_color_light flex items-center gap-3">
                    <h2 className="bg-primary_color p-3 rounded-md text-black
                     text-xl">
                        <SiTicktick />
                    </h2>
                    <div>
                        <p className="text-xs md:text-sm dark:text-white">Quality Gate</p>
                        <p className="font-bold text-base md:text-lg dark:text-white">
                            {getProjectByUserUuid?.status.qualityGateStatus === "OK" ? "Passed" : "Failed"}
                        </p>
                    </div>
                </div>
                <div className="text-sm md:text-base">
                    Last Analysis <b className='text-secondary_color'>{formattedDate}</b>
                </div>
            </div>

            {/* Third Section of Page */}
            <div className="w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5 mb-5">
                    {metrics.map((metric: MetricType, index: number) => {

                        // Dynamically check and parse JSON string in `value`

                        let grade = 'N/A';
                        let percentage = 0;
                        let gradient = '';
                        let parsedValue: any = null;

                        try {

                            if (metric.value.startsWith('{') && metric.value.endsWith('}')) {
                                parsedValue = JSON.parse(metric.value);
                                const totalIssues = parsedValue.total || 0;
                                percentage = maxIssues > 0 ? (totalIssues / maxIssues) * 100 : 0;
                            } else {
                                const value = parseFloat(metric.value) || 0;
                                percentage = maxIssues > 0 ? (value / maxIssues) * 100 : 0;
                            }

                            // Assign grade
                            grade = percentage <= 0 ? "A"
                                : percentage <= 20 ? "B"
                                    : percentage <= 40 ? "C"
                                        : percentage <= 60 ? "D"
                                            : percentage <= 80 ? "E"
                                                : "F";

                            // Assign gradient for visual representation
                            gradient = percentage > 0
                                ? `conic-gradient(lime 0% ${percentage}%, red ${percentage}% 100%)`
                                : `conic-gradient(lime ${percentage}% 100%)`;

                        } catch (err) {
                            console.error('Error parsing JSON for metric:', metric.metric, err);
                        }

                        // Format the metric name
                        const formattedMetric = metric.metric
                            .replace(/_/g, ' ') // Replace underscores with spaces
                            .toUpperCase(); // Convert to uppercase

                        return (
                            <div
                                key={index}
                                className="text-text_color_light flex flex-col gap-3 border-r border-gray-200 p-3 dark:text-white"
                            >
                                {/* Render formatted metric */}
                                <p className="text-sm md:text-base lg:text-lg mb-3 font-bold text-ascend_color">
                                    {formattedMetric}
                                </p>
                                <div className="text-sm md:text-base flex justify-between items-center mb-3">
                                    {parsedValue ? (
                                        <>
                                            <p className="font-bold">
                                                {parsedValue.total || 0} <span className="font-normal">{metric.metric === 'ncloc' ? 'Lines of Code' : 'Open Issues'}</span>
                                            </p>
                                            <p className={`w-[36px] h-[36px] text-sm md:text-base flex items-center justify-center p-2 rounded-md 
                                                ${grade === "A" ? "border-2 border-green-500"
                                                    : grade === "B" ? "border-2 border-green-300"
                                                        : grade === "C" ? "border-2 border-blue-500"
                                                            : grade === "D" ? "border-2 border-yellow-500"
                                                                : grade === "E" ? "border-2 border-red-300"
                                                                    : grade === "F" ? "border-2 border-red-500"
                                                                        : "border-2 border-gray-500"}`}>
                                                {grade}
                                            </p>
                                        </>
                                    ) : (
                                        <>
                                            <p className="font-bold">
                                                {parsedValue?.total || 0} <span className="font-normal">{metric.metric === 'ncloc' ? 'Lines of Code' : 'Open Issues'}</span>
                                            </p>
                                            <div className='text-text_body_16 flex justify-between items-center mb-3'>
                                                <div className="relative w-12 h-12">
                                                    <div
                                                        className="absolute w-full h-full rounded-full bg-transparent"
                                                        style={{ background: gradient }}>
                                                    </div>
                                                    <div className="absolute w-1/2 h-1/2  bg-white dark:bg-black dark:opacity-80 rounded-full top-3 left-3">
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>

                                {/* Render HIGH, MEDIUM, LOW issues */}
                                {parsedValue ? (
                                    <div className="flex space-x-4 justify-between">
                                        <p className="px-4 py-2 bg-gray-100 rounded-md text-sm font-medium shadow-sm text-red-500 dark:bg-transparent">
                                            {parsedValue.HIGH || 0} H
                                        </p>
                                        <p className="px-4 py-2 bg-gray-100 text-yellow-500 rounded-md text-sm font-medium shadow-sm dark:bg-transparent">
                                            {parsedValue.MEDIUM || 0} M
                                        </p>
                                        <p className="px-4 py-2 bg-gray-100 dark:bg-transparent
                                         text-green-500 rounded-md text-sm font-medium shadow-sm">
                                            {parsedValue.LOW || 0} L
                                        </p>
                                    </div>
                                ) : (
                                    <div className="flex space-x-4 justify-between">
                                        <p className="px-3 py-2 rounded-md shadow-sm">
                                            {metric.bestValue === true ? (
                                                <span className="text-green-500 font-bold">Best Value</span>
                                            ) : (
                                                <span className="text-red-500 font-medium">No Best Value</span>
                                            )}
                                        </p>
                                    </div>
                                )}
                                <div className="border-b border-gray-200 mt-3"></div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

