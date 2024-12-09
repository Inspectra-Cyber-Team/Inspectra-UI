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
};

type tabMappingType = {
  [key: string]: string;
};

export const RiskComponent = ({
  selectedTab,
  description,
  issueKey,
  componentKey,
}: RiskComponentProps) => {

  console.log("isses", componentKey);
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
        // Combine source code with line numbers and comments
        const codeContent = dockerfileSources
          .map((source) => {
            const lineNumber = source.line || "// Missing line number";
            const code = source.code || "// No code provided for this line";
            const comment = source.comment || "// No comment provided";
            return `${lineNumber}: ${code}  // ${comment}`;
          })
          .join("\n\n");

        return `<pre class="prose prose-pre"><code class="language-js">${codeContent}</code></pre>`;
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
