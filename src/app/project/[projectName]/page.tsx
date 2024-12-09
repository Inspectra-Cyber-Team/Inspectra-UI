"use client"
import { navProjectDetial } from "@/data/navProjectDetial";
import React from "react";

export type ParamProps = {
  params: {
    projectName: string;
  };
};

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import PageOverviewProjectDetail from "@/components/ProjectDetailComponents/PageOverviewProjectDetail";

export default function page({ params }: ParamProps) {
  const projectName = params.projectName;
  return (
    <main className="w-[90%] m-auto bg-card_color_light rounded h-auto p-5 my-10 dark:bg-card_color_dark">
      <Tabs defaultValue="Overview" className="">
        <TabsList className="grid w-full grid-cols-4 mb-5">
          {navProjectDetial.map((item, index: number) => (
             <TabsTrigger value={item.name} key={index} className="group relative pb-2 text-gray-500 hover:text-secondary_color transition mr-3">
              {item.name}
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-primary_color transition-all duration-300 group-hover:w-full"></span>
             </TabsTrigger>
          ))}
        </TabsList>
        
        <TabsContent value="Overview">
          <PageOverviewProjectDetail/>
        </TabsContent>
        {projectName}
      </Tabs>
    </main>
  );
}


