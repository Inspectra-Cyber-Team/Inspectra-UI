"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { FaGithub, FaGitlab } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { ArrowLeft } from 'lucide-react'
import Image from 'next/image';
import { useCreateProjectScanNonUserMutation } from "@/redux/service/project";
import { GitUrlType } from "@/data/GitUrl";
import { toast } from "../hooks/use-toast";
import { ScanStepsModal } from "@/components/NoneUserScanProject/ModalCondition";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import FileStructureViewer from "@/components/FileStructureComponent/FileStructureViewer";
import Link from "next/link";

export default function NoneUserScan() {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showTerms, setShowTerms] = useState(true);
  const [selectedFile, setSelectedFile] = useState<string[]>([]);
  const [listDirectories, setListDirectories] = useState<any>();
  const { theme } = useTheme();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [countScan, setCountScan] = useState(0);
  const [projectScanNonUser] = useCreateProjectScanNonUserMutation();
  const [gitUrlResult, setGitUrl] = useState<string>("");
  const [gitResult, setGitResult] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("Select Project Branch");
  const [selectedCheckbox, setSelectedCheckBox] = useState<string[]>([]);

  useEffect(() => {
    const storedCount =
      parseInt(localStorage.getItem("scanCount") ?? "0", 10) || 1;
    setCountScan(storedCount);
  }, []);

  const handleOnStart = () => {
    setTermsAccepted(true);
    setShowTerms(false);
    localStorage.setItem("termsAccepted", "true");
  };

  const handleSelectItem = (file: string) => {
    setSelectedFile((prevSelectedFiles) => {
      if (prevSelectedFiles.includes(file)) {
        return prevSelectedFiles.filter((item: string) => item !== file);
      } else {
        return [...prevSelectedFiles, file];
      }
    });
  };

  const handleSubmit = () => {
    if (!gitUrlResult.trim()) {
      setIsLoading(false);
      toast({
        description: "Please enter a Git URL",
        variant: "error",
      });
      return;
    }

    if (selectedBranch === "Select Project Branch") {
      setIsLoading(false);
      toast({
        description: "Please select a branch",
        variant: "error",
      });
      return;
    }

    setIsLoading(true);

    if (countScan < 4) {
      const newCount = countScan + 1;
      setCountScan(newCount);
      localStorage.setItem("scanCount", newCount.toString());

      projectScanNonUser({
        project: {
          gitUrl: gitUrlResult,
          branch: selectedBranch,
          countScan: countScan,
          issueTypes: selectedCheckbox,
          includePaths: selectedFile,
        },
      })
        .then((response) => {
          toast({
            description: "Project Scan is Successfully",
            variant: "success",
          });
          router.push(`project/${response?.data?.data}`);
        })
        .catch((error) => {
          toast({
            description: "Something went wrong. Please try again.",
            variant: "error",
          });
          console.error("Error during project scan:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
      toast({
        description: "You Have Reached Scan Limit. Please Sign In",
        variant: "error",
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (gitUrlResult.includes(".git")) {
        const fetchGitbranch = async () => {
          try {
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}gits/branches?gitUrl=${gitUrlResult}`
            );
            if (!response.ok) {
              throw new Error("Failed to fetch branches");
            }
            const result = await response.json();
            setGitResult(result);
            toast({
              description: "Get All Branches Successfully",
              variant: "success",
            });
          } catch (error) {
            toast({
              description: `Oops! Something went wrong${error}`,
              variant: "error",
            });
          }
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
    setGitUrl(e.target.value);
  };

  const handleCheckboxChange = (id: any, checked: any) => {
    if (checked) {
      setSelectedCheckBox([...selectedCheckbox, id]);
    } else {
      setSelectedCheckBox(selectedCheckbox.filter((item) => item !== id));
    }
  };

  const handleFetchDirectories = async () => {
    if (selectedBranch !== "Select Project Branch" && gitUrlResult) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}gits/list_files?gitUrl=${gitUrlResult}&branch=${selectedBranch}`
      );
      const data = await response.json();
      setListDirectories(data);
    } else {
      console.log("error");
    }
  };

  useEffect(() => {
    if (selectedBranch !== "Select Project Branch" && gitUrlResult) {
      handleFetchDirectories();
    }
  }, [selectedBranch, gitUrlResult]);

  const handleGoHome = () => {
    router.push('/'); // Redirect to the homepage when clicking "Go to Homepage"
  };

 

  return (
    <section className="mx-auto rounded-lg justify-center items-center bg-card_color_light dark:bg-card_color_dark">
        <ScanStepsModal
        isOpen={showTerms}
        onOpenChange={setShowTerms} 
        onStart={handleOnStart}  
          />
      {/* Top section */}
      <div className="flex flex-col items-center justify-center pt-10 ">
        <div className="px-3 w-[300px] md:w-[500px] font-semibold bg-primary_color py-2 rounded-tl-[20px] rounded-br-[20px]">
          <p className="text-center text-text_color_light text-text_body_16 md:text-text_title_24">
            Scan Your Project Repositories
          </p>
        </div>
        <p className="mt-2 text-center px-2 text-text_body_16 text-text_color_desc_light dark:text-text_color_desc_dark">
          Connect your Git repository and select a branch to start scanning.
        </p>
      </div>

      {/* Main content */}
      <div className="flex lg:justify-between xl:justify-around">
        {/* image */}
        <div className="hidden lg:flex justify-center items-center">
          {theme == "dark" ? (
            <img
              src="/images/scan-anonymouse-user.png"
              className="h-[450px]"
              alt="scan image"
            />
          ) : (
            <img
              src="/images/scan.png"
              className="h-[450px]"
              alt="scan image"
            />
          )}
        </div>

        {/* scanning project */}
        <div className="h-full lg:w-[50%] p-10 rounded-[20px] flex text-start flex-col justify-between">
          {isLoading ? (
            <video
              src="/images/loadingScan.mp4"
              autoPlay
              className="w-full h-full"
              loop
            ></video>
          ) : (
            <div className="space-y-6">
              <div className="space-y-6">
                {/* git url */}
                <div className="space-y-2">
                  <p className="text-text_body_16">Git Url</p>

                  <div className="relative">
                    <div className="inset-y-0 left-3 flex items-center gap-2">
                      <FaGithub className="absolute top-1/2 left-3 text-text_title_24 transform -translate-y-1/2 text-text_color_desc_light" />
                      <p className="absolute top-1/2 left-10 font-light text-text_color_desc_light text-text_title_24 transform -translate-y-1/2">
                        |
                      </p>
                      <FaGitlab className="absolute top-1/2 left-[50px] text-text_title_20 transform -translate-y-1/2 text-text_color_desc_light" />
                      <input
                        type="text"
                        placeholder="Enter Git URL"
                        value={gitUrlResult}
                        onChange={handleChange}
                        onKeyDown={handleKeyPress}
                        className="my-1 w-full rounded-md pl-20 pr-3 py-3 border focus:outline-ascend_color "
                      />
                    </div>
                  </div>
                </div>

                {/* select branch */}
                <DropdownMenu>
                  {gitResult.length != 0 ? (
                    <DropdownMenuTrigger asChild>
                      <div className="space-y-2">
                        <p className="text-text_body_16">Branch</p>

                        <div className="flex px-5 justify-between items-center rounded-md border focus:outline-ascend_color bg-card_color_light dark:bg-[#121212]">
                          <p className="py-3 text-base text-text_color_desc_light dark:text-text_color_desc_dark">
                            {selectedBranch}
                          </p>

                          <IoIosArrowDown className="text-text_color_light dark:text-text_color_desc_dark h-5 w-5  " />
                        </div>
                      </div>
                    </DropdownMenuTrigger>
                  ) : (
                    <DropdownMenuTrigger disabled asChild>
                      <div className="space-y-2">
                        <p className="text-text_body_16 ">Branch</p>

                        <div className="flex px-5 justify-between items-center rounded-md border focus:outline-ascend_color bg-card_color_light dark:bg-[#121212]">
                          <p className="py-3 text-base text-text_color_desc_light dark:text-text_color_desc_dark">
                            {selectedBranch}
                          </p>

                          <IoIosArrowDown className="text-text_color_light dark:text-text_color_desc_dark h-5 w-5  " />
                        </div>
                      </div>
                    </DropdownMenuTrigger>
                  )}
                  <DropdownMenuContent className="w-[285px] md:w-[400px] lg:w-[370px] xl:w-[600px] rounded-md border text-base bg-card_color_light dark:bg-black p-1">
                    {gitResult?.length === 0 ? (
                      <DropdownMenuItem disabled>
                        No branch to select
                      </DropdownMenuItem>
                    ) : (
                      gitResult?.map((gitResult: GitUrlType, index: number) => (
                        <DropdownMenuItem
                          className="text-base hover:bg-background_light_mode dark:hover:bg-background_dark_mode"
                          key={index}
                          onClick={() =>
                            setSelectedBranch(`${gitResult?.name}`)
                          }
                        >
                          {gitResult?.name}
                        </DropdownMenuItem>
                      ))
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* file and directory */}
                <div className="space-y-2">
                  <p className=" text-text_body_16 text-text_color_light dark:text-text_color_dark">
                    Filter Scan By Files & Directory{" "}
                  </p>
                  <FileStructureViewer
                    data={listDirectories}
                    selectedItem={selectedFile[0] || null}
                    onSelectItem={handleSelectItem}
                  />
                </div>

                {/* filter scan */}
                <div className="space-y-2">
                  <div className="text-text_body_16 text-text_color_light dark:text-text_color_dark  ">
                    <p className="my-5">Filter Scan</p>
                    <div className="flex items-center space-x-2 my-5">
                      <Checkbox
                        id="bug"
                        onCheckedChange={(checked) =>
                          handleCheckboxChange("bug", checked)
                        }
                        className="h-5 w-5 "
                      />
                      <label
                        htmlFor="bug"
                        className="text-text_body_16 font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Bug
                      </label>
                    </div>
                    <div className="flex items-center space-x-2  my-5">
                      <Checkbox
                        id="Vulnerability"
                        onCheckedChange={(checked) =>
                          handleCheckboxChange("Vulnerability", checked)
                        }
                        className="h-5 w-5"
                      />
                      <label
                        htmlFor="Vulnerability"
                        className="text-text_body_16 font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Vulnerability
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="Code Smell"
                        onCheckedChange={(checked) =>
                          handleCheckboxChange("code_smell", checked)
                        }
                        className="h-5 w-5"
                      />
                      <label
                        htmlFor="Code Smell"
                        className="text-text_body_16  font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Code Smell
                      </label>
                    </div>
                  </div>
                </div>

                {/* submit scan */}
                <button
                  onClick={() => handleSubmit()}
                  className="w-full mt-10 py-3 bg-primary_color text-text_color_light font-normal flex justify-center rounded-md"
                >
                  Start Scan
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
