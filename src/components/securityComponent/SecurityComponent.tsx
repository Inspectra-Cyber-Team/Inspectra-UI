"use client";

import { useEffect, useState } from "react";
import { useGetSecurityHotspotQuery } from "@/redux/service/security-hotspot";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useGetRulesByRuleNameQuery } from "@/redux/service/rule";
import RiskComponent from "./RiskComponent";
import { Hotspot } from "@/types/SecurityHostspot";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ExportButton from "../ExportComponent/ExportComponent";

type SecurityComponentProps = {
  projectName: string;
};

export const SecurityComponent = ({ projectName }: SecurityComponentProps) => {
  const router = useRouter();
  // calling security hotspot query
  const {
    data: securityHotspotData,
    error: securityHotspotError,
    isLoading: securityHotspotIsLoading,
  } = useGetSecurityHotspotQuery({ projectName });

  const handleExportPDF = async (projectName: string) => {
    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}pdf/${projectName}`;
    const response = await fetch(endpoint);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `${projectName}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const [roleName, setRoleName] = useState<string>("");
  const [key, setKey] = useState<string>("");

  const [componentFile, setComponentFile] = useState<string>("");
  //  hanle set line number for show issue message in compoent
  const [startLineNumber, setStartLineNumber] = useState<number>(0);

  //calling rule query
  const {
    data: ruleData,
    error: ruleError,
    isLoading: ruleIsLoading,
  } = useGetRulesByRuleNameQuery({ ruleName: roleName });

  const [selectedTab, setSelectedTab] = useState("Where is the risk?");

  // Automatically select the first hotspot once data is loaded
  useEffect(() => {
    if (securityHotspotData && securityHotspotData?.[0]?.hotspots?.length > 0) {
      setSelectedHotspot(securityHotspotData?.[0]?.hotspots[0]); // Select the first hotspot
      const firstHotspot = securityHotspotData?.[0]?.hotspots[0];
      if (firstHotspot) {
        setRoleName(firstHotspot?.ruleKey);
        setKey(firstHotspot?.key);
        setStartLineNumber(firstHotspot?.textRange?.startLine);
        setComponentFile(firstHotspot?.component);
      }
    }
  }, [securityHotspotData]);

  const handleTabChange = (tabName: any) => {
    setSelectedTab(tabName);
  };

  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);

  if (securityHotspotIsLoading) {
    return <p>Loading...</p>;
  }

  if (securityHotspotError) {
    return <p>Error loading security hotspots.</p>;
  }

  const hotspots = securityHotspotData?.[0]?.hotspots || [];

  const groupHotspotsByProbability = (hotspots: any[]) => {
    return hotspots.reduce((acc, hotspot) => {
      const { vulnerabilityProbability } = hotspot;
      if (!acc[vulnerabilityProbability]) {
        acc[vulnerabilityProbability] = [];
      }
      acc[vulnerabilityProbability].push(hotspot);
      return acc;
    }, {} as Record<string, any[]>);
  };

  const groupedData = groupHotspotsByProbability(hotspots);

  if (hotspots.length === 0) {
    return (
      <section className="grid place-content-center ">
        <Image
          src="/images/NoIssue.png"
          alt="No Issue"
          width={400}
          height={400}
        />
      </section>
    );
  }

  // Define color classes based on the probability
  const getColorClass = (probability: string) => {
    switch (probability) {
      case "LOW":
        return "bg-green-200 px-2 text-[15px] rounded-md text-green-800"; // Green for LOW
      case "MEDIUM":
        return "bg-yellow-200 px-3 text-[15px] rounded-md  text-yellow-800"; // Yellow for MEDIUM
      case "HIGH":
        return " bg-red-200 px-3 text-[15px]  text-red-800"; // Red for HIGH
      default:
        return "";
    }
  };

  return (
    <section className=" sm:flex gap-10  p-4 rounded-sm h-screen overflow-y-auto scrollbar-hide">
      <ExportButton onClick={() => handleExportPDF(projectName)} />
      {/* Sidebar with grouped data */}
      <section className="w-full sm:w-1/2 shadow-sm p-4">
        <div className="mb-4">
          <p className="font-semibold">
            Total Security Hotspots:{" "}
            <span className="text-red-500">
              {securityHotspotData?.[0]?.paging?.total || 0}
            </span>
          </p>
        </div>

        <Accordion
          defaultValue={Object.keys(groupedData)}
          type="multiple"
          className="w-full"
        >
          {Object.entries(groupedData).map(([probability, items]: any) => (
            <AccordionItem key={probability} value={probability}>
              <AccordionTrigger>
                <span className="text-black dark:text-text_color_desc_dark">
                  Review Priority:{" "}
                  <span className={`${getColorClass(probability)}`}>
                    {probability}
                  </span>
                </span>
              </AccordionTrigger>
              <AccordionContent>
                {items.map((item: any) => (
                  <button
                    className="p-2 cursor-pointer rounded-md hover:bg-gray-100 dark:hover:bg-card_color_dark text-left w-full"
                    key={item.key}
                    onClick={() => {
                      setSelectedHotspot(item);
                      setRoleName(item?.ruleKey);
                      setKey(item?.key);
                      setStartLineNumber(item?.textRange?.startLine);
                      setComponentFile(item?.component);
                    }}
                  >
                    {item?.message}
                  </button>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Details section */}
      <section className="w-full shadow-sm p-4">
        {selectedHotspot ? (
          <section>
            <div className="">
              <p className="font-bold mb-5 ">{selectedHotspot.message}</p>
              <p className="mb-2">
                {ruleData?.[0]?.name}{" "}
                <button
                  onClick={() => router.push(`/rule/${roleName}`)}
                  className="font-bold cursor-pointer hover:text-primary_color"
                >
                  {" "}
                  {roleName}
                </button>
              </p>
              <div className="flex gap-4">
                <p className="mb-1">
                  <strong>Category:</strong> {selectedHotspot?.securityCategory}
                </p>
                <p className="mb-2">
                  <strong>Review priority:</strong>{" "}
                  {selectedHotspot?.vulnerabilityProbability}
                </p>
              </div>
            </div>

            {/* tab section  */}
            <div>
              {/* Mobile View */}
              <div className="sm:hidden">
                <label htmlFor="Tab" className="sr-only">
                  Tab
                </label>
                <select
                  id="Tab"
                  className="w-full rounded-md border-gray-200]"
                  value={selectedTab}
                  onChange={(e) => handleTabChange(e.target.value)}
                >
                  <option value="Where is the risk?">Where is the risk?</option>
                  <option value="What is the risk?">What is the risk?</option>
                  <option value="Access the risk">Access the risk</option>
                  <option value="How I can fix it?">How I can fix it?</option>
                </select>
              </div>

              {/* Desktop View */}
              <div className="hidden sm:block mt-3">
                <div className="border-b border-gray-200">
                  <nav className="-mb-px flex gap-10 " aria-label="Tabs">
                    {[
                      "Where is the risk?",
                      "What is the risk?",
                      "Access the risk",
                      "How I can fix it?",
                    ].map((tab) => (
                      <a
                        key={tab}
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handleTabChange(tab);
                        }}
                        className={`shrink-0 border-b-2 px-1 pb-4 text-sm font-medium ${
                          selectedTab === tab
                            ? "border-primary_color text-black dark:text-white"
                            : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                        }`}
                        aria-current={selectedTab === tab ? "page" : undefined}
                      >
                        {tab}
                      </a>
                    ))}
                  </nav>
                </div>
              </div>

              {/* Render Content Based on Selected Tab */}
            </div>
          </section>
        ) : (
          <div>
            <p className="font-bold text-lg">
              Select a hotspot from the list to see detailed information.
            </p>
          </div>
        )}

        {selectedHotspot && (
          <>
            {ruleIsLoading && <p>Loading...</p>}
            {ruleError && <p>Error loading rule data.</p>}
            {!ruleIsLoading && !ruleError && (
              <RiskComponent
                selectedTab={selectedTab}
                description={ruleData?.[0]?.descriptionSections}
                issueKey={key}
                componentKey={componentFile}
                startLineNumber={startLineNumber}
                message={selectedHotspot?.message}
              />
            )}
          </>
        )}
      </section>
    </section>
  );
};

export default SecurityComponent;
