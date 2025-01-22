"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { FaGithub, FaGitlab } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
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
import LoadingSection from "./LoadingSection";
import axios, { AxiosError } from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function NoneUserScan() {

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showTerms, setShowTerms] = useState(true);
  const [selectedFile, setSelectedFile] = useState<string[]>([]);
  const [listDirectories, setListDirectories] = useState<any>();
  const { theme } = useTheme();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [countScan, setCountScan] = useState(0);
  const [projectScanNonUser] = useCreateProjectScanNonUserMutation();
  const [gitUrlResult, setGitUrl] = useState<string>("");
  const [gitResult, setGitResult] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("Select Project Branch");
  const [selectedCheckbox, setSelectedCheckBox] = useState<string[]>([]);
  const [isFetchFilesLoading, setIsFetchFilesLoading] = useState(false);
  const [errorGitUrlMessage, setErrorGitUrlMessage] = useState("");
  const [errorNotSelectBranch, setErrorNotSelectBranch] = useState("");

  const [status, setStatus] = useState(false);

  const [allowLeave, setAllowLeave] = useState(false); // To control if the user can leave the page
  const allowLeaveRef = useRef(allowLeave);

  // useEffect(() => {
  //   allowLeaveRef.current = allowLeave;
  // }, [allowLeave]);

  // useEffect(() => {
  //   const handleLinkClick = (event: MouseEvent) => {
  //     const target = event.target as HTMLElement;
  //     let link: HTMLElement | null = target.closest("a[href]");
  
  //     // Check if the clicked element is inside a Next.js Link component
  //     if (!link && target.closest("a") === null && target.closest("Link") !== null) {
  //       // Look for Next.js Link component
  //       link = (target.closest("a") as HTMLElement) || null;
  //     }
  
  //     if (link) {
  //       const likeHref = link.getAttribute("href");
  
  //       if (isLoading && !allowLeave) {
  //         // Prevent the default behavior immediately
  //         event.preventDefault();
  //         event.stopImmediatePropagation();
  
  //         const confirmLeave = window.confirm(
  //           "A scan is currently in progress. Are you sure you want to leave?"
  //         );
  
  //         if (confirmLeave) {
  //           setAllowLeave(true); // Allow future navigation
  //           // Manually navigate after confirming
  //           router.push(likeHref || "");
  //         }
  //       }
  //     }
  //   };
  
  //   // Attach the click event listener to the document
  //   document.addEventListener("click", handleLinkClick);
  
  //   // Cleanup the event listener when the component unmounts
  //   return () => {
  //     document.removeEventListener("click", handleLinkClick);
  //   };
  // }, [isLoading, allowLeave, router]);
  
  
  // Prevent tab/browser close during scan


  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (isLoading && !allowLeaveRef.current) {
        
        event.preventDefault();
        event.returnValue = "";


        setIsModalVisible(true)
      
        return ""
        
      }
    };
  
    window.addEventListener("beforeunload", handleBeforeUnload);
  
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload); 
    };
  }, [isLoading]);

const handleLeave = () => {
  setAllowLeave(true);
  window.location.reload();
};

const handleCancel = () => {
  setIsModalVisible(false); // Close modal and stay on page
};

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
  const handleSubmit = async () => {
    if (gitResult.length === 0 || selectedBranch === "Select Project Branch") {
      toast({
        description: "Please Provide Git URL and Branch",
        variant: "error",
      });
      setIsLoading(false);
      return;
    }

    if (selectedBranch === "Select Project Branch") {
      setIsLoading(false);
      setErrorNotSelectBranch("Please select a branch");
      return;
    }

    setIsLoading(true);

    if (countScan < 4) {
      const newCount = countScan + 1;
      setCountScan(newCount);
      localStorage.setItem("scanCount", newCount.toString());

      let attempt = 0;
      const maxRetries = 3;

      const performScan = async () => {
        const successSound = new Audio("/sound/notification_sound.wav");
        try {
          attempt++;
          const response = await projectScanNonUser({
            project: {
              gitUrl: gitUrlResult,
              branch: selectedBranch,
              countScan: countScan,
              issueTypes: selectedCheckbox,
              includePaths: selectedFile,
            },
          });

          if (response?.data) {
            toast({
              description: "Project Scan Successfully Completed",
              variant: "success",
            });
            successSound.play();
            setIsLoading(false);
            // Redirect to the project page using the response data
            router.push(`/project/${response?.data?.data}`);
          } else {
            throw new Error("Invalid API response");
          }
        } catch (error) {
          if (axios.isAxiosError(error) && error.response?.status === 504) {
            if (attempt < maxRetries) {
              toast({
                description: `Server Timeout (504). Retrying scan (${attempt}/${maxRetries})...`,
                variant: "success",
              });
              await performScan(); // Retry scan
            } else {
              toast({
                description:
                  "Server Timeout (504). Scan will continue in the background.",
                variant: "success",
              });
              console.warn("Scan continuing despite timeout.");
            }
          } else {
            toast({
              description: "Something went wrong. Please try again.",
              variant: "error",
            });
            console.error("Error during project scan:", error);
          }
        } finally {
          if (attempt >= maxRetries) {
            setIsLoading(false);
          }
        }
      };

      await performScan();
    } else {
      setIsLoading(false);
      toast({
        description: "You Have Reached Scan Limit. Please Sign In",
        variant: "error",
      });
      router.push("/login");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setGitUrl(inputValue); // Update the state with the input value
    // Validate the input value
    if (inputValue.includes(".git")) {
      // Clear any error messages
      setErrorGitUrlMessage("");

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
      setErrorGitUrlMessage("Please Provide a Valid Git URL");
    }
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
      try {
        setIsFetchFilesLoading(true); // Start loading
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}gits/list_files?gitUrl=${gitUrlResult}&branch=${selectedBranch}`
        );

        if (response.status === 200) {
          setIsFetchFilesLoading(false); // Stop loading
          const data = await response.json();
          setListDirectories(data);
        }
      } catch (error) {
        console.error("Error fetching directories:", error);
        toast({
          description: "Oops! Something went wrong",
          variant: "error",
        });
      } finally {
        setIsLoading(false); // Stop loading
      }
    } else {
      toast({
        description: "Oops! Something went wrong",
        variant: "error",
      });
    }
  };
  useEffect(() => {
    if (selectedBranch !== "Select Project Branch" && gitUrlResult) {
      handleFetchDirectories();
    }
  }, [selectedBranch, gitUrlResult]);

  return (
    <section className="mx-auto rounded-lg justify-center items-center bg-card_color_light dark:bg-card_color_dark">
      <ScanStepsModal
        isOpen={showTerms}
        onOpenChange={setShowTerms}
        onStart={handleOnStart}
      />
      {/* Top section */}
      <div className="flex flex-col items-center justify-center pt-10 ">
        <div className="px-3 font-semibold bg-primary_color py-2 rounded-tl-[20px] rounded-br-[20px]">
          <p className="text-center text-text_color_light text-text_body_16 md:text-text_title_24">
            Scan Your Project Repositories
          </p>
        </div>
        <p className="mt-4 text-center px-2 text-text_body_16 text-text_color_desc_light dark:text-text_color_desc_dark">
          Connect your Git repository and select a branch to start scanning.
        </p>
      </div>

      <div>
        {/* Check if loading */}
        {isLoading ? (
          <div className="container justify-center items-center lg:w-[750px] w-[300px] md:w-[550px] mx-auto">
            <LoadingSection />
          </div>
        ) : (
          <div className="container grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 py-8 max-w-7xl mx-auto">
            {/* image */}
            <div className="hidden lg:flex justify-center items-center">
              {!isLoading &&
                (theme === "dark" ? (
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
                ))}
            </div>

            {/* Scan Project */}
            <div className="space-y-6 w-full max-w-md mx-auto">
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
                        onChange={handleChange} // Update the state with the input value
                        className={`mt-1 w-full rounded-md border bg-card_color_light  dark:text-text_color_light pl-[80px] pr-3 py-3 focus:outline-none ${
                          errorGitUrlMessage
                            ? "border-custom_red"
                            : "border-ascend_color"
                        }`}
                      />
                    </div>
                  </div>
                  {errorGitUrlMessage && (
                    <p className="mt-1 text-text_body_16 text-custom_red">
                      {errorGitUrlMessage}
                    </p>
                  )}
                </div>

                {/* select branch */}
                <DropdownMenu>
                  {gitResult.length != 0 ? (
                    <DropdownMenuTrigger asChild>
                      <div className="">
                        <p className="text-text_body_16 text-text_color_light dark:text-text_color_dark my-2">
                          Branch
                        </p>
                        <div
                          className={`flex px-5 justify-between items-center rounded-md border ${
                            errorNotSelectBranch
                              ? "border-custom_red"
                              : "border-ascend_color"
                          } bg-card_color_light`}
                        >
                          <p className="text-text_body_16  py-3  text-text_color_desc_light">
                            {selectedBranch}
                          </p>
                          <IoIosArrowDown className="text-text_color_desc_light h-5 w-5  " />
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
                        <p className="text-text_body_16 text-text_color_light dark:text-text_color_dark  my-2">
                          Branch
                        </p>
                        <div className="flex px-5 justify-between items-center rounded-md border border-ascend_color bg-background_light_mode">
                          <p className="text-text_body_16 py-3  text-text_color_desc_light">
                            {selectedBranch}
                          </p>
                          <IoIosArrowDown className="text-text_color_desc_light h-5 w-5  " />
                        </div>
                      </div>
                    </DropdownMenuTrigger>
                  )}
                  <DropdownMenuContent className=" w-[320px] md:w-[450px] text-text_color_light text-start bg-background_light_mode border-ascend_color mt-1">
                    {gitResult?.length === 0 ? (
                      <DropdownMenuItem disabled>
                        No branch to select
                      </DropdownMenuItem>
                    ) : (
                      gitResult?.map((gitResult: GitUrlType, index: number) => (
                        <DropdownMenuItem
                          className=""
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
                <div className="space-y-2 scrollbar-hide">
                  <p className=" text-text_body_16 text-text_color_light dark:text-text_color_dark">
                    Filter Scan By Files & Directory{" "}
                  </p>
                  <FileStructureViewer
                    data={listDirectories}
                    selectedItems={selectedFile}
                    onSelectItem={handleSelectItem}
                    isFetchLoading={isFetchFilesLoading}
                    status={status}
                  />
                </div>

                {/* filter scan */}
                <div className="space-y-4">
                  <div className="text-text_body_16 text-text_color_light dark:text-text_color_dark">
                    <p className="mb-3">Filter Scan</p>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
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
                      <div className="flex items-center space-x-2">
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
                </div>

                {/* submit scan */}
                <button
                  disabled={isLoading ||  isFetchFilesLoading}
                  onClick={() => handleSubmit()}
                  className={`w-full mt-6 py-3 bg-primary_color text-text_color_light font-medium flex justify-center items-center rounded-md hover:bg-primary_color/90 transition-colors  ${
                        isLoading || isFetchFilesLoading
                          ? "cursor-not-allowed "
                          : "cursor-pointer"
                      }`}
                >
                  Start Scan
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Custom Modal */}
      <Dialog open={isModalVisible} onOpenChange={setIsModalVisible}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure you want to leave?</DialogTitle>
            <DialogDescription>
              A scan is currently in progress. Are you sure you want to leave? This will interrupt the scan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <button onClick={handleCancel}>Cancel</button>
            <button onClick={handleLeave}>Leave</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </section>
  );
}
