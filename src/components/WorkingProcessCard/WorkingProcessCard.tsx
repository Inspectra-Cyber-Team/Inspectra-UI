import React from "react";

export default function WorkingProcessCard() {
  return (
    <div className="w-full px-4 md:px-10 lg:px-16 py-10 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-x-16 md:gap-y-10 place-items-center">
      {/* Card 1 */}
      <div className="w-[250px] h-[250px] md:h-[300px] bg-primary_color rounded-[50px] flex flex-col justify-center items-center self-start">
        <div className="w-full flex flex-col justify-around text-start px-5">
          <p className="text-text_color_light text-[40px] md:text-[60px] font-bold">
            1{" "}
            <span className="text-[72px] font-bold text-secondary_color">.</span>
          </p>
          <p className="text-text_title_24 font-semibold text-text_color_light">
            Upload
          </p>
          <p className="md:text-text_title_20 font-normal text-ascend_color">
            Upload Your Git Project URL
          </p>
        </div>
      </div>

      {/* Card 2 */}
      <div className="w-[250px] h-[250px] md:h-[300px] bg-text_color_dark rounded-[50px] flex flex-col justify-center items-center self-end md:translate-y-6 md:translate-x-24 xl:translate-x-0 md:mt-5">
        <div className="w-full flex flex-col justify-around text-start px-5">
          <p className="text-text_color_light text-[40px] md:text-[60px] font-bold">
            2{" "}
            <span className="text-[72px] font-bold text-secondary_color">.</span>
          </p>
          <p className="text-text_title_24 font-semibold text-text_color_light">
            Scan
          </p>
          <p className="md:text-text_title_20 font-normal text-ascend_color">
            Find Weakness Inside Your Project
          </p>
        </div>
      </div>

      {/* Card 3 */}
      <div className="w-[250px] h-[250px] md:h-[300px] bg-text_color_dark rounded-[50px] flex flex-col justify-center items-center self-start">
        <div className="w-full flex flex-col justify-around text-start px-5">
          <p className="text-text_color_light text-[40px] md:text-[60px] font-bold">
            3{" "}
            <span className="text-[72px] font-bold text-secondary_color">.</span>
          </p>
          <p className="text-text_title_24 font-semibold text-text_color_light">
            Report
          </p>
          <p className="md:text-text_title_20 font-normal text-ascend_color">
            Get Detail Report and Recommendation
          </p>
        </div>
      </div>

      {/* Card 4 */}
      <div className="w-[250px] h-[250px] md:h-[300px] bg-primary_color rounded-[50px] flex flex-col justify-center items-center self-end md:mt-5 md:translate-y-6 md:translate-x-24 xl:translate-x-0 mb-10 md:mb-0">
        <div className="w-full flex flex-col justify-around text-start px-5">
          <p className="text-text_color_light text-[40px] md:text-[60px] font-bold">
            4{" "}
            <span className="text-[72px] font-bold text-secondary_color">.</span>
          </p>
          <p className="text-text_title_24 font-semibold text-text_color_light">
            Export
          </p>
          <p className="md:text-text_title_20 font-normal text-ascend_color">
            Export as PDF for easy sharing
          </p>
        </div>
      </div>
    </div>
  );
}
