"use client"
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IoSearchSharp } from "react-icons/io5";

export default function SearchAndFilterComponent() {
  const [inputValue, setInputValue] = useState("");

  // Handle user input change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  // Handle Enter key press
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      console.log("User pressed Enter:", inputValue);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-between gap-5 pb-5">
      <div className="bg-background_light_mode dark:bg-card_color_dark text-text_color_desc_light dark:text-text_color_desc_dark flex items-center gap-3 px-5 py-3 rounded-xl">
        <IoSearchSharp />
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
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
  );
}

