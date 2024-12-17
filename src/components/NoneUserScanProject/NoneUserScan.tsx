"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GitUrlType } from "@/data/GitUrl";
import { useCreateProjectScanNonUserMutation } from "@/redux/service/project";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaGithub, FaGitlab } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { toast } from "../hooks/use-toast";
export default function NoneUserScan() {
  const router = useRouter();
  const [countScan, setCountScan] = useState(0);
  const [projectScanNonUser] =
    useCreateProjectScanNonUserMutation();

  useEffect(() => {
    const storedCount =
      parseInt(localStorage.getItem("scanCount") ?? "0", 10) || 1;
    setCountScan(storedCount);
  }, []);

  const handleSubmit = () => {
    if (countScan < 4) {
      const newCount = countScan + 1;
      setCountScan(newCount);
      localStorage.setItem("scanCount", newCount.toString());
    } else {
      toast({
        description: "You Have Reach Scan Limit Please Sign In",
        variant: "error",
      });
    }
    projectScanNonUser({
      project: {
        gitUrl: gitUrlResult,
        branch: selectedBranch,
        countScan: countScan,
      },
    }).then((respone) => router.push(`project/${respone?.data?.data}`));
  };

  const [gitUrlResult, setGitUrl] = useState<string>(""); // Store the input value
  const [gitResult, setGitResult] = useState([]); // result get from git url
  const [selectedBranch, setSelectedBranch] = useState("Select Project Branch");
  // handle for git input from user and fetch api
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (gitUrlResult.includes(".git")) {
        const fetchGitbranch = async () => {
          const data = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}gits/branches?gitUrl=${gitUrlResult}`
          );
          if (data.ok) {
            toast({
              description: "Get All Branches Successfully",
              variant: "success",
            });
          }
          const result = await data.json();
          setGitResult(result);
        };
        fetchGitbranch();
      } else {
        toast({
          description: "Invalid URL",
          variant: "error",
        });
      }
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGitUrl(e.target.value); // Update the state with the input value
  };

  return (
    <section className="h-full flex text-start flex-col justify-between">
      <p className="text-center text-text_color_light dark:text-text_color_dark text-text_title_24 mb-5">
        See the Unseen, Secure the Unknown.
      </p>
      {/* git url */}
      <div className="relative">
        <FaGithub className="absolute top-1/2 left-3 text-text_title_24 transform -translate-y-1/2 text-text_color_desc_light" />
        <p className="absolute top-1/2 left-10 font-light text-text_color_desc_light text-text_title_24 transform -translate-y-1/2">
          |
        </p>
        <FaGitlab className="absolute top-1/2 left-[50px] text-text_title_20 transform -translate-y-1/2 text-text_color_desc_light" />
        <input
          type="text"
          placeholder="Enter Git URL"
          value={gitUrlResult}
          onChange={handleChange} // Update the state with the input value
          onKeyDown={handleKeyPress} // Trigger logic on Enter key press
          className="mt-1 w-full rounded-md border bg-text_color_dark dark:text-text_color_light pl-[80px] pr-3 py-3 focus:outline-none  border-ascend_color"
        />
      </div>
      {/* select branch */}
      <DropdownMenu>
        {gitResult.length != 0 ? (
          <DropdownMenuTrigger asChild>
            <div className="">
              <p className="text-text_body_16 text-text_color_light dark:text-text_color_dark my-5">
                Branch
              </p>
              <div className="flex px-5 justify-between items-center rounded-[10px] border border-ascend_color bg-text_color_dark">
                <p className="text-text_body_16  py-3  text-text_color_desc_light">
                  {selectedBranch}
                </p>
                <IoIosArrowDown className="text-text_color_light h-5 w-5  " />
              </div>
            </div>
          </DropdownMenuTrigger>
        ) : (
          <DropdownMenuTrigger disabled asChild>
            <div className="">
              <p className="text-text_body_16 text-text_color_light dark:text-text_color_dark my-5">
                Branch
              </p>
              <div className="flex px-5 justify-between items-center rounded-[10px] border border-ascend_color bg-background_light_mode">
                <p className="text-text_body_16  py-3  text-text_color_desc_light">
                  {selectedBranch}
                </p>
                <IoIosArrowDown className="text-text_color_light h-5 w-5  " />
              </div>
            </div>
          </DropdownMenuTrigger>
        )}
        <DropdownMenuContent className="w-[462px] text-text_color_light text-start bg-background_light_mode border-ascend_color">
          {gitResult?.length === 0 ? (
            <DropdownMenuItem disabled>No branch to select</DropdownMenuItem>
          ) : (
            gitResult?.map((gitResult: GitUrlType, index: number) => (
              <DropdownMenuItem
                className=""
                key={index}
                onClick={() => setSelectedBranch(`${gitResult?.name}`)}
              >
                {gitResult?.name}
              </DropdownMenuItem>
            ))
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      {/* submit scan */}
      <button
        //disabled={isLoading}
        onClick={() => handleSubmit()}
        className="w-full mt-10 py-3 bg-primary_color text-text_color_light font-normal flex justify-center rounded-[10px]"
      >
        {/* {isLoading ? (
          <div className="spinner-border  animate-spin inline-block w-6 h-6 border-2 rounded-full border-t-2 border-text_color_light border-t-transparent"></div>
        ) : (
          "Submit"
        )} */}
        Submit
      </button>
    </section>
  );
}
