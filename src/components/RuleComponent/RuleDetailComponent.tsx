"use client";

import React, { useEffect } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import DOMPurify from "dompurify";

type RiskComponentProps = {
  selectedTab: string;
  description: any;
};

type tabMappingType = {
  [key: string]: string;
};

export const RuleDetailComponent = ({
  selectedTab,
  description,
}: RiskComponentProps) => {
  // highlighting the code to match with api response
  const tabMapping: tabMappingType = {
    "What is the risk?": "root_cause",
    "Access the risk": "assess_the_problem",
    "How I can fix it?": "how_to_fix",
  };

  useEffect(() => {
    Prism.highlightAll();
  });

  const getContent = () => {
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
    <div className="prose w-[90%] max-w-full dark:text-text_color_dark">
      <div dangerouslySetInnerHTML={{ __html: getContent() }} />
    </div>
  );
};

export default RuleDetailComponent;
