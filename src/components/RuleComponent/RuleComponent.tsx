"use client";

import { useGetRulesByRuleNameQuery } from "@/redux/service/rule";
import React, { useState } from "react";
import RuleDetailComponent from "./RuleDetailComponent";

// Define the props type
type RuleComponentProps = {
  readonly ruleKey: string;
};

export default function RuleComponent({ ruleKey }: RuleComponentProps) {
  const {
    data: ruleData,
    error: ruleError,
    isLoading: ruleIsLoading,
  } = useGetRulesByRuleNameQuery({ ruleName: ruleKey });

  console.log(ruleData);

  // Tab state management
  const [selectedTab, setSelectedTab] = useState("What is the risk?");

  const handleTabChange = (tabName: string) => {
    setSelectedTab(tabName);
  };

  return (
    <section className="bg-[#f5f5f5] border border-1 rounded-md p-6 w-[88%] mx-auto my-6 dark:bg-card_color_dark dark:text-text_color_light">
      {/* Rule Details */}
      <div>
        <p className="font-bold text-2xl text-gray-900 mb-4 dark:text-text_color_dark">
          {ruleData?.[0]?.name || "Rule Details"}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700 mb-4 dark:text-text_color_dark">
          <p>
            <span className="font-semibold">Rule ID:</span>{" "}
            {ruleData?.[0]?.key || "-"}
          </p>
          <p>
            <span className="font-semibold">Analysis Scope:</span>{" "}
            {ruleData?.[0]?.scope || "-"}
          </p>
          <p>
            <span className="font-semibold">Rule Repo:</span>{" "}
            {ruleData?.[0]?.langName || "-"}
          </p>
          <p>
            <span className="font-semibold">Effort:</span>{" "}
            {ruleData?.[0]?.defaultRemFnBaseEffort || "-"}
          </p>
        </div>


        <div className="flex flex-wrap sm:items-center gap-4 text-sm text-gray-700 dark:text-text_color_dark ">
          <p>
            <span className="font-semibold">Type:</span>{" "}
            {ruleData?.[0]?.type || "-"}
          </p>
          <p>
            <span className="font-semibold">Severity:</span>{" "}
            {ruleData?.[0]?.severity || "-"}
          </p>

          <div className="flex items-center">
            <span className="font-semibold mr-2">Tags:</span>
            {ruleData?.[0]?.sysTags?.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {ruleData[0].sysTags.map((tag: any, index: any) => (
                  <span
                    className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-md"
                    key={index}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No tags available</p>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-6">
        {/* Mobile View */}
        <div className="sm:hidden mb-4">
          <select
            id="Tab"
            className="w-full rounded-md border-gray-300 text-sm p-2"
            value={selectedTab}
            onChange={(e) => handleTabChange(e.target.value)}
          >
            <option value="What is the risk?">What is the risk?</option>
            <option value="Access the risk">Access the risk</option>
            <option value="How I can fix it?">How I can fix it?</option>
          </select>
        </div>

        {/* Desktop View */}
        <div className="hidden sm:block border-b border-gray-200">
          <nav className="-mb-px flex  gap-6" aria-label="Tabs">
            {["What is the risk?", "Access the risk", "How I can fix it?"].map(
              (tab) => (
                <a
                  key={tab}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleTabChange(tab);
                  }}
                  className={`border-b-2 px-4 py-2 text-sm font-medium transition ${
                    selectedTab === tab
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  }`}
                  aria-current={selectedTab === tab ? "page" : undefined}
                >
                  {tab}
                </a>
              )
            )}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <section className="">
        {ruleIsLoading && (
          <p className="text-center text-gray-500">Loading...</p>
        )}
        {ruleError && (
          <p className="text-center text-red-500">Error loading rule data.</p>
        )}
        {!ruleIsLoading && !ruleError && ruleData?.length > 0 ? (
          <RuleDetailComponent
            selectedTab={selectedTab}
            description={ruleData[0]?.descriptionSections || []}
          />
        ) : (
          <p className="text-center text-gray-700 font-medium">
            No additional information available.
          </p>
        )}
      </section>
    </section>
  );
}
