"use client";
import { navProjectDetial } from "@/data/navProjectDetial";
import React from "react";

export type ParamProps = {
  params: {
    projectName: string;
  };
};

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import IssueSidebarComponent from "@/components/ProjectDetailComponents/IssueSidebarComponent";
import IssueCardComponet from "@/components/ProjectDetailComponents/IssueCardComponet";

export default function page({ params }: ParamProps) {
  const projectName = params.projectName;
  return (
    <main className="w-[90%] m-auto bg-card_color_light rounded h-auto p-5 my-10 dark:bg-card_color_dark">
      <Tabs defaultValue="Overview" className="">
        <TabsList className="grid w-full grid-cols-4 mb-5">
          {navProjectDetial.map((item, index: number) => (
            <TabsTrigger
              value={item.name}
              key={index}
              className="group relative pb-2 text-gray-500 hover:text-secondary_color transition mr-3"
            >
              {item.name}
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-primary_color transition-all duration-300 group-hover:w-full"></span>
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="Overview">
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>
                Make changes to your account here. Click save when you are done.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue="Pedro Duarte" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">Username</Label>
                <Input id="username" defaultValue="@peduarte" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="Issue">
          <section className="w-full h-full flex justify-between">
            <div className="w-[35%] h-full bg-background_light_mode dark:bg-background_dark_mode p-5 rounded-[20px] hidden md:block ">
              <p className="text-text_title_24 text-text_color_light dark:text-text_color_dark ">
                Filter
              </p>
              <hr className="text-text_color_desc_light mt-2" />
              <IssueSidebarComponent props={projectName} />
            </div>
            <div className="w-[60%] ">
              <IssueCardComponet props={projectName} />
            </div>
          </section>
        </TabsContent>
      </Tabs>
    </main>
  );
}
