"use client";

import { useForm } from "react-hook-form";

import { toast } from "@/components/hooks/use-toast";

import { useGetAllUserRepositoriesQuery } from "@/redux/service/git";
import { useCreateProjectNameMutation } from "@/redux/service/project";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export function ListRepoComponent() {
  const [isUserAccessToken, setIsUserAccessToken] = useState<any>("");
  const [createProject] = useCreateProjectNameMutation();
  const [selectedRepo, setSelectedRepo] = useState<any>(false);

  const [isLoading, setIsLoading] = useState(false);

  const { data: userRepo } = useGetAllUserRepositoriesQuery({
    accessToken: isUserAccessToken,
  });

  type ErrorResponse = {
    data?: {
      error?: {
        description?: string;
      };
    };
  };
  const { data: session } = useSession();

  const userData = () => {
    if (session) {
      const accessToken = (session as any).accessToken;
      setIsUserAccessToken(accessToken);
    } else {
    }
  };

  useEffect(() => {
    userData();
  }, [session]);

  const [selectedValues, setSelectedValues] = useState([]);

  const handleCheckboxChange = (event: any) => {
    const { value, checked } = event.target;

    setSelectedValues((prev: any) =>
      checked ? [...prev, value] : prev.filter((v: any) => v !== value)
    );
    const result = checked
      ? [...selectedValues, value]
      : selectedValues.filter((v) => v !== value);
  };

  type ProjectNameType = {
    projectName: string;
  };

  const handleSubmit = () => {
    try {
      createProject({ projectName: "test3" });
    } catch (error) {
      console.log(error);
    } finally {
      console.log("error");
    }
  };

  return (
    <section>
      {selectedRepo === true ? (
        <div className="grid grid-cols-3 gap-10">
          <div className="w-full  h-full md:h-[150px] my-5  p-5 border border-opacity-40 border-text_color_desc_light dark:border-primary_color rounded-[20px] ">
            <div className="flex justify-between w-full">
              <p className="text-text_body_16 text-secondary_color dark:text-text_color_dark ">
                test
              </p>
            </div>
            <hr className="my-5 dark:border-primary_color" />
            <p className=" text-left my-2 text-text_body_16 text-text_color_desc_light  dark:text-text_color_desc_dark ">
              {" "}
              Project&apos;s{" "}
              <span className="text-secondary_color truncate">test</span> is not
              analyzed yet.{" "}
            </p>{" "}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {userRepo?.map((repo: any, index: number) => (
            <label key={index}>
              <input
                className="mr-2 h-4 w-4"
                type="checkbox"
                value={repo?.full_name}
                onChange={handleCheckboxChange}
              />
              {repo?.full_name}
            </label>
          ))}
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-primary_color w-[100px] text-text_color_light  rounded-tl-[14px] rounded-br-[14px] text-text_body_16  py-1.5 "
          >
            Submit
          </button>
        </div>
      )}
    </section>
  );
}
