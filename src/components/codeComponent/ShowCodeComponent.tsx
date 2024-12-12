"use client";

import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileIcon} from "lucide-react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import DOMPurify from "dompurify";
import { useGetSourceCodeByLineQuery } from "@/redux/service/source";

type CodeViewerProps = Readonly<{
  componentKey: string;
}>;

export default function CodeViewer({ componentKey }: CodeViewerProps) {
  const {
    data: sourceData,
    error,
    isLoading,
  } = useGetSourceCodeByLineQuery({ componetKey: componentKey });

  useEffect(() => {
    Prism.highlightAll();
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">Loading...</div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8 text-red-500">
        Error loading source code.
      </div>
    );
  }

  const sanitizedCode = DOMPurify.sanitize(
    sourceData?.[0]?.sources
      .map(
        (line: { line: number; code: string }) =>
          ` ${String(line.line).padStart(3, " ")}: ${line.code}`
      )
      .join("\n") || ""
  );

  return (
    <Card className="w-full max-w-[88%] mx-auto">
      <div className="flex items-center justify-between border-b p-3">
        <div className="flex items-center gap-2">
          <FileIcon className="h-4 w-4 text-blue-500" />
          <span className="font-medium">django</span>
          <span className="text-muted-foreground">/Dockerfile</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Lines:</span>
            <span className="text-sm font-medium">
              {sourceData?.[0]?.sources.length || 0}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Security:</span>
            <span className="text-sm font-medium text-blue-500">0</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Reliability:</span>
            <span className="text-sm font-medium text-blue-500">0</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Maintainability:
            </span>
            <span className="text-sm font-medium text-blue-500">0</span>
          </div>
        </div>
      </div>
  
        <ScrollArea className="h-[600px] w-full">
          <pre className="language-js  p-4 rounded-b-lg">
            <code
              dangerouslySetInnerHTML={{
                __html: sanitizedCode,
              }}
            />
          </pre>
        </ScrollArea>
      
    </Card>
  );
}
