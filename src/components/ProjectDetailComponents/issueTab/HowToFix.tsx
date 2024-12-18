import { useGetRulesByRuleNameQuery } from "@/redux/service/rule";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import React, { useEffect } from "react";

export default function HowToFix({ ruleKey }: any) {
  const { data: ruleIssue } = useGetRulesByRuleNameQuery({ ruleName: ruleKey });

  console.log(ruleIssue)

  useEffect(() => {
    // Run Prism's highlightAll function when ruleIssue changes or component mounts
    Prism.highlightAll();
  }, [ruleIssue]); // Only run when ruleIssue data changes
  if (ruleIssue === undefined) console.log("No data");
  return (
    <div>
      {ruleIssue?.map((rule: any) =>
        rule?.descriptionSections?.map((ruleDes: any, descIndex: number) => {
          return (
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
                className="language-javascript  break-words whitespace-normal "
                dangerouslySetInnerHTML={{ __html: ruleDes.content }}
              ></code>
            </pre>
          );
        })
      )}
    </div>
  );
}
