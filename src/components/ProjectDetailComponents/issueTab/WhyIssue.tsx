import { useGetRulesByRuleNameQuery } from "@/redux/service/rule";
import React, { useEffect } from "react";

import Prism from "prismjs";
import "prismjs/themes/prism.css";
export default function WhyIssue({ ruleKey }: any) {
  const { data: ruleIssue } = useGetRulesByRuleNameQuery({ ruleName: ruleKey });

  useEffect(() => {
    // Run Prism's highlightAll function when ruleIssue changes or component mounts
    Prism.highlightAll();
  }, [ruleIssue]); // Only run when ruleIssue data changes

  return (
    <div>
      {ruleIssue?.map((rule: any) =>
        rule?.descriptionSections?.map((ruleDes: any, descIndex: number) => {
          return ruleDes?.key === "root_cause" ? (
            <pre
              key={descIndex}
              style={{
                background: "transparent",
                paddingLeft: "0", // Add this line
                paddingTop: "0",
                margin: 0,
                width: "100%",
                height: "100%",
              }}
            >
              <code
                className="language-javascript break-words whitespace-normal "
                dangerouslySetInnerHTML={{ __html: ruleDes.content }}
              ></code>
            </pre>
          ) : null; // Return null for non-matching cases
        })
      )}
    </div>
  );
}
