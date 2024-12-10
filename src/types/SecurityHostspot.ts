 export type Hotspot = {
    key: string;
    component: string;
    project: string;
    securityCategory: string;
    vulnerabilityProbability: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
    status: "TO_REVIEW" | "RESOLVED" | "IN_PROGRESS"; // Update with more statuses as needed
    line: number;
    message: string;
    author: string;
    creationDate: string; // ISO 8601 date format
    updateDate: string; // ISO 8601 date format
    textRange: {
      startLine: number;
      endLine: number;
      startOffset: number;
      endOffset: number;
    };
    flows: any[]; // Update `any` with the appropriate type if known
    ruleKey: string;
    messageFormattings: any[]; // Update `any` with the appropriate type if known
  };
  
 export type HotspotsList = Hotspot[];
  