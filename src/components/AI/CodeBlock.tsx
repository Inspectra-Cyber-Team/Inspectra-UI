import { useEffect, useRef } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-light.css" // Pick a theme

const CodeBlock = ({ code }: { code: string }) => {
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (codeRef.current) {
      hljs.highlightElement(codeRef.current);
    }
  }, [code]);

  return (
    <pre className=" text-white p-2 rounded-md dark:bg-background_dark_mode dark:text-text_color_dark">
      <code ref={codeRef}>{code}</code>
    </pre>
  );
};

const ResponseContent = ({ content }: { content: string }) => {
  // Detects **only valid multi-line** code blocks
  const isCodeBlock = (text: string) => {
    return text.startsWith("```") && text.endsWith("```");
  };

  // Extract code content without extra logic
  const extractCode = (text: string) => text.slice(3, -3).trim();

  return (
    <div>
      {isCodeBlock(content) ? (
        <CodeBlock code={extractCode(content)} />
      ) : (
        <p>{content}</p>
      )}
    </div>
  );
};

export default ResponseContent;
