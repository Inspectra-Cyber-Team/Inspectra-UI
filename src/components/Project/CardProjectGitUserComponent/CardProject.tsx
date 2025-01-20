import { toast } from "@/components/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  useCreateProjectScanMutation,
  useDeleteProjectMutation
} from "@/redux/service/project";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { CgDanger } from "react-icons/cg";
import { RxCross2 } from "react-icons/rx";
import ReactTypingEffect from "react-typing-effect";
import LoadingSectionProjectUser from "../CardProjectComponent/LoadingSectionProjectUser";
import LoadProjectComponent from "../LoadingProjectComponent/LoadProjectComponent";

export default function CardProject({ userDataProjet, isError }: any) {
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [isUserAccessToken, setIsUserAccessToken] = useState<string>("");
  const [isDeleteOpen, setIsDeleteOpen] = useState(false); // For managing modal visibility
  const [isLoading, setIsLoading] = useState(false);
  const [activeProjectIndex, setActiveProjectIndex] = useState<number>(0);
  const [isCloseLoadingScan, setIsCloseLoadingScan] = useState(false);
  const { data: session } = useSession();

  // rtk for delete project
  const [deleteProject, { isSuccess: isDeleteSuccess }] =
    useDeleteProjectMutation();

  // rtk for scan project
  const [createProjectScan] = useCreateProjectScanMutation();

  // handle delete project
  const handleDeleteProject = (projectName: string) => {
    setIsDeleteLoading(true);
    deleteProject({ projectName: projectName });
  };

  useEffect(() => {
    if (session) {
      const accessToken = (session as any).accessToken;
      setIsUserAccessToken(accessToken);
    }
  }, [session]);

  useEffect(() => {
    if (isDeleteSuccess) {
      toast({
        description: "Project Deleted Successfully",
        variant: "success",
      });
      setIsDeleteOpen(false); // Close the modal on success
      setIsDeleteLoading(false);
    }
  }, [isDeleteSuccess]);

  type ErrorResponse = {
    data?: {
      error?: {
        description?: string;
      };
    };
  };
  // get prject name and user name and split
  const project =
    userDataProjet?.[activeProjectIndex]?.component?.component?.name ??
    "Default Project Name";

  const [userName, projectName] = project.split("--");

  // handle scan project
  const handleOnSubmit = async () => {
    setIsLoading(true);
    setIsCloseLoadingScan(true);
    const successSound = new Audio("/sound/notification_sound.wav");
    try {
      // Step 1: Fetch project and get git URL branch projectName
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}gits/get-repo?username=${userName}&projectName=${projectName}`
      );
      // for public repo
      if (response.status === 200) {
        // for public repo
        const resPublic = await response.json();
        const gitUrl = await resPublic
          ?.map((url: any) => url?.clone_url)
          .join(", ");
        const branch = await resPublic
          ?.map((branch: any) => branch?.default_branch)
          .join(", ");
        // scan public repo
        const createProjectScanResponse = await createProjectScan({
          project: {
            projectName: project,
            gitUrl: gitUrl,
            branch: branch,
          },
        });
        if (createProjectScanResponse.data) {
          toast({
            description: "Project Scanned Successfully",
            variant: "success",
          });
          successSound.play();
          setIsLoading(false);
        } else if (createProjectScanResponse?.error) {
          let errorMessage = "An error occurred while creating the project.";

          // Check if the error is of type FetchBaseQueryError
          if ("data" in createProjectScanResponse.error) {
            const errorResponse =
              createProjectScanResponse.error as ErrorResponse;

            // Check if the description is an array or a string
            if (Array.isArray(errorResponse.data?.error?.description)) {
              // Join array elements into a single string (comma-separated or however you'd like)
              errorMessage = errorResponse.data.error.description[0].reason;
            } else {
              // Handle as a string
              errorMessage =
                errorResponse.data?.error?.description || errorMessage;
            }
          }

          toast({
            description: errorMessage,
            variant: "error",
          });
        } else {
          toast({
            description: "Something went wrong!",
            variant: "error",
          });
        }
      }
      // for private repo
      else {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}gits/get-repo?username=${userName}&projectName=${projectName}&accessToken=${isUserAccessToken}`
        );
        const resPrivate = await response.json();
        const gitUrl = await resPrivate
          ?.map((url: any) => url?.clone_url)
          .join(", ");
        const branch = await resPrivate
          ?.map((branch: any) => branch?.default_branch)
          .join(", ");
        // scan public repo
        const createProjectScanResponse = await createProjectScan({
          project: {
            projectName: project,
            gitUrl: gitUrl,
            branch: branch,
            accessToken: isUserAccessToken,
          },
        });
        if (createProjectScanResponse.data) {
          toast({
            description: "Project Scanned Successfully",
            variant: "success",
          });
          setIsLoading(false);
        } else if (createProjectScanResponse?.error) {
          let errorMessage = "An error occurred while creating the project.";

          // Check if the error is of type FetchBaseQueryError
          if ("data" in createProjectScanResponse.error) {
            const errorResponse =
              createProjectScanResponse.error as ErrorResponse;

            // Check if the description is an array or a string
            if (Array.isArray(errorResponse.data?.error?.description)) {
              // Join array elements into a single string (comma-separated or however you'd like)
              errorMessage = errorResponse.data.error.description[0].reason;
            } else {
              // Handle as a string
              errorMessage =
                errorResponse.data?.error?.description || errorMessage;
            }
          }

          toast({
            description: errorMessage,
            variant: "error",
          });
        } else {
          toast({
            description: "Something went wrong!",
            variant: "error",
          });
        }
      }
    } catch (error) {
      console.error("Error during process:", error);
      toast({
        description: "An error occurred during the process",
        variant: "error",
      });
    } finally {
      setIsLoading(false); // Always stop loading indicator
    }
  };

  return (
    <div>
      {isError ? (
        <LoadProjectComponent textDisplay={"No Project Seleted "} />
      ) : (
        <div className="flex flex-col justify-center items-center w-full">
          <p className="bg-primary_color my-[60px] font-medium cursor-pointer mb-10  text-text_color_light  items-center justify-center rounded-tl-[14px] rounded-br-[14px] text-text_title_24 py-1.5 h-full  px-5 inline-block">
            Select Project To Scan
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 px-3 md:px-0 gap-y-1 md:gap-y-3 gap-x-10">
            {userDataProjet?.map((project: any, index: number) => {
              const hasMeasures =
                project?.component?.component?.measures?.length !== 0;
              return (
                <div
                  key={index}
                  onClick={() => {
                    if (hasMeasures) {
                    } else {
                      setActiveProjectIndex(index);
                    }
                  }} // Set the selected project's index
                  className={`w-full  my-5 p-5 border-2 border-opacity-40 rounded-[20px] 
                   ${
                     activeProjectIndex === index
                       ? "border-secondary_color border-3 dark:border-primary_color bg-text_color_dark dark:bg-card_color_dark" // Active project styling
                       : "border-text_color_desc_light bg-text_color_dark dark:bg-card_color_dark"
                   }  ${hasMeasures ? "cursor-default" : "cursor-pointer"} `}
                >
                  <div className="flex justify-between w-full">
                    <p className="text-text_body_16 w-[90%] truncate text-text_color_light dark:text-text_color_dark">
                      {project?.component?.component?.name}
                    </p>
                    {/* Trigger the delete modal */}
                    {hasMeasures ? (
                      <p></p>
                    ) : (
                      <AlertDialog>
                        <AlertDialogTrigger disabled={isLoading} asChild>
                          <button
                            disabled={isLoading}
                            className={`h-6 w-6 text-custom_red ${
                              isLoading
                                ? "cursor-not-allowed "
                                : "cursor-pointer"
                            }`}
                          >
                            <RxCross2 />
                          </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="sm:max-w-[450px]">
                          <AlertDialogHeader className="items-center">
                            <div>
                              <CgDanger className="h-[60px] w-[60px] text-custom_red" />
                            </div>
                          </AlertDialogHeader>
                          <AlertDialogTitle className="text-center text-text_color_light dark:text-text_color_dark">
                            Are you sure you want to delete project
                            <span className="text-secondary_color">
                              {" "}
                              {project?.component?.component.name}
                            </span>
                          </AlertDialogTitle>
                          <AlertDialogFooter className="w-full flex justify-center gap-5">
                            <Button
                              disabled={isDeleteLoading}
                              type="button"
                              className="px-5 hover:bg-custom_red"
                              variant="secondary"
                              onClick={() =>
                                handleDeleteProject(
                                  project?.component?.component.name
                                )
                              }
                            >
                              {isDeleteLoading ? (
                                <div className="spinner-border animate-spin inline-block w-6 h-6 border-2 rounded-full border-t-2 border-text_color_dark border-t-transparent"></div>
                              ) : (
                                "Yes"
                              )}
                            </Button>
                            <AlertDialogCancel asChild>
                              <Button
                                disabled={isDeleteLoading}
                                type="button"
                                variant="secondary"
                                className="hover:bg-custom_red"
                              >
                                Close
                              </Button>
                            </AlertDialogCancel>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                  </div>
                  <hr
                    className={`my-5 border-1 ${
                      activeProjectIndex === index
                        ? "border-ascend_color  dark:border-primary_color"
                        : "border-text_color_desc_light"
                    }`}
                  />

                  {isLoading && activeProjectIndex === index ? (
                    <div className="flex justify-start items-start w-full pt-2 h-full">
                      <ReactTypingEffect
                        text={[`Scanning on project ${projectName} ...`]}
                        speed={100}
                        eraseSpeed={50}
                        eraseDelay={2000}
                        typingDelay={500}
                      />
                    </div>
                  ) : (
                    <p className="text-left my-2 text-text_body_16 text-text_color_desc_light dark:text-text_color_desc_dark">
                      {hasMeasures ? (
                        <>
                          {" "}
                          Project&apos;s{" "}
                          <span className="text-secondary_color ">
                            {project?.component?.component.name}
                          </span>{" "}
                          is analyzed .
                        </>
                      ) : (
                        <>
                          {" "}
                          Project&apos;s{" "}
                          <span className="text-secondary_color ">
                            {project?.component?.component.name}
                          </span>{" "}
                          is not analyzed yet.
                        </>
                      )}
                    </p>
                  )}
                </div>
              );
            })}

            <AlertDialog
              open={isCloseLoadingScan}
              onOpenChange={setIsCloseLoadingScan}
            >
              <AlertDialogContent className="xl:h-[95%]  w-[95%]  md:w-full lg:max-w-[500px] xl:max-w-[700px]  items-end xl:w-full rounded-[20px] bg-text_color_dark  flex flex-col  ">
                <button
                  onClick={() => setIsCloseLoadingScan(false)}
                  className="text-custom_red cursor-pointer"
                >
                  <RxCross2 className="h-6 w-6" />
                </button>
                <div className="w-full h-full">
                  <LoadingSectionProjectUser />
                </div>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          {/* button submit  */}
          <div className="w-full flex justify-items-start">
            <button
              onClick={handleOnSubmit}
              className="bg-primary_color w-[100px]  cursor-pointer my-10 text-text_color_light   rounded-tl-[14px] rounded-br-[14px] text-text_title_24 py-1.5 px-5 flex justify-center items-center"
            >
              {isLoading ? (
                <div className="spinner-border animate-spin inline-block w-5 h-5 border-2 rounded-full border-t-2 border-text_color_light border-t-transparent"></div>
              ) : (
                "Scan"
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
