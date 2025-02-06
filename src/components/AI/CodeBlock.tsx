"use client";
import { useEffect, useRef, useState } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-light.css";
import { Copy } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const CodeBlock = ({ code, language }: { code: string; language?: string }) => {
  const codeRef = useRef<HTMLElement>(null);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    if (codeRef.current) {
      hljs.highlightElement(codeRef.current);
    }
  },[code]);

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
    <div className="relative rounded-md bg-gray-100 border dark:bg-gray-900 p-4 overflow-auto">
      <div className="flex justify-between items-center mb-2">
        {language && (
          <div className="text-xs font-semibold text-gray-500 dark:text-gray-400">
            {language}
          </div>
        )}
        <TooltipProvider>
          <Tooltip delayDuration={100}>
            <TooltipTrigger>
              <button
                onClick={copyToClipboard}
                className="text-gray-500 dark:text-gray-300"
                aria-label="Copy to clipboard"
              >
                <Copy className="h-4 w-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent className="bg-gray-800 text-white">
              Copy
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <pre>
        <code className={`language-${language} overflow-auto scrollbar-hide dark:text-text_color_dark`} ref={codeRef}>
          {code}
        </code>
      </pre>
      {copySuccess && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 text-sm bg-secondary_color text-black rounded-md shadow-md z-20">
          Copied!
        </div>
      )}
    </div>
  );
};

const ResponseContent = ({ content }: { content: string }) => {
  const parseMarkdown = (text: string) => {
    const blocks: JSX.Element[] = [];
    const regex = /```(\w+)?\n([\s\S]+?)\n```|`([^`]+)`/g;
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        blocks.push(
          <p
            key={`text-${lastIndex}`}
            className="mb-2  rounded-md"
            dangerouslySetInnerHTML={{ __html: formatText(text.slice(lastIndex, match.index)) }}
          />
        );
      }
      if (match[3]) {
        blocks.push(
          <code
            key={`inline-${match.index}`}
            className="bg-gray-200  px-1 rounded "
          >
            {match[3]}
          </code>
        );
      } else {
        blocks.push(
          <CodeBlock
            key={`code-${match.index}`}
            code={match[2]}
            language={match[1] || "plaintext"}
          />
        );
      }
      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      blocks.push(
        <p
          key={`text-end`}
          className="p-2 rounded-md"
          dangerouslySetInnerHTML={{ __html: formatText(text.slice(lastIndex)) }}
        />
      );
    }

    return blocks;
  };

  const formatText = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/(^|\n)[*-] (.*?)/g, "<ul><li>$2</li></ul>")
      .replace(/\[(.*?)\]\((https?:\/\/[^\s]+)\)/g, '<a href="$2" target="_blank" class="text-text_color_light dark:text-text_color_dark underline">$1</a>');
  };

  return <section className="max-w-lg">{parseMarkdown(content)}</section>;
};

export default ResponseContent;






// 'use client'
// import { useEffect, useRef, useState } from "react";
// import hljs from "highlight.js";
// import "highlight.js/styles/atom-one-light.css"; // Light theme for syntax highlighting code color
// import { Copy } from "lucide-react";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip"

// import "highlight.js/styles/atom-one-light.css";


// const CodeBlock = ({ code, language  }: { code: string, language?: string }) => {

//   const codeRef = useRef<HTMLElement>(null);

//   const [copySuccess, setCopySuccess] = useState(false);

//   useEffect(() => {
//     if (codeRef.current) {
//       hljs.highlightElement(codeRef.current);
//     }
//   }, [code]);

//   const copyToClipboard = async () => {
//     try {
//       await navigator.clipboard.writeText(code);
//       setCopySuccess(true);
//       setTimeout(() => setCopySuccess(false), 1500);
//     } catch (err) {
//       console.error("Failed to copy:", err);
//     }
//   };

//   return (
//     <div className="relative rounded-md max-w-1/2">
//       {/* Flex container for language and copy button */}
//       <div className="flex justify-between items-center">
//         {language && (
//           <div className="text-[10px] md:text-xs  text-black rounded-md dark:text-text_color_dark">
//             {language}
//           </div>
//         )}
//         <TooltipProvider>
//           <Tooltip delayDuration={100}>
//             <TooltipTrigger>
//               <button
//                 onClick={copyToClipboard}
//                 className="text-black  rounded-md focus:outline-none dark:text-text_color_dark"
//                 aria-label="Copy to clipboard"
//               >
//                 <Copy className="md:h-4 md:w-4 h-2 w-2" />
//               </button>
//             </TooltipTrigger>
//             <TooltipContent className="text-black bg-primary_color ">
//               <div>Copy</div>
//             </TooltipContent>
//           </Tooltip>
//         </TooltipProvider>
//       </div>
      
//       <pre className=" sm:p-4 rounded-md bg-transparent text-black dark:bg-background_dark_mode dark:text-white relative">
//         <code className={`language-${language} dark:text-white`}  ref={codeRef}>{code}</code>
//       </pre>
      
//       {/* Copy confirmation message */}
//       {copySuccess && (
//         <div className="absolute top-0 left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 text-sm text-black bg-primary_color rounded-md shadow-md z-20">
//           Copied!
//         </div>
//       )}
//     </div>
    
//   );
// };


// const ResponseContent = ({ content }: { content: string }) => {

//   const isCodeBlock = (text: string) => text.startsWith("```") && text.endsWith("```");

//   const extractCode = (text: string) => {
   
//     return text.slice(text.indexOf("\n") + 1, -3).trim();

//   };

//   const extractLanguage = (text: string) => {
//     const languageMatch = text.match(/^```(\w+)/);
//     return languageMatch ? languageMatch[1] : "plaintext";
//   };

//   const formatText = (text: string) => {
//   return text
//     .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold: **text**
//     .replace(/\*(.*?)\*/g, '<em>$1</em>') // Italic: *text*
//     .replace(/(^|\n)[*-] (.*?)/g, '<ul><li>$2</li></ul>') // Lists: - or * at the beginning
//     .replace(/\[(.*?)\]\((https?:\/\/[^\s]+)\)/g, (match, p1, p2) => {
//       return `<a href="${p2}" target="_blank" class="text-blue-499 underline">${p1}</a>`;
//     }) // Links with [text](url)
// };



//   return (
//     <section className="w-full">
//       {isCodeBlock(content) ? (
//         <CodeBlock code={extractCode(content)} language={extractLanguage(content)} />
//       ) : (
//         <p className="overflow-auto scrollbar-hide" dangerouslySetInnerHTML={{ __html: formatText(content) }} />
//       )}
//       {/* handle when no content */}
//     </section>
//   );
// };

// export default ResponseContent;