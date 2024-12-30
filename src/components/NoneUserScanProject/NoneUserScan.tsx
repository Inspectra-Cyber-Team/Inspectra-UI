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
import { useTheme } from "next-themes";
import { Checkbox } from "../ui/checkbox";
import FileStructureViewer from "../FileStructureComponent/FileStructureViewer";
export default function NoneUserScan() {
  const [selectedFile, setSelectedFile] = useState<string[]>([]);
  const [listDirectories, setListDirectories] = useState<any>();
  const [errorMessage, setErrorMessage] = useState("");
  const [errorNotSelectBranch, setErrorNotSelectBranch] = useState("");
  // handle add file to array
  const handleSelectItem = (file: string) => {
    setSelectedFile((prevSelectedFiles) => {
      if (prevSelectedFiles.includes(file)) {
        // If the file is already selected, remove it
        return prevSelectedFiles.filter((item: string) => item !== file);
      } else {
        // Otherwise, add the file
        return [...prevSelectedFiles, file];
      }
    });
  };

  const { theme } = useTheme();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [countScan, setCountScan] = useState(0);
  const [projectScanNonUser] = useCreateProjectScanNonUserMutation();

  const handleSubmit = () => {
    // Check if the Git URL is empty
    if (!gitUrlResult.trim()) {
      setIsLoading(false);
      setErrorMessage("Please enter a Git URL");
      return; // Stop further execution
    } else {
      setErrorMessage(""); // Clear the error message if the input is valid
    }

    // Check if a branch is selected
    if (selectedBranch === "Select Project Branch") {
      setIsLoading(false);
      setErrorNotSelectBranch("Please select a branch");
      return; // Stop further execution
    } else {
      setErrorMessage("");
    }

    // Proceed with scanning
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
          setIsLoading(false); // Stop loading after operation completes
        });
    } else {
      setIsLoading(false);
      toast({
        description: "You Have Reached Scan Limit. Please Sign In",
        variant: "error",
      });
    }
  };

  useEffect(() => {
    const storedCount =
      parseInt(localStorage.getItem("scanCount") ?? "0", 10) || 1;
    setCountScan(storedCount);
  }, []);

  const [gitUrlResult, setGitUrl] = useState<string>(""); // Store the input value
  const [gitResult, setGitResult] = useState([]); // result get from git url
  const [selectedBranch, setSelectedBranch] = useState("Select Project Branch");
  const [isFetchFilesLoading, setIsFetchFilesLoading] = useState(false);
  // handle for git input from user and fetch api
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    setGitUrl(inputValue); // Update the state with the input value

    // Validate the input value
    if (inputValue.includes(".git")) {
      // Clear any error messages
      setErrorMessage("");

      // Trigger the fetch logic
      const fetchGitBranches = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}gits/branches?gitUrl=${inputValue}`
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
            description: `Oops! Something went wrong: ${
              (error as Error).message
            }`,
            variant: "error",
          });
        }
      };

      fetchGitBranches();
    } else {
      // Set an error message if the input is invalid
      setErrorMessage("Please Provide a Valid Git URL");
    }
  };

  const [selectedCheckbox, setSelectedCheckBox] = useState<string[]>([]);

  const handleCheckboxChange = (id: any, checked: any) => {
    if (checked) {
      setSelectedCheckBox([...selectedCheckbox, id]);
    } else {
      setSelectedCheckBox(selectedCheckbox.filter((item) => item !== id));
    }
  };

  //handle on get all Directories from user after git url and selecet branch
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
  return (
    <section className="flex mx-auto justify-center lg:justify-between xl:justify-around">
      {/* image */}
      <div className=" hidden lg:flex justify-center items-center">
        {theme == "dark" ? (
          <img
            src="/images/scan-anonymouse-user.png"
            className="h-[400px]"
            alt="scan image"
          />
        ) : (
          <img src="/images/scan.png" className="h-[400px]" alt="scan image" />
        )}
      </div>

      {/* scaning project */}
      <div className="h-full   lg:w-[50%] p-10 rounded-[20px] bg-card_color_light dark:bg-card_color_dark  flex text-start flex-col justify-between">
        {isLoading ? (
          <video
            src="/images/loadingScan.mp4"
            autoPlay
            className="w-full h-full"
            loop
          ></video>
        ) : (
          <div>
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
                className={`mt-1 w-full rounded-md border bg-card_color_light dark:bg-card_color_light dark:text-text_color_light pl-[80px] pr-3 py-3 focus:outline-none ${
                  errorMessage ? "border-custom_red" : "border-ascend_color"
                }`}
              />
            </div>
            {errorMessage && (
              <p className="mt-1 text-text_body_16 text-custom_red">
                {errorMessage}
              </p>
            )}
            {/* select branch */}
            <DropdownMenu>
              {gitResult.length != 0 ? (
                <DropdownMenuTrigger asChild>
                  <div className="">
                    <p className="text-text_body_16 text-text_color_light my-2">
                      Branch
                    </p>
                    <div
                      className={`flex px-5 justify-between items-center rounded-[10px] border border-1 bg-text_color_dark ${
                        errorNotSelectBranch
                          ? "border-custom_red"
                          : "border-ascend_color"
                      }`}
                    >
                      <p className="text-text_body_16  py-3  text-text_color_desc_light">
                        {selectedBranch}
                      </p>
                      <IoIosArrowDown className="text-text_color_light h-5 w-5  " />
                    </div>
                    {errorNotSelectBranch && (
                      <p className="mt-1 text-text_body_16 text-custom_red">
                        {errorNotSelectBranch}
                      </p>
                    )}
                  </div>
                </DropdownMenuTrigger>
              ) : (
                <DropdownMenuTrigger disabled asChild>
                  <div className="">
                    <p className="text-text_body_16 text-text_color_light dark:text-text_color_dark my-2">
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
              <DropdownMenuContent className=" w-[29  0px] md:w-[450px] lg:w-[380px] xl:w-[610px] text-text_color_light text-start bg-background_light_mode border-ascend_color">
                {gitResult?.length === 0 ? (
                  <DropdownMenuItem disabled>
                    No branch to select
                  </DropdownMenuItem>
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
            {/* file and directory */}
            <div>
              <p className="mt-5 text-text_body_16 text-text_color_light dark:text-text_color_dark">
                Filter Scan By Files & Directory{" "}
              </p>
              <FileStructureViewer
                data={listDirectories}
                selectedItem={selectedFile[0] || null}
                onSelectItem={handleSelectItem}
                isFetchLoading={isFetchFilesLoading}
              />
            </div>
            {/* filter scan */}
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
            {/* submit scan */}
            <button
              //disabled={isLoading}
              onClick={() => handleSubmit()}
              className="w-full mt-10 py-3 bg-primary_color text-text_color_light font-normal flex justify-center rounded-[10px]"
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
