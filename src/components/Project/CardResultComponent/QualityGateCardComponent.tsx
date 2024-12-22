"use client";
import { useGetProjectByUserUuidQuery } from "@/redux/service/overview";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
export default function QualityCardComponent() {
  const [userUUID, setUserUUID] = useState("");
  const { data} = useGetProjectByUserUuidQuery({
    uuid: userUUID,
  });
  useEffect(() => {
    setUserUUID(localStorage.getItem("userUUID") || "");
  });
  return (
    <div className="w-full rounded-tl-[20px] rounded-[20px] h-[150px] bg-text_color_dark dark:bg-card_color_dark">
      {/* Header */}
      <div className="text-text_body_16 text-text_color_light rounded-tl-[20px] rounded-br-[20px] bg-primary_color flex justify-center items-center text-center h-[40px] w-[150px]">
        Quality Gate
      </div>

      {/* Data Processing */}
      {(() => {
        const statusCounts = data?.reduce(
          (counts: { passed: number; failed: number }, project: any) => {
            project?.branch?.forEach((branch: any) => {
              branch?.branches?.forEach((branchDetail: any) => {
                const status = branchDetail?.status?.qualityGateStatus;
                if (status === "OK") {
                  counts.passed += 1;
                } else {
                  counts.failed += 1;
                }
              });
            });
            return counts;
          },
          { passed: 0, failed: 0 }
        );

        return (
          <div className="w-full h-full my-5 px-10">
            {/* Passed Section */}
            <div className="flex text-center items-center justify-between my-5">
              <div className="flex">
                <div className="w-[25px] h-[25px] flex items-center justify-center rounded-[5px] bg-primary_color">
                  <FaCheck className="text-text_color_light" />
                </div>
                <p className="px-2 text-text_color_light dark:text-text_color_dark text-text_body_16">
                  Passed
                </p>
              </div>
              <p className="text-text_color_desc_light dark:text-text_color_desc_dark text-text_body_16">
                {statusCounts?.passed ?? 0}
              </p>
            </div>

            {/* Failed Section */}
            <div className="flex text-center items-center justify-between my-5">
              <div className="flex">
                <div className="w-[25px] h-[25px] flex items-center justify-center rounded-[5px] bg-custom_red">
                  <RxCross2 className="text-text_color_light" />
                </div>
                <p className="px-2 text-text_color_light dark:text-text_color_dark text-text_body_16">
                  Failed
                </p>  
              </div>
              <p className="text-text_color_desc_light dark:text-text_color_desc_dark text-text_body_16">
                {statusCounts?.failed ?? 0}
              </p>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
