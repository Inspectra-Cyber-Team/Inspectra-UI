"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileIcon } from "lucide-react";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton"
import { useGetSourceCodeByLineQuery } from "@/redux/service/source";

type LineData = {
  line: number;
  code: string;
  scmAuthor: string;
  scmRevision: string;
  scmDate: string;
};


type CodeViewerProps = Readonly<{
  componentKey: string;
}>;

export default function CodeViewer({ componentKey }: CodeViewerProps) {
  const [showAlert, setShowAlert] = useState(false);
  const [alertPosition, setAlertPosition] = useState<{ top: number; left: number } | null>(null); // Store alert position
  const [alertData, setAlertData] = useState<{ scmAuthor: string, scmRevision: string, scmDate: string } | null>(null); // Store SCM data for the alert


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
      <div className="w-full h-screen mx-auto max-w-[88%]">
      <Skeleton className="w-full h-[100px]" />
      <Skeleton className="border-b mt-1" /> 
      <Skeleton className="w-full h-[50%]" />
    </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8 text-red-500">
        <img className="max-w-lg rounded-sm h-full" src="/images/error1.png" alt="error"  />
      </div>
    );
  }

  const handleCodeClick = (event: React.MouseEvent, line: LineData) => {
    const { clientY, clientX } = event; // Get the mouse click position
    setAlertPosition({ top: clientY, left: clientX }); // Set the alert position

    // Store SCM data for the clicked line
    setAlertData({
      scmAuthor: line.scmAuthor,
      scmRevision: line.scmRevision,
      scmDate: line.scmDate,
    });

    setShowAlert(true);
// Automatically hide the alert after 3 seconds
    setTimeout(() => setShowAlert(false), 3000)
  };


  return (
    <section>
      <Card className="w-full max-w-[88%] mx-auto">
        <div className="flex items-center justify-between border-b p-5 ">
          <div className="flex items-center gap-2">
            <FileIcon className="h-4 w-4 text-blue-500" />
            <span className="font-medium">django</span>
            <span className="text-muted-foreground">/Dockerfile</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Lines:</span>
              <span className="text-sm font-medium">
                {sourceData?.[0]?.sources?.length || 0}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Security:</span>
              <span className="text-sm font-medium text-blue-500">0</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Reliability:
              </span>
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

        <ScrollArea className="h-screen w-full bg-[#f5f5f5] ">
          <div className=" rounded-b-lg  p-4 ">
            {sourceData?.[0]?.sources?.map(
              (line: LineData) => {
                const authorName = line.scmAuthor.split("@")[0];
                const formattedHTML = `<span class="line-number">${String(
                  line.line
                ).padStart(3, " ")}</span>: ${line.code}`;
                return (
                  <button
                    key={line.line}
                    className="flex gap-10"
                    onClick={(event) => handleCodeClick(event, line)}
                  >
                    <div>
                      <span className="author text-[13px]">{authorName}</span>
                    </div>
                    <div className="language-js px-2 w-full hover:bg-white hover:cursor-pointer hover:rounded-sm ">
                      <code
                        dangerouslySetInnerHTML={{
                          __html: formattedHTML,
                        }}
                      />
                    </div>
                  </button>
                );
              }
            )}
          </div>
        </ScrollArea>
      </Card>
      {showAlert && alertPosition && alertData && (
        <section
          style={{
            position: "absolute",
            top: alertPosition.top + 10, // Adjust the vertical position
            left: alertPosition.left + 10, // Adjust the horizontal position
            zIndex: 1000,
            transition: "top 0.3s, left 0.3s",
          }}
        >
          <Alert className="max-w-md mx-auto">
            <AlertDescription> 
              <div className="mt-2"><strong >Author:</strong> {alertData.scmAuthor}</div>
              <div className="mt-2"><strong >Revision: </strong> {alertData.scmRevision}</div>
              <div className="mt-2"><strong >Committed on: </strong> {new Date(alertData.scmDate).toLocaleString()}</div>
            </AlertDescription>
          </Alert>
        </section>
      )}
    </section>
  );
}
