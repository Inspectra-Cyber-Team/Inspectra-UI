"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";

import { useGetProjectOverViewUserQuery } from "@/redux/service/project";

import ProjectScanSkeleton from "@/components/ProjectSkeleton/ProjectScanSkeleton";
import StaticProjectCardComponent from "../StaticProjectComponent/StaticProjectCardComponent";

import LoadProjectComponent from "../LoadingProjectComponent/LoadProjectComponent";
import ProjectCardWithData from "./ProjectCardWithData";
import ProjectCardWithNoData from "./ProjectCardWithNoData";
export default function ProjectCardComponent() {
  const [userUUID, setUserUUID] = useState("");

  useEffect(() => {
    setUserUUID(localStorage.getItem("userUUID") || "");
  });

  const {
    data: projectResultApi,
    isError,
    isFetching: isFetchDataProjectScan,
  } = useGetProjectOverViewUserQuery({ uuid: userUUID, page: 0, size: 100 });

  // for search
  const [filteredResults, setFilteredResults] = useState<any[]>(
    projectResultApi || []
  );

  const [inputValue, setInputValue] = useState("");

  // sort
  const [selectedValue, setSelectedValue] = useState("Name"); // Default value

  const handleChange = (value: string) => {
    setSelectedValue(value);
  };

  // Handle user input change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);

    if (value === "") {
      // If the input is empty, reset the filtered results
      setFilteredResults([]);
    } else {
      // Filter the results based on the input value
      const matchingResults = projectResultApi?.filter((item: any) =>
        item.component.component.name
          .toLowerCase()
          .includes(value.toLowerCase())
      );
      setFilteredResults(matchingResults);
    }
  };
 
  return (
    <div>
      {/* search and sort */}
      <div className="flex flex-col md:flex-row justify-between gap-5 pb-5">
        <div className="bg-background_light_mode dark:bg-card_color_dark text-text_color_desc_light dark:text-text_color_desc_dark flex items-center gap-3 px-5 py-3 rounded-xl">
          <IoSearchSharp />
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Search for anything..."
            className="bg-transparent outline-none w-full text-sm placeholder:text-text_color_desc_light dark:placeholder:text-text_color_desc_dark"
          />
        </div>

        <div className="flex gap-5 items-center">
          <p>Sort By</p>
          <Select value={selectedValue} onValueChange={handleChange}>
            <SelectTrigger className="w-[180px] bg-background_light_mode dark:bg-card_color_dark border-none">
              <SelectValue placeholder="Name" />
            </SelectTrigger>
            <SelectContent className=" bg-background_light_mode dark:bg-background_dark_mode">
              <SelectItem value="Name">Name</SelectItem>
              <SelectItem value="dark">Last analysis date</SelectItem>
              <SelectItem value="system">Creation date</SelectItem>
              <SelectItem value="reliability">Reliability</SelectItem>
              <SelectItem value="security_hotspots">Hotspots</SelectItem>
              <SelectItem value="security review">Security review</SelectItem>
              <SelectItem value="maintainability">Maintainability</SelectItem>
              <SelectItem value="coverage">Coverage</SelectItem>
              <SelectItem value="duplications">Duplications</SelectItem>
              <SelectItem value="size">Size</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {/* Static card visible only for specific UUID */}
      {userUUID === process.env.NEXT_PUBLIC_USER_UUID && (
        <StaticProjectCardComponent />
      )}
      {isError && userUUID !== process.env.NEXT_PUBLIC_USER_UUID ? (
        // no project, show waiting image
        <LoadProjectComponent
          textDisplay={"Once you analyze projects, they will show up here."}
        />
      ) : isFetchDataProjectScan ? (
        // while fetching data
        <ProjectScanSkeleton />
      ) : null}
      {filteredResults.length === 0 ? (
        <>
          {projectResultApi?.map((projectResult: any, index: number) => {
            // check project that already scanned
            if (projectResult?.component.component.measures.length > 0) {
              return (
                <ProjectCardWithData
                  key={index}
                  index={index}
                  projectResult={projectResult}
                />
              );
            } else {
              // return project not yet scanned
              return (
                <ProjectCardWithNoData
                  key={index}
                  index={index}
                  projectResult={projectResult}
                />
              );
            }
          })}
        </>
      ) : (
        <>
          {filteredResults.map((filterResult: any, index: number) => {
            // check project that already scanned
            if (filterResult?.component.component.measures.length > 0) {
              return (
                <ProjectCardWithData
                  key={index}
                  index={index}
                  projectResult={filterResult}
                />
              );
            } else {
              // return project not yet scanned
              return (
                <ProjectCardWithNoData
                  key={index}
                  index={index}
                  projectResult={filterResult}
                />
              );
            }
          })}
        </>
      )}
    </div>
  );
}
