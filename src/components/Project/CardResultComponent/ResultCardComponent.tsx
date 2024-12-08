import React from "react";

import { facetsData } from "@/data/facets";
import Image from "next/image";
import {
  FacetItem,
  DuplicationItem,
  FacetValue,
  CoverageItem,
} from "@/types/ProjectType";
export default function ResultCardComponent() {
  return (
    <div>
      {facetsData.facets.map((item: FacetItem, index: number) => {
        if (item.property === "Coverage") {
          return (
            <div
              key={`coverage-${index}`}
              className="w-full rounded-tl-[20px] rounded-[20px] h-full mt-10 bg-text_color_dark dark:bg-card_color_dark"
            >
              <div className="text-text_body_16 text-text_color_light rounded-tl-[20px] rounded-br-[20px] bg-primary_color flex justify-center items-center text-center h-[40px] w-[150px]">
                Coverage
              </div>
              <div className="w-full h-full my-2 px-5 py-2">
                {facetsData.coverage.map(
                  (coverageItem: CoverageItem, coverageIndex: number) => (
                    <div
                      key={`coverage-item-${coverageIndex}`}
                      className="w-full h-full my-5 pr-5 pl-2"
                    >
                      <div className="flex text-center items-center justify-between my-5">
                        {/* Image and Text Container */}
                        <div className="flex items-center justify-center">
                          {/* Conditionally Render Image */}
                          {coverageItem?.image ? (
                            <div className="w-[50px] h-[50px] flex items-center justify-center">
                              <Image
                                width={50}
                                height={50}
                                alt="coverage"
                                src={coverageItem.image}
                              />
                            </div>
                          ) : null}
                          {/* Text */}
                          <p className="px-2 text-text_color_light dark:text-text_color_dark text-text_body_16">
                            {coverageItem?.percent || "No Data"}
                          </p>
                        </div>

                        {/* Right-Side Text */}
                        <p className="text-text_color_desc_light dark:text-text_color_desc_dark text-text_body_16">
                          0
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          );
        } else if (item.property === "Duplicated") {
          return (
            <div
              key={`duplication-${index}`}
              className="w-full rounded-tl-[20px] rounded-[20px] h-full mt-10 bg-text_color_dark dark:bg-card_color_dark"
            >
              {/* Duplication Header */}
              <div className="text-text_body_16 text-text_color_light rounded-tl-[20px] rounded-br-[20px] bg-primary_color flex justify-center items-center text-center h-[40px] w-[150px]">
                Duplication
              </div>

              {/* Duplication Items */}
              <div className="w-full h-full my-2 py-2">
                {facetsData.duplication.map(
                  (
                    duplicationItem: DuplicationItem,
                    duplicationIndex: number
                  ) => (
                    <div
                      key={`duplication-item-${duplicationIndex}`}
                      className="w-full h-full my-5 pr-12 pl-10"
                    >
                      <div className="flex text-center items-center justify-between my-5">
                        {/* Image and Text Container */}
                        <div className="flex items-center justify-center">
                          {/* Conditionally Render Image */}
                          {duplicationItem?.image ? (
                            <div className="w-[50px] h-[50px] mt-2 flex items-center justify-center">
                              <Image
                                width={50}
                                height={50}
                                alt="duplication"
                                src={duplicationItem.image}
                              />
                            </div>
                          ) : null}
                          {/* Text */}
                          <p className="px-2 text-text_color_light dark:text-text_color_dark mt-2 text-text_body_16">
                            {duplicationItem?.percent || "No Data"}
                          </p>
                        </div>

                        {/* Right-Side Text */}
                        <p className="text-text_color_desc_light dark:text-text_color_desc_dark text-text_body_16">
                          0
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          );
        } else {
          return (
            <div
              key={`other-${index}`}
              className="w-full rounded-tl-[20px] rounded-[20px] h-full mt-10 bg-text_color_dark dark:bg-card_color_dark"
            >
              <div className="text-text_body_16 text-text_color_light rounded-tl-[20px] rounded-br-[20px] bg-primary_color flex justify-center items-center text-center h-[40px] w-[150px]">
                {item.property}
              </div>
              <div className="w-full h-full my-2 px-10 py-2">
                {item.values.map((value: FacetValue, id: number) => {
                  const gradeData = facetsData.values[id] || {};
                  return (
                    <div
                      key={`other-item-${id}`}
                      className="flex text-center items-center justify-between my-5"
                    >
                      <div className="flex text-center items-center">
                        <div
                          className="w-[30px] h-[30px] flex items-center justify-center text-text_color_light dark:text-text_color_dark rounded-[5px]"
                          style={{
                            border: `1px solid ${
                              gradeData.borderColor || "#ffffff"
                            }`,
                          }}
                        >
                          {gradeData.grade || ""}
                        </div>
                        <p className="px-2 text-text_color_light dark:text-text_color_dark text-text_body_16">
                          {gradeData.result || "No Result"}
                        </p>
                      </div>
                      <p className="text-text_color_desc_light dark:text-text_color_desc_dark text-text_body_16">
                        0
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        }
      })}
    </div>
  );
}


