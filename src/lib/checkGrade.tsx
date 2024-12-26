import React from "react";

interface CheckGradeProps {
  parsedValue: any;
  index: number;
}

export default function CheckGrade({ parsedValue, index }: CheckGradeProps) {
  const getGrade = () => {
    if (parsedValue.INFO > 0) {
      return (
        <div
          key={index}
          className="w-[30px] h-[30px] flex items-center justify-center rounded-[5px] border border-primary_color"
        >
          A
        </div>
      );
    } else if (
      parsedValue.LOW > 0 &&
      parsedValue.LOW > parsedValue.INFO &&
      parsedValue.LOW > parsedValue.MEDIUM &&
      parsedValue.LOW > parsedValue.HIGH &&
      parsedValue.LOW > parsedValue.BLOCKER
    ) {
      return (
        <div
          key={index}
          className="w-[30px] h-[30px] flex items-center justify-center rounded-[5px] border border-[#60935D]"
        >
          B
        </div>
      );
    } else if (
      parsedValue.MEDIUM > 0 &&
      parsedValue.MEDIUM > parsedValue.INFO &&
      parsedValue.MEDIUM > parsedValue.LOW &&
      parsedValue.MEDIUM > parsedValue.HIGH &&
      parsedValue.MEDIUM > parsedValue.BLOCKER
    ) {
      return (
        <div
          key={index}
          className="w-[30px] h-[30px] flex items-center justify-center rounded-[5px] border border-[#F7DC6F]"
        >
          C
        </div>
      );
    } else if (
      parsedValue.HIGH > 0 &&
      parsedValue.HIGH > parsedValue.INFO &&
      parsedValue.HIGH > parsedValue.LOW &&
      parsedValue.HIGH > parsedValue.MEDIUM &&
      parsedValue.HIGH > parsedValue.BLOCKER
    ) {
      return (
        <div
          key={index}
          className="w-[30px] h-[30px] flex items-center justify-center rounded-[5px] border border-[#F9B800]"
        >
          D
        </div>
      );
    } else if (
      parsedValue.BLOCKER > 0 &&
      parsedValue.BLOCKER > parsedValue.INFO &&
      parsedValue.BLOCKER > parsedValue.LOW &&
      parsedValue.BLOCKER > parsedValue.MEDIUM &&
      parsedValue.BLOCKER > parsedValue.HIGH
    ) {
      return (
        <div
          key={index}
          className="w-[30px] h-[30px] flex items-center justify-center rounded-[5px] border border-[#EA4335]"
        >
          F
        </div>
      );
    } else {
      return (
        <div
          key={index}
          className="w-[30px] h-[30px] flex items-center justify-center rounded-[5px] border border-primary_color"
        >
          A
        </div>
      );
    }
  };

  return getGrade();
}
