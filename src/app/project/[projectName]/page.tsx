"use client";
import CodeComponent from "@/components/codeComponent/CodeComponent";
import IusseComponent from "@/components/ProjectDetailComponents/issueTab/IusseComponent";
import PageOverviewProjectDetail from "@/components/ProjectDetailComponents/PageOverviewProjectDetail";
import SecurityComponent from "@/components/securityComponent/SecurityComponent";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export type ParamProps = {
  params: {
    projectName: string;
  };
};

export default function page({ params }: ParamProps) {
  const projectName = params.projectName;

  return (
    <main className="w-[90%] m-auto rounded-[20px] bg-card_color_light  h-auto p-5 my-10 dark:bg-background_dark_mode">
      <Tabs defaultValue="Overview">
        <TabsList className="flex  w-full mx-auto mb-10  justify-between text-center !bg-transparent overflow-x-auto scrollbar-hide overflow-y-hidden">
          <TabsTrigger
            value="Overview"
            className=" data-[state=active]:shadow-none  data-[state=active]:rounded-none data-[state=active]:border-b-2  dark:data-[state=active]:bg-transparent data-[state=active]:border-ascend_color data-[state=active]:text-acborder-ascend_color"
          >
            Overview
          </TabsTrigger>
          <p className="mx-2">|</p>
          <TabsTrigger
            value="Issue"
            className=" data-[state=active]:shadow-none  dark:data-[state=active]:bg-transparent data-[state=active]:rounded-none data-[state=active]:border-b-2  data-[state=active]:border-ascend_color data-[state=active]:text-acborder-ascend_color"
          >
            Issue
          </TabsTrigger>
          <p className="mx-2">|</p>
          <TabsTrigger
            value="Security Hotspot"
            className=" data-[state=active]:shadow-none dark:data-[state=active]:bg-transparent  data-[state=active]:rounded-none data-[state=active]:border-b-2  data-[state=active]:border-ascend_color data-[state=active]:text-acborder-ascend_color"
          >
            Security Hotspot
          </TabsTrigger>
          <p className="mx-2">|</p>
          <TabsTrigger
            value="Code"
            className=" data-[state=active]:shadow-none dark:data-[state=active]:bg-transparent  data-[state=active]:rounded-none data-[state=active]:border-b-2  data-[state=active]:border-ascend_color data-[state=active]:text-acborder-ascend_color"
          >
            Code
          </TabsTrigger>
        </TabsList>

        <TabsContent value="Overview">
          <PageOverviewProjectDetail projectName={projectName} />
        </TabsContent>
        <TabsContent value="Issue">
          <IusseComponent props={projectName} />
        </TabsContent>

        <TabsContent value="Security Hotspot">
          <section className="h-full">
            <SecurityComponent projectName={projectName} />
          </section>
        </TabsContent>

        {/* table code */}
        <TabsContent value="Code">
          <section className="w-full">
            <CodeComponent projectName={projectName} />
          </section>
        </TabsContent>
      </Tabs>
    </main>
  );
}
