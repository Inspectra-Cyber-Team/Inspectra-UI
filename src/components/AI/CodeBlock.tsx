import { useEffect, useRef, useState } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-light.css"; // Light theme for syntax highlighting code color
import { FaCopy } from "react-icons/fa"; // Copy icon from react-icons
import { Copy } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const CodeBlock = ({ code, language }: { code: string, language?: string }) => {

  const codeRef = useRef<HTMLElement>(null);

  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    if (codeRef.current) {
      hljs.highlightElement(codeRef.current);
    }
  }, [code]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 1500);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="relative rounded-md max-w-1/2">
      {/* Flex container for language and copy button */}
      <div className="flex justify-between items-center">
        {language && (
          <div className="text-[10px] md:text-xs  text-black rounded-md dark:text-text_color_dark">
            {language}
          </div>
        )}
        <TooltipProvider>
          <Tooltip delayDuration={100}>
            <TooltipTrigger>
              <button
                onClick={copyToClipboard}
                className="text-black  rounded-md focus:outline-none dark:text-text_color_dark"
                aria-label="Copy to clipboard"
              >
                <Copy className="md:h-4 md:w-4 h-2 w-2" />
              </button>
            </TooltipTrigger>
            <TooltipContent className="text-black bg-primary_color ">
              <div>Copy</div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <pre className=" sm:p-4 rounded-md bg-transparent text-black dark:bg-background_dark_mode dark:text-white relative">
        <code className="dark:text-white " ref={codeRef}>{code}</code>
      </pre>
      
      {/* Copy confirmation message */}
      {copySuccess && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 text-sm text-black bg-primary_color rounded-md shadow-md z-20">
          Copied!
        </div>
      )}
    </div>
    
  );
};


const ResponseContent = ({ content }: { content: string }) => {

  const isCodeBlock = (text: string) => text.startsWith("```") && text.endsWith("```");

  const extractCode = (text: string) => {
   
    return text.slice(text.indexOf("\n") + 1, -3).trim();

  };

  const extractLanguage = (text: string) => {
    const languageMatch = text.match(/^```(\w+)/);
    return languageMatch ? languageMatch[1] : "plaintext";
  };

  // Format text with bold, italics, and lists
  const formatText = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold: **text**
      .replace(/\*(.*?)\*/g, '<em>$1</em>') // Italic: *text*
      .replace(/(^|\n)[*-] (.*?)/g, '<ul className="style=display: inline;"><li>$2</li></ul>') // Lists
      .replace(/\bhttps?:\/\/[^\s]+/g, (url) => `<a href='${url}' target='_blank' class='text-blue-500 underline '>${url}</a>`); // Links
  };

  return (
    <section className="w-full">
      {isCodeBlock(content) ? (
        <CodeBlock code={extractCode(content)} language={extractLanguage(content)} />
      ) : (
        <p className="overflow-auto scrollbar-hide" dangerouslySetInnerHTML={{ __html: formatText(content) }} />
      )}
      {/* handle when no content */}
    </section>
  );
};

export default ResponseContent;
