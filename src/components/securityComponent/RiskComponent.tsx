"use client";

import React, { useEffect } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import DOMPurify from "dompurify";
import { useGetSouceQuery } from "@/redux/service/source";

type RiskComponentProps = {
  selectedTab: string;
  description: any;
  issueKey: string;
  componentKey: string;
  startLineNumber?: number;
  message?: string;
};

type tabMappingType = {
  [key: string]: string;
};

export const RiskComponent = ({
  selectedTab,
  description,
  issueKey,
  componentKey,
  startLineNumber,
  message,
}: RiskComponentProps) => {
  // highlighting the code to match with api response
  const tabMapping: tabMappingType = {
    "Where is the risk?": "",
    "What is the risk?": "root_cause",
    "Access the risk": "assess_the_problem",
    "How I can fix it?": "how_to_fix",
  };

  //get source code in where is the risk tab
  const {
    data: sourceData,
    error: sourceError,
    isLoading: sourceIsLoading,
  } = useGetSouceQuery({ issueKey: issueKey });

  console.log("sourceData", sourceData);

  useEffect(() => {
    Prism.highlightAll();
  }, [selectedTab, description]);

  if (sourceIsLoading) {
    return <p>Loading...</p>;
  }

  if (sourceError) {
    return <p>Error loading source code.</p>;
  }

  const getContent = () => {
    if (selectedTab === "Where is the risk?") {
      if (sourceIsLoading) return "Loading source data...";

      if (sourceError || !sourceData) {
        return "Source data not available.";
      }

      // Extract the sources from the nested "django:Dockerfile" property
      const dockerfileSources = sourceData?.data[componentKey]?.sources;

      if (dockerfileSources && Array.isArray(dockerfileSources)) {
        const codeContent = dockerfileSources

          .map((source) => {

            const lineNumber = source?.line;

            const code = source?.code;

            // Base line structure
            let result = `${lineNumber}: ${code}`;

            return result;
          })

          .join("\n\n");

        // Find the line that matches startLineNumber and add the error message
        const errorMessage = dockerfileSources
          .filter((source) => source?.line === startLineNumber)
          .map((source) => {
            return `<div class="error-message">/* ${message} */</div>`;
          })
          .join("\n");

        // Insert the error message directly below the matching line
        const finalContent = codeContent
          .split("\n")
          .map((line, index) => {
            if (line.startsWith(`${startLineNumber}:`)) {
              return `${line}\n</code></pre>\n${errorMessage}<pre class="prose prose-pre"><code class="language-js">`;
            }
            return line;
          })
          .join("\n");

        return `
          <pre class="prose prose-pre">
            <code class="language-js">${finalContent}</code>
          </pre>
        `;
      }

      return "No Dockerfile sources available.";
    }

    const sectionKey = tabMapping[selectedTab];
    const section = description.find((item: any) => item.key === sectionKey);
    let rawContent = section ? section.content : "Content not available.";

    // Replace <h1>, <h2>, <pre>, <code> tags with prose classes
    rawContent = rawContent
      .replace(/<h1>/g, '<h1 class="prose prose-h1">')
      .replace(/<h2>/g, '<h2 class="prose prose-h2">')
      .replace(
        /<pre>/g,
        '<pre class="prose prose-pre"><code class="language-js">'
      )
      .replace(/<\/pre>/g, "</code></pre>")
      .replace(/<code>/g, '<code class="prose prose-code">');

    // Sanitize the content
    const sanitizedContent = DOMPurify.sanitize(rawContent);

    return sanitizedContent;
  };

  return (
    <div className="mt-4 prose ">
      <div dangerouslySetInnerHTML={{ __html: getContent() }} />
    </div>
  );
};

export default RiskComponent;
