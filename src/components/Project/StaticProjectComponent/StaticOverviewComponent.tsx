import { StaticOverviewData } from '@/data/StaticOverview';
import { StaticOverview } from '@/types/StaticOverview';
import React from 'react'
import { useState } from 'react';
import { FaCodeBranch } from "react-icons/fa";
import { SiTicktick } from "react-icons/si";
import { BsPatchQuestionFill } from "react-icons/bs";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export default function StaticOverviewComponent() {

  const [isloading, setIsLoading] = useState(false);

  const handleExportPDF = () => {
    setIsLoading(true); // Set loading state before fetch starts
  
    // Define the static PDF file URL
    const fileUrl = '/static/NextJS.pdf';
  
    // Fetch the file as a blob
    fetch(fileUrl)
      .then((response) => response.blob())
      .then((blob) => {
        // Create a URL for the blob
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        
        // Set download attributes
        link.href = url;
        link.download = 'NextJS.pdf'; // You can change the filename if needed
        document.body.appendChild(link);
        link.click(); // Trigger the download
        document.body.removeChild(link); // Cleanup
  
        setIsLoading(false); // Set loading to false after the download starts
      })
      .catch((error) => {
        console.error('Error downloading the file:', error);
        setIsLoading(false);
      });
  };

  return (
    <>
      <section
        className="px-6 md:px-10 lg:px-14 border border-gray-300 dark:border-gray-700 rounded-xl pb-12"
      >
        {/* Header Section */}
        <div className="w-full flex flex-col gap-4 sm:gap-6 sm:flex-row sm:justify-between sm:items-center py-4">
          <div className="text-gray-800 dark:text-gray-200 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <FaCodeBranch className="text-2xl text-gray-600 dark:text-gray-400" />
              <p className="text-base sm:text-lg font-medium">
                main
              </p>
            </div>
          </div>

          {/* Info Section */}
          <div>
            <ul className="flex flex-wrap items-center gap-4 text-sm sm:text-base text-gray-600 dark:text-gray-400">
              <li>1817 Lines of Code</li>
              <li>Version not Provided</li>
              <li>
                <button
                  className="bg-primary_color text-text_color_light px-4 py-2 rounded-md hover:bg-green-600 transition-all flex justify-center items-center"
                  onClick={handleExportPDF}
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
              className={`p-4 rounded-lg text-text_color_light text-xl bg-primary_color`}
            >
              <SiTicktick />
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
                Passed
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Last Analysis: 
            <span className="text-gray-800 dark:text-white"> January 6, 2025 09:40</span>
          </p>
        </div>

        {/* Metrics Section */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {StaticOverviewData.map((data: StaticOverview, index: number) => {

            return (
              <div
                key={index}
                className="flex flex-col gap-4 p-4 border border-gray-300 dark:border-primary_color rounded-lg"
              >
                <p className="text-lg font-semibold text-gray-700 dark:text-white">
                  {data.name}
                </p>
                <div className="flex justify-between items-center">
                  <p className="text-base font-medium text-gray-700 dark:text-gray-300">
                    {data.issue}
                  </p>
                  <div
                    className={`w-10 h-10 flex items-center justify-center border rounded-lg text-text_color_light dark:text-text_color_dark font-bold`}
                    style={{ borderColor: data.border.replace(/[\[\]]/g, "") }}
                  >
                    {data.grade}
                  </div>
                </div>
                <div className="flex justify-between gap-2">
                  {data.level ? (
                    data.level.map((lvl, idx) => (
                      <span
                        key={idx}
                        className={`px-3 py-1 ${lvl.background} ${lvl.color} rounded-md text-sm font-medium`}
                      >
                        {lvl.total}
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">{data.description}</p>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      </section>
    </>
  )
}
