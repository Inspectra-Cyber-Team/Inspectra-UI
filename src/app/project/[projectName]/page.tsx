"use client";
import CodeComponent from "@/components/codeComponent/CodeComponent";
import IusseComponent from "@/components/ProjectDetailComponents/issueTab/IusseComponent";
import PageOverviewProjectDetail from "@/components/ProjectDetailComponents/PageOverviewProjectDetail";
import SecurityComponent from "@/components/securityComponent/SecurityComponent";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StaticOverviewComponent from "@/components/Project/StaticProjectComponent/StaticOverviewComponent";
import StaticIssueComponent from "@/components/Project/StaticProjectComponent/StaticIssueComponent";
import StaticSecurityHotspotComponent from "@/components/Project/StaticProjectComponent/StaticSecurityHotspotComponent";

export type ParamProps = {
  params: {
    projectName: string;
  };
};

export default function page({ params }: ParamProps) {
  const projectName = params.projectName;

  // Check if the route is for the static card
  const isStatic = projectName === "NextJS";

  return (
    <main className="w-[90%] m-auto rounded-[20px] bg-card_color_light  h-auto p-5 my-10 dark:bg-background_dark_mode">
      <Tabs defaultValue="Overview">
        <TabsList className="flex  w-full xl:w-[90%] mx-auto mb-10  justify-between text-center !bg-transparent overflow-x-auto scrollbar-hide overflow-y-hidden">
          <TabsTrigger
            value="Overview"
            className=" data-[state=active]:shadow-none dark:data-[state=active]:text-text_color_dark data-[state=active]:rounded-none data-[state=active]:border-b-2  dark:data-[state=active]:bg-transparent data-[state=active]:border-ascend_color data-[state=active]:text-acborder-ascend_color"
          >
            Overview
          </TabsTrigger>
          <p className="mx-2">|</p>
          <TabsTrigger
            value="Issue"
            className=" data-[state=active]:shadow-none dark:data-[state=active]:text-text_color_dark dark:data-[state=active]:bg-transparent data-[state=active]:rounded-none data-[state=active]:border-b-2  data-[state=active]:border-ascend_color data-[state=active]:text-acborder-ascend_color"
          >
            Issue
          </TabsTrigger>
          <p className="mx-2">|</p>
          <TabsTrigger
            value="Security Hotspot"
            className=" data-[state=active]:shadow-none dark:data-[state=active]:bg-transparent dark:data-[state=active]:text-text_color_dark data-[state=active]:rounded-none data-[state=active]:border-b-2  data-[state=active]:border-ascend_color data-[state=active]:text-acborder-ascend_color"
          >
            Security Hotspot
          </TabsTrigger>
          <p className="mx-2">|</p>
          <TabsTrigger
            value="Code"
            className=" data-[state=active]:shadow-none dark:data-[state=active]:bg-transparent dark:data-[state=active]:text-text_color_dark data-[state=active]:rounded-none data-[state=active]:border-b-2  data-[state=active]:border-ascend_color data-[state=active]:text-acborder-ascend_color"
          >
            Code
          </TabsTrigger>
        </TabsList>

        {isStatic ? (
          //  Static Card Content 
          <>
            {/* table overview */}
            <TabsContent value="Overview">
              <StaticOverviewComponent />
            </TabsContent>

            {/* table issue */}
            <TabsContent value="Issue">
              <StaticIssueComponent />
            </TabsContent>

            {/* table security hotspot */}
            <TabsContent value="Security Hotspot">
              <section className="h-full">
                <StaticSecurityHotspotComponent />
              </section>
            </TabsContent>

            {/* table code */}
            <TabsContent value="Code">
              <section className="w-full">
                <div className="w-full mx-auto text-center text-text_title_20 text-text_color_light dark:text-text_color_dark">
                  <img src="/images/NoIssue.png" className="mx-auto" />
                  <p>Congratulation! No issue found in this project</p>
                </div>
              </section>
            </TabsContent>
          </>
        ) : (
          // Dynamic Project Content 
          <>
            {/* table overview */}
            <TabsContent value="Overview">
              <PageOverviewProjectDetail projectName={projectName} />
            </TabsContent>

            {/* table issue */}
            <TabsContent value="Issue">
              <IusseComponent props={projectName} />
            </TabsContent>

            {/* table security hotspot */}
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
          </>
        )}
      </Tabs>
    </main>
  );
}
