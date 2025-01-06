import { useGetRulesByRuleNameQuery } from "@/redux/service/rule";
import Prism from "prismjs";
import { useEffect } from "react";

export default function WhyIssue({ ruleKey }: { ruleKey: string }) {
  const { data: ruleIssue } = useGetRulesByRuleNameQuery({ ruleName: ruleKey });

  useEffect(() => {
    Prism.highlightAll();
  }, [ruleIssue]);

  return (
    <div>
      {ruleIssue?.map((rule: any) =>
        rule?.descriptionSections?.map((ruleDes: any, descIndex: number) => {
          return ruleDes?.key === "root_cause" ? (
            <pre
              key={descIndex}
              className="bg-transparent p-0 m-0 w-full h-full"
              style={{
                fontFamily: "inherit",
              }}
            >
              <code
                className="language-javascript break-words whitespace-normal"
                dangerouslySetInnerHTML={{ __html: ruleDes.content }}
              ></code>
            </pre>
          ) : null;
        })
      )}
    </div>
  );
}
