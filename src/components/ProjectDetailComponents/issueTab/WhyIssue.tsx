import { useGetRulesByRuleNameQuery } from "@/redux/service/rule";
import Prism from "prismjs";
import { useEffect } from "react";
import { Poppins } from "next/font/google";
import { useTheme } from "next-themes";

// Import our custom Prism theme
import "@/components/ProjectDetailComponents/issueTab/styles/prism-theme.css";

// Initialize the Poppins font
const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600"],
  subsets: ["latin"],
});

export default function WhyIssue({ ruleKey }: { ruleKey: string }) {
  const { data: ruleIssue } = useGetRulesByRuleNameQuery({ ruleName: ruleKey });
  const { theme } = useTheme();

  useEffect(() => {
    // Run Prism's highlightAll function when ruleIssue changes, component mounts, or theme changes
    Prism.highlightAll();
  }, [ruleIssue, theme]); // Run when ruleIssue data or theme changes

  return (
    <div className={`${poppins.className} ${theme === "dark" ? "dark" : ""}`}>
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
