import React from 'react'
import StaticExportButton from '@/components/ExportComponent/StaticExportComponent'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
} from "../../ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function StaticIssueComponent() {

    const [activeContent, setActiveContent] = useState(false);
    const router = useRouter();

    const filterTitles = [
        "Files",
        "Severities",
        "Statuses",
        "Author",
        "Directories",
        "Scopes",
        "Languages",
        "Tags",
        "Types",
        "createdAt",
        "sonarsourceSecurity",
        "codeVariants",
        "cleanCodeAttributeCategories",
        "impactSoftwareQualities",
        "assigned_to_me",
        "rules"
    ];

    return (
        <>
            <main className="w-full h-full  flex justify-between">
                <StaticExportButton />
                {activeContent === true ? (
                    <>
                        <div className="w-[35%] h-[1000px] overflow-y-auto scrollbar-hide hidden lg:block  border border-opacity-30 dark:border-none border-text_color_desc_light dark:bg-background_dark_mode p-5 rounded-[20px]  ">
                            <div className="w-full cursor-pointer text-text_body_16 text-text_color_light dark:text-text_color_dark text-end">
                                <p> 2 issues</p>
                                <hr className="text-text_color_desc_light mt-2" />
                                <div
                                    className=" flex flex-col my-5 py-2   justify-center hover:border-r-2 hover:border-text_color_light hover:bg-background_light_mode  dark:hover:border-text_color_dark dark:hover:bg-card_color_dark  text-[14px]"
                                >
                                    <p className=" text-left ">Replace `as` with upper case format `AS`.</p>
                                </div>
                                <div
                                    className=" flex flex-col my-5 py-2   justify-center hover:border-r-2 hover:border-text_color_light hover:bg-background_light_mode  dark:hover:border-text_color_dark dark:hover:bg-card_color_dark  text-[14px]"
                                >
                                    <p className=" text-left ">Ambiguous spacing before next element code</p>
                                </div>

                            </div>
                        </div>

                        {/* issue detail section */}
                        <div className=" w-full h-full px-5  scrollbar-hide overflow-y-auto lg:w-[60%] border border-opacity-30 dark:border-none border-text_color_desc_light dark:bg-background_dark_mode rounded-[20px]  ">
                            <p
                                className="text-text_body_16 w-full  mt-5  text-text_color_light dark:text-text_color_dark"
                            >
                                Replace `as` with upper case format `AS`.
                                <span
                                    className=" inline-block mx-2 text-[14px] underline cursor-pointer text-link_color dark:text-blue-600"
                                >
                                    docker:S6476
                                </span>
                            </p>

                            <hr className="text-text_color_desc_light opacity-15  my-3" />

                            <div className="my-5">
                                <p
                                    className="text-[14px]  text-text_color_desc_light"
                                >
                                    {" "}
                                    <p className="md:whitespace-normal md:max-w-none truncate max-w-full  text-text_color_light  dark:text-text_color_desc_dark">
                                        Line affected: L1 • Effort • 5min • Introduced • 1 week ago • CODE_SMELL • MAJOR
                                    </p>
                                </p>

                            </div>

                            {/* tab inside issue  */}
                            <Tabs defaultValue="Where is the issue?">
                                {/* for trigger different tab */}
                                <TabsList className="flex  justify-between !bg-transparent overflow-x-auto scrollbar-hide overflow-y-hidden">
                                    <TabsTrigger
                                        value="Where is the issue?"
                                        className=" data-[state=active]:shadow-none dark:data-[state=active]:bg-transparent  data-[state=active]:rounded-none data-[state=active]:border-b-2  data-[state=active]:border-ascend_color data-[state=active]:text-acborder-ascend_color"
                                    >
                                        Where is the issue?
                                    </TabsTrigger>
                                    <p className="mx-2">|</p>
                                    <TabsTrigger
                                        value="Why is this an issue?"
                                        className=" data-[state=active]:shadow-none dark:data-[state=active]:bg-transparent  data-[state=active]:rounded-none data-[state=active]:border-b-2  data-[state=active]:border-ascend_color data-[state=active]:text-acborder-ascend_color"
                                    >
                                        Why is this an issue?
                                    </TabsTrigger>
                                    <>
                                        <p className="mx-2">|</p>
                                        <div className="flex">
                                            <TabsTrigger
                                                value="How Can I fix it?"
                                                className="data-[state=active]:shadow-none dark:data-[state=active]:bg-transparent data-[state=active]:rounded-none data-[state=active]:border-b-2 data-[state=active]:border-ascend_color data-[state=active]:text-acborder-ascend_color"
                                            >
                                                How Can I fix it?
                                            </TabsTrigger>
                                        </div>
                                    </>
                                    <p className="mx-2">|</p>
                                    <TabsTrigger
                                        value="Activity"
                                        className=" data-[state=active]:shadow-none  dark:data-[state=active]:bg-transparent data-[state=active]:rounded-none data-[state=active]:border-b-2  data-[state=active]:border-ascend_color data-[state=active]:text-acborder-ascend_color"
                                    >
                                        Activity
                                    </TabsTrigger>
                                    <p className="mx-2">|</p>
                                    <TabsTrigger
                                        value="More info"
                                        className=" data-[state=active]:shadow-none dark:data-[state=active]:bg-transparent  data-[state=active]:rounded-none data-[state=active]:border-b-2  data-[state=active]:border-ascend_color data-[state=active]:text-acborder-ascend_color"
                                    >
                                        More info
                                    </TabsTrigger>
                                </TabsList>
                                {/* tab for each content */}
                                <TabsContent value="Where is the issue?">
                                    <div className="w-full h-full my-5  border border-1 border-opacity-30 border-text_color_desc_light  rounded-[20px] text-text_color_light dark:text-text_color_desc_dark ">
                                        {/* header content */}
                                        <div className=" w-full border-b border-opacity-30 border-text_color_desc_light  p-5">
                                            <div className="w-full  md:w-[60%] lg:w-[80%] xl:w-[40%] flex justify-between">
                                                <p
                                                    onClick={() => router.push(`/project`)}
                                                    className=" hidden md:block hover:underline hover:cursor-pointer hover:text-blue-500"
                                                >
                                                    NextJS
                                                </p>
                                                <p className="hidden md:block">{"|"}</p>
                                                <p className="truncate ">
                                                    clone_repos/.../Dockerfile
                                                </p>
                                            </div>
                                        </div>
                                        {/* Code Block */}
                                        <div className="rounded-lg p-4 w-full max-w-4xl">
                                            {/* Line Numbers and Code */}
                                            <pre className="font-mono text-gray-800">
                                                <div className="flex items-center">
                                                    <span className="text-gray-400 w-8 text-right select-none">1</span>
                                                    <span className="ml-4 dark:text-text_color_desc_dark">
                                                        <span className="text-black dark:text-text_color_dark">FROM</span> node:lts 
                                                        <span className="text-blue-500 "> as</span> build
                                                    </span>
                                                </div>
                                                {/* Annotation */}

                                                <div className="ml-24 text-red-500 text-lg">&#8593;</div>
                                                <div className="border w-auto border-red-400 bg-white dark:bg-card_color_dark rounded p-2 text-red-500 mb-2">
                                                    Replace <code className="font-mono text-black dark:text-text_color_desc_dark">as</code> with upper case format <code className="font-mono text-black dark:text-text_color_desc_dark">AS</code>.
                                                </div>
                                                <div className="flex items-center">
                                                    <span className="text-gray-400 w-8 text-right select-none">2</span>
                                                    <span className="ml-4 dark:text-text_color_desc_dark">WORKDIR /app</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <span className="text-gray-400 w-8 text-right select-none">3</span>
                                                    <span className="ml-4 dark:text-text_color_desc_dark">COPY package*.json ./</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <span className="text-gray-400 w-8 text-right select-none">4</span>
                                                    <span className="ml-4 dark:text-text_color_desc_dark">RUN npm install --force</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <span className="text-gray-400 w-8 text-right select-none">5</span>
                                                    <span className="ml-4 dark:text-text_color_desc_dark">COPY . .</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <span className="text-gray-400 w-8 text-right select-none">6</span>
                                                    <span className="ml-4 dark:text-text_color_desc_dark">RUN npm run build</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <span className="text-gray-400 w-8 text-right select-none">7</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <span className="text-gray-400 w-8 text-right select-none">8</span>
                                                    <span className="ml-4 dark:text-text_color_desc_dark"># Production stage</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <span className="text-gray-400 w-8 text-right select-none">9</span>
                                                    <span className="ml-4 dark:text-text_color_desc_dark">FROM node:lts</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <span className="text-gray-400 w-8 text-right select-none">10</span>
                                                    <span className="ml-4 dark:text-text_color_desc_dark">WORKDIR /app</span>
                                                </div>
                                            </pre>
                                        </div>
                                    </div>
                                </TabsContent>
                                <TabsContent value="Why is this an issue?">
                                    <p className='font-consolas mb-2'>
                                        While Dockerfile instructions are not case-sensitive, adhering to uppercase conventions for instructions helps enhance clarity and collaboration
                                        within development teams. This ensures that instructions are more easily distinguishable from arguments and contributes to effective
                                        collaboration.
                                        What is the potential impact?
                                        In the world of programming, even small details can have significant repercussions. The inconsistent use of uppercase letters in Dockerfile
                                        instructions may seem inconsequential at first glance, but it can lead to confusion, misinterpretation, and hinder smooth teamwork.
                                        When Dockerfile instructions are written in a mix of lowercase and uppercase, it becomes challenging to quickly identify and differentiate
                                        instructions from arguments. This lack of visual uniformity can make it harder for developers to understand the structure and purpose of the
                                        Dockerfile. Teams may spend unnecessary time deciphering the code, which could be better utilized in productive tasks.
                                        Inconsistencies in letter casing can lead to errors that are difficult to diagnose. Imagine spending hours trying to locate a bug only to realize
                                        that it resulted from a misinterpretation of an instruction due to inconsistent casing. Such situations can be frustrating and can slow down the
                                        development process.
                                        Additionally, modern IDEs provide syntax highlighting to help programmers navigate and comprehend code. However, IDEs can sometimes fail to
                                        highlight lowercase or mixed-case Dockerfile keywords properly, as they typically expect instructions to be in uppercase.
                                        In essence, the inconsistent use of uppercase letters in Dockerfile instructions might seem like a minor concern, but its impact reaches beyond
                                        aesthetics. It affects comprehension, teamwork, error detection, and the overall development lifecycle.
                                    </p>
                                </TabsContent>
                                <TabsContent value="How Can I fix it?">
                                    <p className='font-consolas mb-2'>
                                        Documentation

                                        Dockerfile reference Format
                                        Ensure that all Dockerfile instructions are written in uppercase letters. For instance, use FROM instead of from, RUN instead of run, and so on. By
                                        adopting this convention, you create a visual distinction between instructions and arguments.

                                        Noncompliant code example
                                        from ubuntu:22.04 aS jammy

                                        Compliant solution
                                        FROM ubuntu:22.04 AS jammy

                                        While Dockerfile instructions are not case-sensitive, adhering to uppercase conventions for instructions helps enhance clarity and collaboration
                                        within development teams. This ensures that instructions are more easily distinguishable from arguments and contributes to effective
                                        collaboration.
                                        What is the potential impact?
                                        In the world of programming, even small details can have significant repercussions. The inconsistent use of uppercase letters in Dockerfile
                                        instructions may seem inconsequential at first glance, but it can lead to confusion, misinterpretation, and hinder smooth teamwork.
                                        When Dockerfile instructions are written in a mix of lowercase and uppercase, it becomes challenging to quickly identify and differentiate
                                        instructions from arguments. This lack of visual uniformity can make it harder for developers to understand the structure and purpose of the
                                        Dockerfile. Teams may spend unnecessary time deciphering the code, which could be better utilized in productive tasks.
                                        Inconsistencies in letter casing can lead to errors that are difficult to diagnose. Imagine spending hours trying to locate a bug only to realize
                                        that it resulted from a misinterpretation of an instruction due to inconsistent casing. Such situations can be frustrating and can slow down the
                                        development process.
                                        Additionally, modern IDEs provide syntax highlighting to help programmers navigate and comprehend code. However, IDEs can sometimes fail to
                                        highlight lowercase or mixed-case Dockerfile keywords properly, as they typically expect instructions to be in uppercase.
                                        In essence, the inconsistent use of uppercase letters in Dockerfile instructions might seem like a minor concern, but its impact reaches beyond
                                        aesthetics. It affects comprehension, teamwork, error detection, and the overall development lifecycle.
                                    </p>
                                </TabsContent>
                                <TabsContent value="Activity">
                                    <div className="w-full  text-text_color_light dark:text-text_color_dark m-7">
                                        <p className=" text-text_title_20 ">Activity</p>
                                        <p className="text-text_body_16 mt-5">
                                            January 6 at 2025 at 9:40 AM
                                        </p>
                                        <p className="text-text_body_16 text-text_color_desc_light dark:text-text_color_desc_dark">
                                            Created Issue
                                        </p>
                                    </div>
                                </TabsContent>
                                <TabsContent value="More info">
                                    <div className="w-full  text-text_color_light dark:text-text_color_dark my-5">
                                        <div className="w-full  text-text_color_light dark:text-text_color_dark m-7">
                                            <p className=" text-text_title_20 ">Documentation</p>
                                            <p className="text-text_body_16 mt-5">
                                                Dockerfile reference<span
                                                    className=" inline-block mx-2 text-[14px] underline cursor-pointer text-link_color dark:text-blue-600"
                                                >
                                                    Format
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </div>
                    </>
                ) : (
                    <div className="w-full h-full flex flex-col lg:flex-row justify-between">
                        {/* filter side bar */}
                        <div className="w-[35%] hidden lg:block h-full border-2 border-background_light_mode dark:border-none dark:bg-card_color_dark p-5 rounded-[20px]  ">
                            <p className="text-text_title_24 text-text_color_light dark:text-text_color_dark ">
                                Filter
                            </p>
                            <hr className="text-text_color_desc_light mt-2" />
                            {/* side bar content */}
                            <Accordion type="single" collapsible>
                                {filterTitles.map((title, index) => (
                                    <AccordionItem key={index} value={`item-${index}`}>
                                        <AccordionTrigger className="text-text_color_light dark:text-text_color_dark text-left md:text-text_body_16">
                                            {title}
                                        </AccordionTrigger>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>

                        {/* card issue */}
                        <div className=" w-full h-[1000px] scrollbar-hide overflow-y-auto lg:w-[60%] ">
                            <section className="h-full">
                                <div
                                    className="w-full mb-5 border-2 border-background_light_mode dark:border-none  dark:bg-card_color_dark p-5 rounded-[20px]"
                                >
                                    {/* first section*/}
                                    <div className="w-full flex justify-between">
                                        <p onClick={() => { setActiveContent(true); }}
                                            className=" text-text_body_16 cursor-pointer truncate  w-[60%] md:w-[75%] xl:w-[80%] text-ascend_color underline"
                                        >
                                            Replace `as` with upper case format `AS`.
                                        </p>
                                        <p className=" py-1 px-2 rounded-md text-[14px] text-text_color_light bg-primary_color">
                                            CONSISTENT
                                        </p>
                                    </div>
                                    {/* second section */}
                                    <div className="flex  justify-between  items-center text-center my-5">
                                        <div className=" flex flex-col space-y-2  md:flex-row md:space-y-0 md:space-x-2">
                                            <div
                                                className="flex text-[14px]  md:text-text_body_16 text-center items-center px-3 rounded-md bg-[#60935d21] py-2 "
                                            >
                                                <img
                                                    src="/images/iconWarning.svg"
                                                    className=" h-5 w-5 md:h-6 md:w-6"
                                                    alt="Warning Icon"
                                                ></img>
                                                <p className="mx-3">MAINTAINABILITY</p>
                                            </div>

                                        </div>
                                        {/* tag */}
                                        <div className="flex flex-col space-y-2 md:flex-row text-[14px] md:text-text_body_16 md:space-y-0 md:space-x-2 text-center items-center">
                                            <div
                                                className="inline-block bg-[#60935d21] px-2 rounded-md"
                                            >
                                                <p className="md:whitespace-normal md:max-w-none truncate max-w-[40px]">
                                                    convention
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* line */}
                                    <hr className="text-text_color_desc_light opacity-10" />
                                    <div className="flex  items-center justify-start md:justify-end w-full mt-5 text-[14px] ">
                                        <p className="md:whitespace-normal md:max-w-none truncate max-w-full  text-text_color_light  dark:text-text_color_desc_dark">
                                            L1 • 5min effort • 1 week ago • CODE_SMELL •
                                            <span className="inline md:hidden">
                                                MAJOR
                                            </span>
                                        </p>
                                        <div className="hidden md:flex items-center ml-2 text-text_color_light dark:text-text_color_desc_dark">
                                            <img
                                                src="/images/iconWarning.svg"
                                                alt=""
                                                className="w-[14px] h-full mr-1"
                                            />
                                            <p>MAJOR</p>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="w-full mb-5 border-2 border-background_light_mode dark:border-none  dark:bg-card_color_dark p-5 rounded-[20px]"
                                >
                                    {/* first section*/}
                                    <div className="w-full flex justify-between">
                                        <p
                                            className=" text-text_body_16 cursor-pointer truncate  w-[60%] md:w-[75%] xl:w-[80%] text-ascend_color underline"
                                        >
                                            Ambiguous spacing before next element code
                                        </p>
                                        <p className=" py-1 px-2 rounded-md text-[14px] text-text_color_light bg-primary_color">
                                            CONSISTENT
                                        </p>
                                    </div>
                                    {/* second section */}
                                    <div className="flex  justify-between  items-center text-center my-5">
                                        <div className=" flex flex-col space-y-2  md:flex-row md:space-y-0 md:space-x-2">
                                            <div
                                                className="flex text-[14px]  md:text-text_body_16 text-center items-center px-3 rounded-md bg-[#60935d21] py-2 "
                                            >
                                                <img
                                                    src="/images/iconGood.svg"
                                                    className=" h-5 w-5 md:h-6 md:w-6"
                                                    alt="Warning Icon"
                                                ></img>
                                                <p className="mx-3">RELIABILITY</p>
                                            </div>
                                            <div
                                                className="flex text-[14px]  md:text-text_body_16 text-center items-center px-3 rounded-md bg-[#60935d21] py-2 "
                                            >
                                                <img
                                                    src="/images/iconGood.svg"
                                                    className=" h-5 w-5 md:h-6 md:w-6"
                                                    alt="Warning Icon"
                                                ></img>
                                                <p className="mx-3">MAINTAINABILITY</p>
                                            </div>

                                        </div>
                                        {/* tag */}
                                        <div className="flex flex-col space-y-2 md:flex-row text-[14px] md:text-text_body_16 md:space-y-0 md:space-x-2 text-center items-center">
                                            <div
                                                className="inline-block bg-[#60935d21] px-2 rounded-md"
                                            >
                                                <p className="md:whitespace-normal md:max-w-none truncate max-w-[40px]">
                                                    react
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* line */}
                                    <hr className="text-text_color_desc_light opacity-10" />
                                    <div className="flex  items-center justify-start md:justify-end w-full mt-5 text-[14px] ">
                                        <p className="md:whitespace-normal md:max-w-none truncate max-w-full  text-text_color_light  dark:text-text_color_desc_dark">
                                            L9 • 5min effort • 1 week ago • CODE_SMELL •
                                            <span className="inline md:hidden">
                                                MAJOR
                                            </span>
                                        </p>
                                        <div className="hidden md:flex items-center ml-2 text-text_color_light dark:text-text_color_desc_dark">
                                            <img
                                                src="/images/iconWarning.svg"
                                                alt=""
                                                className="w-[14px] h-full mr-1"
                                            />
                                            <p>MAJOR</p>
                                        </div>
                                    </div>
                                </div>

                            </section>
                        </div>
                    </div>
                )}
            </main>
        </>
    )
}
