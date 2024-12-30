"use client";
import { useEffect, useState } from "react";

import FileStructureViewer from "@/components/FileStructureComponent/FileStructureViewer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IoSearchSharp } from "react-icons/io5";
import ReactTypingEffect from "react-typing-effect";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  useCreateProjectScanMutation,
  useDeleteProjectMutation,
  useGetProjectOverViewUserQuery,
} from "@/redux/service/project";
import { CgDanger } from "react-icons/cg";

import { toast } from "@/components/hooks/use-toast";
import ProjectScanSkeleton from "@/components/ProjectSkeleton/ProjectScanSkeleton";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { GitUrlType } from "@/data/GitUrl";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import CheckGrade from "@/lib/checkGrade";
import { getCoverageData, getDuplicationData, timeSince } from "@/lib/utils";
import { DialogTitle } from "@radix-ui/react-dialog";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaCheck, FaGithub, FaGitlab } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import LoadProjectComponent from "../LoadingProjectComponent/LoadProjectComponent";
export default function ProjectCardComponent() {
  const [userUUID, setUserUUID] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<any>([]);
  const [listDirectories, setListDirectories] = useState<any>();
  const [errorNotSelectBranch, setErrorNotSelectBranch] = useState("");
  const [isFetchFilesLoading, setIsFetchFilesLoading] = useState(false);
  useEffect(() => {
    setUserUUID(localStorage.getItem("userUUID") || "");
  });

  const {
    data: projectResultApi,
    isError,
    isFetching: isFetchDataProjectScan,
  } = useGetProjectOverViewUserQuery({ uuid: userUUID, page: 0, size: 100 });

  // rtk for delete project
  const [deleteProject, { isSuccess: isDeleteSuccess }] =
    useDeleteProjectMutation();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState("Select Project Branch");
  const [isClosing, setIsClosing] = useState(false);
  const [errorGitUrlMessage, setErrorGitUrlMessage] = useState("");
  // rtk for scan project
  const [createScanProject] = useCreateProjectScanMutation();

  const [gitUrlResult, setGitUrl] = useState<string>(""); // Store the input value
  const [gitResult, setGitResult] = useState([]); // result get from git url

  // for scan project
  const handleScanProject = async (index: number) => {
    setSelectedIndex(index);
    setIsLoading(true);
    if (selectedBranch === "Select Project Branch") {
      setIsLoading(false);
      setErrorNotSelectBranch("Please select a branch");
      return; // Stop further execution
    }
    try {
      setErrorNotSelectBranch(""); // Clear any branch-related errors
      const res = await createScanProject({
        project: {
          projectName: projectResultApi[index].component?.component.name,
          gitUrl: gitUrlResult,
          branch: selectedBranch,
          issueTypes: selectedCheckbox,
          includePaths: selectedFiles,
        },
      });
      setSelectedFiles([]);
      if (res?.data) {
        toast({
          description: "Project Scan Success",
          variant: "success",
        });
        setIsOpen(false);
      } else {
        toast({
          description: "Something went wrong!",
          variant: "error",
        });
      }
    } catch (error) {
      console.error("Error while creating scan project:", error);
      toast({
        description: "An unexpected error occurred. Please try again.",
        variant: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   if (isScanSuccess && selectedIndex !== null) {
  //     toast({
  //       description: "Project Scan Success",
  //       variant: "success",
  //     });
  //     setIsOpen(false);
  //     setIsLoading(false);
  //   }
  //   if (isScanError) {
  //     toast({
  //       description: "Project is Current in Use",
  //       variant: "error",
  //     });
  //     setIsLoading(false);
  //   }
  // }, [isScanError, isScanSuccess, selectedIndex]);

  // handle for git input from user and fetch api

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

  // for search
  const [filteredResults, setFilteredResults] = useState<any[]>(
    projectResultApi || []
  );

  // handle delete project
  const handleDeleteProject = (projectName: string) => {
    deleteProject({ projectName: projectName });
  };

  useEffect(() => {
    if (isDeleteSuccess) {
      toast({
        description: "Project Delete Successully",
        variant: "success",
      });
      setIsDeleteOpen(false);
      setIsDeleteLoading(false);
    }
  }, [isDeleteSuccess]);

  const [inputValue, setInputValue] = useState("");

  // Handle user input change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  // Handle Enter key press
  const handleKeyPressforSearchProject = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      const matchingResults = projectResultApi?.filter((item: any) =>
        item.component.component.name
          .toLowerCase()
          .includes(inputValue.toLowerCase())
      );
      setFilteredResults(matchingResults);
    } else if (event.key === "Backspace") {
      if (inputValue === "") {
        setFilteredResults([]); // Set to empty array if input is empty
      } else {
        const matchingResults = projectResultApi?.filter((item: any) =>
          item.component.component.name
            .toLowerCase()
            .includes(inputValue.toLowerCase())
        );
        setFilteredResults(matchingResults);
      }
    } else {
      // Handle other key presses (if any)
      const matchingResults = projectResultApi?.filter((item: any) =>
        item.component.component.name
          .toLowerCase()
          .includes(inputValue.toLowerCase())
      );
      setFilteredResults(matchingResults);
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
      try {
        setIsFetchFilesLoading(true); // Start loading
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}gits/list_files?gitUrl=${gitUrlResult}&branch=${selectedBranch}`
        );

        if (response.status ===  200) {
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

  const handleSelectItem = (file: string) => {
    setSelectedFiles((prevSelected: any) => {
      const newSelected = [...prevSelected];
      const fileIndex = newSelected.findIndex((f) => f === file);

      if (fileIndex !== -1) {
        // If the file is already selected, remove it
        newSelected.splice(fileIndex, 1);
        // Also remove any children of this file
        return newSelected.filter((f) => !f.startsWith(file + "/"));
      } else {
        // If the file is not selected, add it
        const parentIndex = newSelected.findIndex((f) =>
          file.startsWith(f + "/")
        );
        if (parentIndex !== -1) {
          // If a parent folder is already selected, replace it with this file
          newSelected[parentIndex] = file;
        } else {
          // Otherwise, just add this file
          newSelected.push(file);
        }
      }

      return newSelected;
    });
  };

  useEffect(() => {
    if (selectedBranch !== "Select Project Branch" && gitUrlResult) {
      handleFetchDirectories();
    }
  }, [selectedBranch, gitUrlResult]);

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
            onKeyPress={handleKeyPressforSearchProject}
            placeholder="Search for anything..."
            className="bg-transparent outline-none w-full text-sm placeholder:text-text_color_desc_light dark:placeholder:text-text_color_desc_dark"
          />
        </div>

        <div className="flex gap-5 items-center">
          <p>Sort By</p>
          <Select>
            <SelectTrigger className="w-[180px] bg-background_light_mode dark:bg-card_color_dark border-none">
              <SelectValue placeholder="Name" />
            </SelectTrigger>
            <SelectContent className="bg-background_light_mode dark:bg-background_dark_mode">
              <SelectItem value="light">Name</SelectItem>
              <SelectItem value="dark">Last analysis date</SelectItem>
              <SelectItem value="system">Creation date</SelectItem>
              <SelectItem value="reliability">Reliability</SelectItem>
              <SelectItem value="security">Security</SelectItem>
              <SelectItem value="security review">Security review</SelectItem>
              <SelectItem value="maintainability">Maintainability</SelectItem>
              <SelectItem value="coverage">Coverage</SelectItem>
              <SelectItem value="duplications">Duplications</SelectItem>
              <SelectItem value="size">Size</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {isError ? (
        // no project show waiting image
        <LoadProjectComponent
          textDisplay={" Once you analyze projects, they will show up here."}
        />
      ) : isFetchDataProjectScan ? (
        // while fetch data
        <ProjectScanSkeleton />
      ) : // check if search result is empty
      filteredResults.length === 0 ? (
        projectResultApi?.map((projectResult: any, index: number) => {
          // check project that already scan
          if (projectResult?.component.component.measures != 0) {
            return (
              <section
                key={index}
                className="w-full  my-5 h-full  p-5  border border-opacity-40 border-text_color_desc_light dark:border-primary_color rounded-[20px] "
              >
                <div className="flex  justify-between w-full">
                  <p
                    onClick={() =>
                      router.push(
                        `project/${projectResult?.component.component.name}`
                      )
                    }
                    className="text-text_body_16 cursor-pointer text-text_color_light dark:text-text_color_dark hover:text-ascend_color hover:underline "
                  >
                    {projectResult?.component.component.name}
                  </p>
                  <div className="flex">
                    {projectResult?.branch?.map(
                      (branchItem: any, branchIndex: number) => {
                        return branchItem?.branches?.map(
                          (item: any, index: number) => {
                            return (
                              <div
                                key={`${branchIndex}-${index}`}
                                className="flex text-center items-center"
                              >
                                <div
                                  className={`w-[25px] h-[25px] flex items-center justify-center rounded-[5px] ${
                                    item.status.qualityGateStatus === "OK"
                                      ? "bg-primary_color"
                                      : "bg-custom_red"
                                  }`}
                                >
                                  {item.status.qualityGateStatus === "OK" ? (
                                    <FaCheck className="dark:text-text_color_light" />
                                  ) : (
                                    <RxCross2 className="dark:text-text_color_light" />
                                  )}
                                </div>
                                <p className="px-2 text-text_body_16">
                                  {item.status.qualityGateStatus === "OK"
                                    ? "Passed"
                                    : "Failed"}
                                </p>
                                <p className="mx-2">|</p>
                              </div>
                            );
                          }
                        );
                      }
                    )}
                    {/* for delete project */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <RxCross2 className="h-6 w-6 text-custom_red cursor-pointer" />
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader className="items-center">
                          <div>
                            {" "}
                            <CgDanger className="h-[60px] w-[60px] text-custom_red" />
                          </div>
                        </DialogHeader>
                        <DialogTitle className="text-center  text-text_color_light dark:text-text_color_dark  ">
                          Are you sure want to delete project{" "}
                          <span className="text-secondary_color">
                            {" "}
                            {projectResult?.component?.component.name}
                          </span>
                        </DialogTitle>

                        <div className="w-full flex justify-center gap-5 ">
                          <Button
                            disabled={isLoading}
                            type="button"
                            className="px-5 hover:bg-custom_red "
                            variant="secondary"
                            onClick={() =>
                              handleDeleteProject(
                                projectResult?.component?.component.name
                              )
                            }
                          >
                            {isLoading ? (
                              <div className="spinner-border animate-spin  inline-block w-6 h-6 border-2 rounded-full border-t-2 border-text_color_dark border-t-transparent"></div>
                            ) : (
                              "Yes"
                            )}
                          </Button>
                          <DialogClose asChild>
                            <Button
                              disabled={isLoading}
                              type="button"
                              variant="secondary"
                              className=" hover:bg-custom_red"
                            >
                              Close
                            </Button>
                          </DialogClose>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
                <p className=" my-2 text-left text-[14px] text-text_color_desc_light dark:text-text_color_desc_dark ">
                  {" "}
                  <span className="text-secondary_color truncate">
                    Last analysis:
                  </span>{" "}
                  {projectResult?.branch?.map(
                    (branchItem: any, branchIndex: number) =>
                      branchItem?.branches?.map((item: any, index: number) => (
                        <span key={`${branchIndex}-${index}`}>
                          {timeSince(item?.analysisDate)}{" "}
                        </span>
                      ))
                  )}
                  {projectResult?.component?.component?.measures?.map(
                    (item: any, index: number) => {
                      if (item.metric === "ncloc") {
                        return (
                          <span key={index}>
                            {item.value} • Lines of Code •{" "}
                          </span>
                        );
                      }
                    }
                  )}
                  {projectResult?.component?.component?.measures?.map(
                    (item: any, index: number) => {
                      if (item.metric === "ncloc_language_distribution") {
                        return (
                          <span key={index}>
                            Language •{" "}
                            {item.value
                              .match(/\w+(?==)/g)
                              ?.join(" ")
                              .toUpperCase()}{" "}
                          </span>
                        );
                      }
                    }
                  )}
                </p>

                <hr className="my-5 dark:border-primary_color" />

                <div className="grid  grid-cols-2 md:grid-cols-3 lg:gap-4 xl:gap-5">
                  {/* security */}
                  <div className="w-full h-full ">
                    {/* score security */}
                    <div className="flex w-full justify-center  text-center items-center">
                      {projectResult?.component?.component?.measures?.map(
                        (item: any, index: number) => {
                          if (item.metric === "security_issues") {
                            // check conditon return grade base on score
                            const parsedValue = JSON.parse(item.value);
                            return (
                              <CheckGrade
                                key={index}
                                parsedValue={parsedValue}
                                index={index}
                              />
                            );
                          }
                        }
                      )}

                      {projectResult?.component?.component?.measures?.map(
                        (item: any, index: number) => {
                          if (item.metric === "security_issues") {
                            return (
                              <p key={index} className="mx-2">
                                {JSON.parse(item.value).total}
                              </p>
                            );
                          }
                        }
                      )}
                    </div>
                    <div className="my-5 w-full flex items-center justify-center">
                      Security
                    </div>
                  </div>
                  {/* reliability */}
                  <div className="w-full h-full">
                    {/* score reliability */}
                    <div className="flex w-full justify-center  text-center items-center">
                      {/* grade */}
                      {projectResult?.component?.component?.measures?.map(
                        (item: any, index: number) => {
                          if (item.metric === "reliability_issues") {
                            // check conditon return grade base on score
                            const parsedValue = JSON.parse(item.value);
                            return (
                              <CheckGrade
                                key={index}
                                parsedValue={parsedValue}
                                index={index}
                              />
                            );
                          }
                        }
                      )}
                      {/* total score */}
                      {projectResult?.component?.component?.measures?.map(
                        (item: any, index: number) => {
                          if (item.metric === "reliability_issues") {
                            return (
                              <p key={index} className="mx-2">
                                {JSON.parse(item.value).total}
                              </p>
                            );
                          }
                        }
                      )}
                    </div>
                    <div className="my-5 w-full flex items-center justify-center">
                      Reliability
                    </div>
                  </div>
                  {/* Maintainability */}
                  <div className="w-full h-full">
                    {/* Maintainability */}
                    <div className="flex w-full justify-center  text-center items-center">
                      {/* grade */}
                      {projectResult?.component?.component?.measures?.map(
                        (item: any, index: number) => {
                          if (item.metric === "maintainability_issues") {
                            // check conditon return grade base on score
                            const parsedValue = JSON.parse(item.value);
                            return (
                              <CheckGrade
                                key={index}
                                parsedValue={parsedValue}
                                index={index}
                              />
                            );
                          }
                        }
                      )}
                      {/* score */}
                      {projectResult?.component?.component?.measures?.map(
                        (item: any, index: number) => {
                          if (item.metric === "maintainability_issues") {
                            return (
                              <p key={index} className="mx-2">
                                {JSON.parse(item.value).total}
                              </p>
                            );
                          }
                        }
                      )}
                    </div>
                    <div className="my-5 w-full flex items-center justify-center">
                      Maintainability
                    </div>
                  </div>
                  {/* Hotspot Reviewed */}
                  <div className="w-full h-full">
                    {/* Hotspot Reviewed */}
                    <div className="flex w-full justify-center  text-center items-center">
                      {/* grade */}
                      {projectResult?.component?.component?.measures?.map(
                        (item: any, index: number) => {
                          if (item.metric === "reliability_issues") {
                            // check conditon return grade base on score
                            const parsedValue = JSON.parse(item.value);
                            return (
                              <CheckGrade
                                key={index}
                                parsedValue={parsedValue}
                                index={index}
                              />
                            );
                          }
                        }
                      )}
                      {/* score  */}
                      {projectResult?.component?.component?.measures?.map(
                        (item: any, index: number) => {
                          if (item.metric === "security_hotspots") {
                            return (
                              <p key={index} className="mx-2">
                                {item.value}
                              </p>
                            );
                          }
                        }
                      )}
                    </div>
                    <div className="mt-5 w-full flex items-center text-center justify-center">
                      Hotspot
                    </div>
                  </div>
                  {/* Coverage Reviewed */}
                  <div className="w-full h-full">
                    {/* Coverage Reviewed */}
                    <div className="flex w-full justify-center  text-center items-center">
                      {projectResult?.component?.component?.measures.includes(
                        "coverage"
                      ) ? (
                        <div className="flex w-full justify-center  text-center items-center">
                          {projectResult?.component?.component?.measures?.map(
                            (item: any, index: number) => {
                              if (item.metric === "coverage") {
                                return (
                                  <div
                                    key={index}
                                    className="w-[60px] h-[30px] flex items-center justify-center"
                                  >
                                    <Image
                                      width={50}
                                      height={50}
                                      alt="coverage"
                                      src={
                                        getCoverageData(item?.value)?.image ||
                                        "/images/20percent.png"
                                      }
                                    />
                                  </div>
                                );
                              }
                            }
                          )}
                          {projectResult?.component?.component?.measures?.map(
                            (item: any, index: number) => {
                              if (item.metric === "coverage") {
                                return (
                                  <p key={index} className="mx-2">
                                    {item.value}
                                  </p>
                                );
                              }
                            }
                          )}
                        </div>
                      ) : (
                        <p className="mt-2 text-text_color_light dark:text-text_color_dark">
                          {" "}
                          No Data{" "}
                        </p>
                      )}
                    </div>
                    <div className="mt-5 w-full flex items-center text-center justify-center">
                      Coverage
                    </div>
                  </div>
                  {/* duplicated */}
                  <div className="w-full h-full">
                    {/* duplicated */}
                    <div className="flex w-full justify-center  text-center items-center">
                      {projectResult?.component?.component?.measures.includes(
                        "duplicated_lines_density"
                      ) ? (
                        <div className="flex w-full justify-center  text-center items-center">
                          {projectResult?.component?.component?.measures?.map(
                            (item: any, index: number) => {
                              if (item.metric === "duplicated_lines_density") {
                                return (
                                  <div
                                    key={index}
                                    className="w-[35px] h-[30px] flex items-center justify-center"
                                  >
                                    <Image
                                      width={35}
                                      height={30}
                                      alt="coverage"
                                      src={getDuplicationData(item.value).image}
                                    />
                                  </div>
                                );
                              }
                            }
                          )}
                          {projectResult?.component?.component?.measures?.map(
                            (item: any, index: number) => {
                              if (item.metric === "duplicated_lines_density") {
                                return (
                                  <p key={index} className="mx-2">
                                    {item.value}
                                  </p>
                                );
                              }
                            }
                          )}
                        </div>
                      ) : (
                        <p className="mt-2 text-text_color_light dark:text-text_color_dark">
                          {" "}
                          No Data{" "}
                        </p>
                      )}
                    </div>
                    <div className="mt-5 w-full flex items-center justify-center">
                      Duplicated
                    </div>
                  </div>
                </div>
              </section>
            );
          } else {
            // return project not yet scan
            return (
              <section
                key={index}
                className="w-full  h-full md:h-[150px] my-5  p-5 border border-opacity-40 border-text_color_desc_light dark:border-primary_color rounded-[20px] "
              >
                <div className="flex justify-between w-full">
                  <p className="text-text_body_16 text-secondary_color dark:text-text_color_dark ">
                    {projectResult?.component?.component.name}
                  </p>
                  <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                    <DialogTrigger asChild>
                      <RxCross2 className="h-6 w-6 text-custom_red cursor-pointer" />
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader className="items-center">
                        <div>
                          {" "}
                          <CgDanger className="h-[60px] w-[60px] text-custom_red" />
                        </div>
                      </DialogHeader>
                      <DialogTitle className="text-center  text-text_color_light dark:text-text_color_dark  ">
                        Are you sure want to delete project{" "}
                        <span className="text-secondary_color">
                          {" "}
                          {projectResult?.component?.component.name}
                        </span>
                      </DialogTitle>

                      <div className="w-full flex justify-center gap-5 ">
                        <Button
                          disabled={isDeleteLoading}
                          type="button"
                          className="px-5 hover:bg-custom_red "
                          variant="secondary"
                          onClick={() =>
                            handleDeleteProject(
                              projectResult?.component?.component.name
                            )
                          }
                        >
                          {isDeleteLoading ? (
                            <div className="spinner-border animate-spin  inline-block w-6 h-6 border-2 rounded-full border-t-2 border-text_color_dark border-t-transparent"></div>
                          ) : (
                            "Yes"
                          )}
                        </Button>
                        <DialogClose asChild>
                          <Button
                            disabled={isDeleteLoading}
                            type="button"
                            variant="secondary"
                            className=" hover:bg-custom_red"
                          >
                            Close
                          </Button>
                        </DialogClose>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                <hr className="my-5 dark:border-primary_color" />
                <div className="flex  flex-col items-start md:flex-row md:items-center">
                  {isClosing && isLoading ? (
                    <div className="flex justify-start items-start w-full pt-2 h-full">
                      <ReactTypingEffect
                        text={[
                          `Scanning on project ${projectResult?.component?.component.name} ...`,
                        ]}
                        speed={100}
                        eraseSpeed={50}
                        eraseDelay={2000}
                        typingDelay={500}
                      />
                    </div>
                  ) : (
                    <div className="flex w-full items-center ">
                      <p className=" text-left my-2 text-text_body_16 text-text_color_desc_light  dark:text-text_color_desc_dark ">
                        {" "}
                        Project&apos;s{" "}
                        <span className="text-secondary_color truncate">
                          {projectResult?.component?.component.name}
                        </span>{" "}
                        is not analyzed yet.{" "}
                      </p>{" "}
                      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                        <AlertDialogTrigger asChild>
                          <p className=" md:pl-2 text-link_color dark:text-blue-500 underline cursor-pointer">
                            Configure Project
                          </p>
                        </AlertDialogTrigger>
                        <AlertDialogContent className=" w-[90%] md:w-full rounded-[20px] bg-text_color_dark  flex flex-col   ">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="flex justify-between text-center items-center">
                              <p className="text-text_title_24 text-text_color_light">
                                {isLoading ? (
                                  <p>
                                    Scanning on project{" "}
                                    {projectResult?.component?.component.name}{" "}
                                    ...
                                  </p>
                                ) : (
                                  <p>
                                    {" "}
                                    {projectResult?.component?.component.name}
                                  </p>
                                )}
                              </p>
                              <AlertDialogCancel className="flex text-center items-center">
                                <button
                                  onClick={() => {
                                  setSelectedFiles([]);
                                  }}
                                >
                                  <RxCross2
                                    className="text-text_color_light cursor-pointer text-text_header_34"
                                    style={{ height: "1em", width: "0.7em" }}
                                  />
                                </button>
                              </AlertDialogCancel>
                            </AlertDialogTitle>
                          </AlertDialogHeader>
                          {isLoading ? (
                            <video
                              src="/images/loadingScan.mp4"
                              autoPlay
                              className="w-full h-full"
                              loop
                            ></video>
                          ) : (
                            <section className="h-full flex flex-col justify-between">
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
                                    errorGitUrlMessage
                                      ? "border-custom_red"
                                      : "border-ascend_color"
                                  }`}
                                />
                              </div>
                              {errorGitUrlMessage && (
                                <p className="mt-1 text-text_body_16 text-custom_red">
                                  {errorGitUrlMessage}
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
                                <DropdownMenuContent className=" w-[290px] md:w-[450px] lg:w-[380px] xl:w-[510px] text-text_color_light text-start bg-background_light_mode border-ascend_color">
                                  {gitResult?.length === 0 ? (
                                    <DropdownMenuItem disabled>
                                      No branch to select
                                    </DropdownMenuItem>
                                  ) : (
                                    gitResult?.map(
                                      (
                                        gitResult: GitUrlType,
                                        index: number
                                      ) => (
                                        <DropdownMenuItem
                                          className=""
                                          key={index}
                                          onClick={() =>
                                            setSelectedBranch(
                                              `${gitResult?.name}`
                                            )
                                          }
                                        >
                                          {gitResult?.name}
                                        </DropdownMenuItem>
                                      )
                                    )
                                  )}
                                </DropdownMenuContent>
                              </DropdownMenu>
                              {/* file and directory */}
                              <div>
                                <p className="mt-5 text-text_body_16 text-text_color_light">
                                  Filter Scan By Files & Directory{" "}
                                </p>
                                <FileStructureViewer
                                  data={listDirectories}
                                  selectedItem={selectedFiles}
                                  onSelectItem={handleSelectItem}
                                  isFetchLoading={isFetchFilesLoading}
                                />
                              </div>
                              {/* filter scan */}
                              <div className="text-text_body_16 text-text_color_light  ">
                                <p className="my-5">
                                  Filter Scan By Issue Type
                                </p>
                                <div className="flex items-center space-x-2 my-5">
                                  <Checkbox
                                    id="bug"
                                    onCheckedChange={(checked) =>
                                      handleCheckboxChange("bug", checked)
                                    }
                                    className="h-5 w-5 !border-text_color_light "
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
                                      handleCheckboxChange(
                                        "Vulnerability",
                                        checked
                                      )
                                    }
                                    className="h-5 w-5 !border-text_color_light "
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
                                      handleCheckboxChange(
                                        "code_smell",
                                        checked
                                      )
                                    }
                                    className="h-5 w-5 !border-text_color_light"
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
                                key={index}
                                disabled={isLoading}
                                onClick={() => handleScanProject(index)}
                                className="w-full my-[30px] py-3 bg-primary_color text-text_color_light font-normal flex justify-center rounded-[10px]"
                              >
                                {isLoading ? (
                                  <div className="spinner-border  animate-spin inline-block w-6 h-6 border-2 rounded-full border-t-2 border-text_color_light border-t-transparent"></div>
                                ) : (
                                  "Submit"
                                )}
                              </button>
                            </section>
                          )}
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  )}
                </div>
              </section>
            );
          }
        })
      ) : (
        <p></p>
      )}
    </div>
  );
}
