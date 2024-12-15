import { useGetProjectDetailQuery, useGetQualityGateQuery } from '@/redux/service/overview';
import { Metadata } from "next";
import React, { useRef } from 'react';
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { LuDot } from 'react-icons/lu';
import { SiTicktick } from 'react-icons/si';
import { format, max } from 'date-fns';

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

    const { data } = useGetProjectDetailQuery({
        projectName: nameOfProject,
    });
    const metrics = data?.[0]?.component?.measures || [];

    const contentRef = useRef<HTMLDivElement>(null);

    // handleExportPDF function
    const handleExportPDF = async () => {
        if (contentRef.current) {
            // Capture the content as a canvas
            const canvas = await html2canvas(contentRef.current, {
                scale: 2, // Higher quality
                useCORS: true, // Handles cross-origin images
            });

            // Convert canvas to an image
            const imgData = canvas.toDataURL("image/jpeg", 1.0);

            // Create a PDF
            const pdf = new jsPDF("portrait", "pt", "a4");
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
            pdf.save("ProjectOverview.pdf");
        }
    };

    const { data: qualitiesGate } = useGetQualityGateQuery({
        projectName: nameOfProject,
    })

    const qualitiesGateData = qualitiesGate?.data?.projectStatus;
    const date = new Date();
    const formattedDate = format(date, 'MMMM do, yyyy');

    // Find the highest total issues dynamically across all metrics
    const maxIssues = metrics.reduce((max:any, metric:any) => {
        try {
            const value = metric.value.startsWith('{') && metric.value.endsWith('}')
                ? JSON.parse(metric.value)?.total || 0
                : parseFloat(metric.value) || 0;
                console.log("Hel",metric,value)
            return Math.max(max, value);
        } catch (err) {
            console.error(`Error parsing metric: ${metric.metric}`, err);
            return max;
        }
    }, 0); // Default to 0 if no issues found

    return (
        <section className="px-4 md:px-8 lg:px-12" ref={contentRef}>
            {/* First Section of Page */}
            <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-text_color_light">
                    <h2 className="text-xl md:text-2xl font-bold">Project Details</h2>
                </div>
                <div>
                    <ul className="flex flex-wrap items-center gap-3 p-3 text-text_color_light">
                        <li className="text-sm md:text-base">13K Lines of Code</li> <LuDot />
                        <li className="text-sm md:text-base">Version not Provided</li> <LuDot />
                        <li >
                            <button className="bg-primary_color text-black px-4 py-2 rounded-full w-full md:w-[100px]" onClick={handleExportPDF}>
                                Export
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="border-b border-primary_color mt-3 mb-5"></div>

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
                            {qualitiesGateData?.status === "OK" ? "Passed" : "Failed"}
                        </p>
                    </div>
                </div>
                <div className="text-sm md:text-base">
                    Last Analysis <b className='text-secondary_color'>{qualitiesGateData?.timestamp || formattedDate}</b>
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

                            if (metric.value.startsWith('{') && metric.value.endsWith('}') ) {
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
                                className="text-text_color_light flex flex-col gap-3 border-r border-primary_color p-3 dark:text-white"
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
                                                    <div className="absolute w-1/2 h-1/2 bg-white dark:bg-current rounded-full top-3 left-3">
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>

                                {/* Render HIGH, MEDIUM, LOW issues */}
                                {parsedValue ? (
                                    <div className="flex space-x-4 justify-between">
                                        <p className="px-4 py-2 bg-red-400 text-white rounded-md text-sm font-medium shadow-sm">
                                            {parsedValue.HIGH || 0} H
                                        </p>
                                        <p className="px-4 py-2 bg-yellow-300 text-white rounded-md text-sm font-medium shadow-sm ">
                                            {parsedValue.MEDIUM || 0} M
                                        </p>
                                        <p className="px-4 py-2 bg-green-500 text-white rounded-md text-sm font-medium shadow-sm">
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
                                <div className="border-b border-primary_color mt-3"></div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
// Remove the incorrect function definition

