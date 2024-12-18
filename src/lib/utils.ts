import { facetsData } from "@/data/facets";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertToDayMonthYear(timestamp: string) {
  // Parse the timestamp into a Date object
  const date = new Date(timestamp);

  // Extract the day, month, and year
  const day = date.getDate().toString().padStart(2, "0"); // Ensure two digits
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-indexed
  const year = date.getFullYear();

  // Format as day-month-year
  return `${day}-${month}-${year}`;
}

// count down verify otp
export function startCountdown(minutes: number) {
  let timeRemaining = minutes * 60; // Convert minutes to seconds
  const timerInterval = setInterval(() => {
    const minutesLeft = Math.floor(timeRemaining / 60);
    const secondsLeft = timeRemaining % 60;

    // Format the time as MM:SS
    const formattedTime = `${String(minutesLeft).padStart(2, "0")}:${String(
      secondsLeft
    ).padStart(2, "0")}`;
    console.log(formattedTime); // Display the countdown in the console

    if (timeRemaining <= 0) {
      clearInterval(timerInterval); // Stop the timer
      console.log("Countdown complete!");
    }

    timeRemaining--; // Decrease the time remaining by 1 second
  }, 1000);
}

export function timeSince(timestamp: string) {
  const givenTime = new Date(timestamp);
  const currentTime = new Date();
  const differenceInSeconds = Math.floor(
    (currentTime.getTime() - givenTime.getTime()) / 1000
  );

  const units = [
    { label: "year", seconds: 60 * 60 * 24 * 365 },
    { label: "month", seconds: 60 * 60 * 24 * 30 },
    { label: "week", seconds: 60 * 60 * 24 * 7 },
    { label: "day", seconds: 60 * 60 * 24 },
    { label: "hour", seconds: 60 * 60 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];

  for (const unit of units) {
    const interval = Math.floor(differenceInSeconds / unit.seconds);
    if (interval >= 1) {
      return `${interval} ${unit.label}${interval > 1 ? "s" : ""} ago`;
    }
  }
  return "just now";
}

// Function to determine case based on percent
export function getDuplicationData(duplicatedLinesDensity: any) {
  switch (true) {
    case duplicatedLinesDensity < 3:
      return facetsData.duplication[0]; // < 3%
    case duplicatedLinesDensity >= 3 && duplicatedLinesDensity < 5:
      return facetsData.duplication[1]; // 3% - 5%
    case duplicatedLinesDensity >= 5 && duplicatedLinesDensity < 10:
      return facetsData.duplication[2]; // 5% - 10%
    case duplicatedLinesDensity >= 10 && duplicatedLinesDensity < 20:
      return facetsData.duplication[3]; // 10% - 20%
    case duplicatedLinesDensity >= 20:
      return facetsData.duplication[4]; // > 20%
    default:
      return facetsData.duplication[5]; // No Data
  }
}

// Function to determine case based on coverage value
export function getCoverageData(coverageValue: any) {
  switch (true) {
    case coverageValue > 80:
      return facetsData.coverage[0]; // > 80%
    case coverageValue >= 70 && coverageValue <= 80:
      return facetsData.coverage[1]; // 70% - 80%
    case coverageValue >= 50 && coverageValue < 70:
      return facetsData.coverage[2]; // 50% - 70%
    case coverageValue >= 30 && coverageValue < 50:
      return facetsData.coverage[3]; // 30% - 50%
    case coverageValue < 30:
      return facetsData.coverage[4]; // < 30%
    case coverageValue === 0.0:
      return facetsData.coverage[5]; // 0%
  }
}

export function sliceString(str: string) {
  return str?.replaceAll(/project-[a-f0-9\-]{36}/g, "...");
}

export function convertToHTML(apiResponseText: any) {
  // Create a DOMParser instance
  const parser = new DOMParser();

  // Parse the text as HTML
  const parsedHTML = parser.parseFromString(apiResponseText, "text/html");

  // Return the inner content as proper HTML
  return parsedHTML.body.innerHTML;
}

export function formatTimestamp(timestamp: any) {
  const date = new Date(timestamp);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true, // for AM/PM format
  };

  return date.toLocaleString("en-US", options).replace(",", " at");
}

// regex for more info tab
export function convertApiResponseToHtml(apiResponse: any) {
  // Match all <a>, <h3>, and <li> tags and their content within the apiResponse
  const regex =
    /<(a href="([^"]+)">([^<]+)<\/a>)|(<h3>([^<]+)<\/h3>)|(<li>([^<]+)<\/li>)/g;

  // Process the API response and replace the tags with the desired format
  const htmlOutput = apiResponse.replace(
    regex,
    (
      match: any,
      aTag: any,
      url: any,
      aText: any,
      h3Tag: any,
      h3Text: any,
      liTag: any,
      liText: any
    ) => {
      // Check if it's an <a> tag, <h3> tag, or <li> tag
      if (aTag) {
        return `<a href="${url}" target="_blank" rel="noopener noreferrer" style="color: #0000EE; text-decoration: underline;" class="link">${aText}</a>`;
      } else if (h3Tag) {
        return `<h3>${h3Text}</h3>`;
      } else if (liTag) {
        return `<li ">${liText}</li>`;
      }
      return match;
    }
  );

  return htmlOutput;
}

export const getLabelGrade = (value: number) => {
  if (value > 0) {
    if (value >= 10) return "A"; // Assign A for values 10 or more
    if (value >= 7) return "B"; // Assign B for values between 7 and 9
    if (value >= 5) return "C"; // Assign C for values between 5 and 6
    if (value >= 2) return "D"; // Assign D for values between 2 and 4
    return "E"; // Assign E for values 1 or less
  }
  return "F"; // Return F for 0 or negative values
};
