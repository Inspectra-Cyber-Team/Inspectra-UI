import { useGetProjectDetailQuery } from '@/redux/service/overview';
import React from 'react';
import { LuDot } from 'react-icons/lu';
import { SiTicktick } from 'react-icons/si';

type OverviewProps = {
    projectName: string;
};

type MetricType = {
    metric: string;
    value: string;
    bestValue?: boolean;
};

export default function PageOverviewProjectDetail({ projectName }: OverviewProps) {
    const nameOfProject = projectName;

    const { data } = useGetProjectDetailQuery({
        projectName: nameOfProject,
    });

    const metrics = data?.[0]?.component?.measures || [];
    let parsedValue: any = null;

    return (
        <section className="px-4 md:px-8 lg:px-12">
            {/* First Section of Page */}
            <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-text_color_light">
                    <h2 className="text-xl md:text-2xl font-bold">Project Details</h2>
                </div>
                <div>
                    <ul className="flex flex-wrap items-center gap-3 p-3 text-text_color_light">
                        <li className="text-sm md:text-base">13K Lines of Code</li> <LuDot />
                        <li className="text-sm md:text-base">Version not Provided</li> <LuDot />
                        <li>
                            <button className="bg-primary_color text-white px-4 py-2 rounded-full w-full md:w-[100px]">
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
                    <h2 className="bg-primary_color p-3 rounded-md text-white text-xl">
                        <SiTicktick />
                    </h2>
                    <div>
                        <p className="text-xs md:text-sm">Quality Date</p>
                        <p className="font-bold text-base md:text-lg">Passed</p>
                    </div>
                </div>
                <div className="text-sm md:text-base">
                    Last Analysis <b>1 month ago</b>
                </div>
            </div>

            {/* Third Section of Page */}
            <div className="w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5 mb-5">
                    {metrics.map((metric: MetricType, index: number) => {
                        // Dynamically check and parse JSON string in `value`
                        try {
                            if (metric.value.startsWith('{') && metric.value.endsWith('}')) {
                                parsedValue = JSON.parse(metric.value);
                            }
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
                                className="text-text_color_light flex flex-col gap-3 border-r border-primary_color p-3"
                            >
                                {/* Render formatted metric */}
                                <p className="text-sm md:text-base lg:text-lg mb-3 font-bold">{formattedMetric}</p>
                                <div className="text-sm md:text-base flex justify-between items-center mb-3">
                                    {parsedValue ? (
                                        <p className="font-bold">
                                            {parsedValue.total || 0} <span className="font-normal">Total Issues</span>
                                        </p>
                                    ) : (
                                        <p className="font-bold">
                                            {metric.value}{' '}
                                            <span className="font-normal">
                                                {metric.metric === 'ncloc' ? 'Lines of Code' : 'Open Issues'}
                                            </span>
                                        </p>
                                    )}
                                    <p className="w-[36px] h-[36px] text-sm md:text-base flex items-center justify-center border border-primary_color p-2 rounded-md">
                                        A
                                    </p>
                                </div>

                                {/* Render HIGH, MEDIUM, LOW issues */}
                                {parsedValue ? (
                                    <div className="flex space-x-4 justify-between">
                                        <p className="px-4 py-2 bg-gray-100 rounded-md text-sm font-medium shadow-sm">
                                            {parsedValue.HIGH || 0} H
                                        </p>
                                        <p className="px-4 py-2 bg-gray-100 rounded-md text-sm font-medium shadow-sm">
                                            {parsedValue.MEDIUM || 0} M
                                        </p>
                                        <p className="px-4 py-2 bg-gray-100 rounded-md text-sm font-medium shadow-sm">
                                            {parsedValue.LOW || 0} L
                                        </p>
                                    </div>
                                ) : (
                                    <div className="flex space-x-4 justify-between">
                                        <p className="px-4 py-2 bg-gray-100 rounded-md text-sm font-medium shadow-sm">
                                            0 H
                                        </p>
                                        <p className="px-4 py-2 bg-gray-100 rounded-md text-sm font-medium shadow-sm">
                                            0 M
                                        </p>
                                        <p className="px-4 py-2 bg-gray-100 rounded-md text-sm font-medium shadow-sm">
                                            0 L
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
