"use client";
import { toast } from "@/components/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetAllUserRepositoriesQuery } from "@/redux/service/git";
import {
  useCreateProjectNameMutation,
  useGetProjectOverViewUserQuery,
} from "@/redux/service/project";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import CardProject from "../CardProjectGitUserComponent/CardProject";
import { PiLockKeyFill } from "react-icons/pi";

export function ListRepoComponent() {
  const [isUserAccessToken, setIsUserAccessToken] = useState<string>("");
  const [createProject] = useCreateProjectNameMutation();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRepos, setSelectedRepos] = useState<string[]>([]); // Array to store selected repositories
  const [userUUID, setUserUUID] = useState("");
  const [activeTab, setActiveTab] = useState("Select Repositories"); // Track the active tab

  type ErrorResponse = {
    data?: {
      error?: {
        description?: string;
      };
    };
  };

  const { data: userDataProjet, isError } = useGetProjectOverViewUserQuery({
    uuid: userUUID,
    page: 0,
    size: 10,
  });

  const { data: userRepo } = useGetAllUserRepositoriesQuery({
    accessToken: isUserAccessToken,
  });

  const { data: session } = useSession();

  useEffect(() => {
    const storedUUID = localStorage.getItem("userUUID") || "";
    setUserUUID(storedUUID);
  });

  useEffect(() => {
    if (session) {
      const accessToken = (session as any).accessToken;
      setIsUserAccessToken(accessToken);
    }
  }, [session]);

  // handle for select repo
  const handleCheckboxChange = (repoFullName: string) => {
    // Keep track of selected repositories, but don't trigger creation until the "Next" button is pressed
    setSelectedRepos((prevSelected) => {
      if (prevSelected.includes(repoFullName)) {
        // If already selected, remove it
        return prevSelected.filter((name) => name !== repoFullName);
      } else {
        // If not selected, add it
        return [...prevSelected, repoFullName];
      }
    });
  };

  // handle for create project
  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      if (selectedRepos.length === 0) {
        toast({
          description: "Please select at least one repository.",
          variant: "error",
        });
        return; // Prevent submitting if no repositories are selected
      }

      // Proceed with creating projects after user has selected repositories
      for (const repo of selectedRepos) {
        const sanitizedProjectName = repo.replace("/", "--");
        const res = await createProject({ projectName: sanitizedProjectName });
        if (res?.data?.success) {
          toast({
            description: `Project ${sanitizedProjectName} created successfully`,
            variant: "success",
          });
        } else if (res?.error) {
          let errorMessage = "An error occurred while creating the project.";

          // Check if the error is of type FetchBaseQueryError
          if ("data" in res.error) {
            const errorResponse = res.error as ErrorResponse;

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
        }
      }
      setSelectedRepos([]);
      toast({
        description: "All projects created successfully",
        variant: "success",
      });

      // Switch to the "Project Selection" tab after success
      setActiveTab("Project Selection");
    } catch (error) {
      toast({
        description: "Error creating projects",
        variant: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        {/* for trigger different tab */}
        <TabsList className="flex justify-start  !bg-transparent overflow-x-auto scrollbar-hide overflow-y-hidden">
          <TabsTrigger
            value="Select Repositories"
            className=" data-[state=active]:shadow-none data-[state=active]:bg-inherit dark:data-[state=active]:bg-transparent  data-[state=active]:rounded-none data-[state=active]:border-b-2  data-[state=active]:border-ascend_color data-[state=active]:text-acborder-ascend_color"
          >
            Select Repositories
          </TabsTrigger>
          <p className="mx-2">|</p>
          <TabsTrigger
            value="Project Selection"
            className=" data-[state=active]:shadow-none data-[state=active]:bg-inherit  dark:data-[state=active]:bg-transparent  data-[state=active]:rounded-none data-[state=active]:border-b-2  data-[state=active]:border-ascend_color data-[state=active]:text-acborder-ascend_color"
          >
            Project Selection
          </TabsTrigger>
        </TabsList>

        {/* tab for select repo */}
        <TabsContent value="Select Repositories">
          <div className="flex flex-col justify-center items-center w-full">
            <p className="bg-primary_color font-medium cursor-pointer mb-10 mt-[60px]  text-text_color_light  items-center justify-center rounded-tl-[14px] rounded-br-[14px] text-text_title_24 py-1.5 h-full my-auto px-5 inline-block">
              Select Repositories To Create Projects
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 my-10">
              {userRepo?.map((repo: any, index: number) => (
                <label key={index} className="flex items-start space-x-2">
                  <input
                    className="mr-2 h-5 w-5 shrink-0" // Fixed size for checkbox
                    type="checkbox"
                    value={repo?.full_name}
                    checked={selectedRepos.includes(repo?.full_name)}
                    onChange={() => handleCheckboxChange(repo?.full_name)}
                  />
                  <div className="flex-1">
                    {/* Break text */}
                    <p className="break-words text-text_body_16 text-text_color_light dark:text-text_color_dark">
                      {repo?.full_name}
                    </p>
                    {/* Visibility indicator */}
                    {repo?.visibility === "private" && (
                      <div className="flex items-center text-text_body_16 text-text_color_dark mt-1">
                        <PiLockKeyFill />
                        <span className="ml-1">Private</span>
                      </div>
                    )}
                  </div>
                </label>
              ))}
            </div>
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-primary_color cursor-pointer mb-10 w-[100px] h-[40px] text-text_color_light flex items-center justify-center rounded-tl-[14px] rounded-br-[14px] text-text_body_16 py-1.5 mt-4"
            >
              {isLoading ? (
                <div className="spinner-border animate-spin inline-block w-6 h-6 border-2 rounded-full border-t-2 border-text_color_light border-t-transparent"></div>
              ) : (
                "Next"
              )}
            </button>
          </div>
        </TabsContent>

        {/* Project Card */}
        <TabsContent value="Project Selection">
          <CardProject userDataProjet={userDataProjet} isError={isError} />
        </TabsContent>
      </Tabs>
    </section>
  );
}
