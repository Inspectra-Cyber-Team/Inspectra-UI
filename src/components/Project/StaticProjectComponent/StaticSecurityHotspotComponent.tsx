import React from 'react'
import StaticExportButton from '@/components/ExportComponent/StaticExportComponent'
import {
    Accordion,
    AccordionItem,
    AccordionContent,
    AccordionTrigger,
} from "../../ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function StaticSecurityHotspotComponent() {
    return (
        <>
            <section className="flex flex-col md:flex-row gap-10 lg:p-4 rounded-sm h-full overflow-y-auto scrollbar-hide">
                <StaticExportButton />
                <section className="w-full mx-auto md:w-1/2 border rounded-2xl dark:bg-card_color_dark p-4">
                    <div className="mb-4">
                        <p className="font-semibold">
                            Total Security Hotspots:
                            <span className="text-red-500">
                                 4
                            </span>
                        </p>
                    </div>
                    <Accordion
                        type="multiple"
                        className="w-full"
                    >
                        <AccordionItem value={''} >
                            <AccordionTrigger>
                                <span className="text-black dark:text-text_color_desc_dark">
                                    Review Priority:
                                    <span>
                                        <span className='ml-3 bg-yellow-200 text-yellow-800 rounded-md px-3'>
                                            MEDIUM
                                        </span>
                                    </span>
                                </span>
                            </AccordionTrigger>
                            <AccordionContent>
                                <button
                                    className="p-2 cursor-pointer rounded-md hover:bg-gray-100 dark:hover:bg-card_color_dark text-left w-full"
                                >
                                    The node image runs with root as the default user. Make sure it is safe here.
                                </button>
                                <button
                                    className="p-2 cursor-pointer rounded-md hover:bg-gray-100 dark:hover:bg-card_color_dark text-left w-full"
                                >
                                    Copying recursively might inadvertently add sensitive data to the container. Make sure it is safe here.
                                </button>
                            </AccordionContent>
                        </AccordionItem>

                    </Accordion>
                    <Accordion
                        type="multiple"
                        className="w-full"
                    >
                        <AccordionItem value={''} >
                            <AccordionTrigger>
                                <span className="text-black dark:text-text_color_desc_dark">
                                    Review Priority:
                                    <span>
                                        <span className='ml-3 bg-green-200 text-green-800 rounded-md px-3'>
                                            LOW
                                        </span>
                                    </span>
                                </span>
                            </AccordionTrigger>
                            <AccordionContent>
                                <button
                                    className="p-2 cursor-pointer rounded-md hover:bg-gray-100 dark:hover:bg-card_color_dark text-left w-full"
                                >
                                    Omitting --ignore-scripts can lead to the execution of shell scripts. Make sure it is safe here.
                                </button>
                                <button
                                    className="p-2 cursor-pointer rounded-md hover:bg-gray-100 dark:hover:bg-card_color_dark text-left w-full"
                                >
                                    Omitting --ignore-scripts can lead to the execution of shell scripts. Make sure it is safe here.
                                </button>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </section>
                {/* Details section */}
                <section className="w-full border rounded-2xl dark:bg-card_color_dark p-4">
                    <section>
                        <div>
                            <p className="font-bold mb-5 ">The node image runs with root as the default user. Make sure it is safe here.</p>
                            <p className="mb-2">
                                Running containers as a privileged user is security-sensitive
                                <button
                                    className="font-bold cursor-pointer hover:text-primary_color"
                                >
                                    docker:S6471
                                </button>
                            </p>
                            <div className="flex gap-4">
                                <p className="mb-1">
                                    <strong>Category:</strong> permission
                                </p>
                                <p className="mb-2">
                                    <strong>Review priority:</strong>{" "}
                                    MEDIUM
                                </p>
                            </div>
                        </div>
                        {/* tab section  */}
                        <div>
                            {/* Desktop View */}
                            <div className="hidden sm:block mt-3 overflow-auto scrollbar-hide">
                                <div className="border-b border-gray-200">
                                    {/* tab inside issue  */}
                                    <Tabs defaultValue="Where is the issue?">
                                        {/* for trigger different tab */}
                                        <TabsList className="flex  justify-between !bg-transparent overflow-x-auto scrollbar-hide overflow-y-hidden">
                                            <TabsTrigger
                                                value="Where is the risk?"
                                                className=" data-[state=active]:shadow-none dark:data-[state=active]:bg-transparent  data-[state=active]:rounded-none data-[state=active]:border-b-2  data-[state=active]:border-ascend_color data-[state=active]:text-acborder-ascend_color"
                                            >
                                                Where is the risk?
                                            </TabsTrigger>
                                            <p className="mx-2">|</p>
                                            <TabsTrigger
                                                value="What is the risk?"
                                                className=" data-[state=active]:shadow-none dark:data-[state=active]:bg-transparent  data-[state=active]:rounded-none data-[state=active]:border-b-2  data-[state=active]:border-ascend_color data-[state=active]:text-acborder-ascend_color"
                                            >
                                                What is the risk?
                                            </TabsTrigger>
                                            <>
                                                <p className="mx-2">|</p>
                                                <div className="flex">
                                                    <TabsTrigger
                                                        value="Access the risk"
                                                        className="data-[state=active]:shadow-none dark:data-[state=active]:bg-transparent data-[state=active]:rounded-none data-[state=active]:border-b-2 data-[state=active]:border-ascend_color data-[state=active]:text-acborder-ascend_color"
                                                    >
                                                        Access the risk
                                                    </TabsTrigger>
                                                </div>
                                            </>
                                            <p className="mx-2">|</p>
                                            <TabsTrigger
                                                value="How can i fix it?"
                                                className=" data-[state=active]:shadow-none dark:data-[state=active]:bg-transparent  data-[state=active]:rounded-none data-[state=active]:border-b-2  data-[state=active]:border-ascend_color data-[state=active]:text-acborder-ascend_color"
                                            >
                                                How can i fix it?
                                            </TabsTrigger>
                                        </TabsList>
                                        {/* tab for each content */}
                                        <TabsContent value="Where is the risk?">
                                            <div className="w-full h-full my-5  border border-1 border-opacity-30 border-text_color_desc_light  rounded-[20px] text-text_color_light dark:text-text_color_desc_dark ">
                                                {/* Code Block */}
                                                <div className="rounded-lg p-4 w-full max-w-4xl">
                                                    {/* Line Numbers and Code */}
                                                    <pre className="font-mono text-gray-800 dark:text-text_color_desc_dark">
                                                        <div className="flex items-center">
                                                            <span className="text-gray-400 w-8 text-right select-none">4</span>
                                                            <span className="ml-4">
                                                                <span className="text-blue-500">RUN </span>npm install --force
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <span className="text-gray-400 w-8 text-right select-none">5</span>
                                                            <span className="ml-4 text-blue-500">COPY . .</span>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <span className="text-gray-400 w-8 text-right select-none">6</span>
                                                            <span className="ml-4"><span className='text-blue-500'>RUN</span> npm run build</span>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <span className="text-gray-400 w-8 text-right select-none">7</span>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <span className="text-gray-400 w-8 text-right select-none">8</span>
                                                            <span className="ml-4"># Production stage</span>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <span className="text-gray-400 w-8 text-right select-none">9</span>
                                                            <span className="ml-4">FROM node:lts</span>
                                                        </div>
                                                        {/* Annotation */}
                                                        <div className="border w-auto border-red-400 bg-white dark:bg-card_color_dark rounded p-2 text-red-500 mb-2">
                                                            <code className="font-mono text-text_color_light dark:text-text_color_dark">/* The node image runs with root as the default user. Make sure it is safe here. */</code>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <span className="text-gray-400 w-8 text-right select-none">10</span>
                                                            <span className="ml-4">WORKDIR /app</span>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <span className="text-gray-400 w-8 text-right select-none">11</span>
                                                            <span className="ml-4"><span className='text-blue-500'>COPY</span> --from=build /app ./</span>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <span className="text-gray-400 w-8 text-right select-none">12</span><span className='ml-4'># copy the .env.production file</span>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <span className="text-gray-400 w-8 text-right select-none">13</span><span className='ml-4'># COPY --from=build /app/.env.production ./.env.production</span>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <span className="text-gray-400 w-8 text-right select-none">14</span><span className='text-blue-500 ml-4'>RUN</span> npm install -g serve
                                                        </div>
                                                        <div className="flex items-center">
                                                            <span className="text-gray-400 w-8 text-right select-none">15</span><span className='text-blue-500 ml-4'>EXPOSE 3000</span>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <span className="text-gray-400 w-8 text-right select-none">16</span><span className='text-blue-500 ml-4'>CMD</span> "npm","start"
                                                        </div>
                                                    </pre>
                                                </div>
                                            </div>
                                        </TabsContent>
                                        <TabsContent value="What is the risk?">
                                            <p className='font-consolas mb-2'>
                                                Running containers as a privileged user weakens their runtime security, allowing any user whose code runs on the container to perform administrative actions.
                                                In Linux containers, the privileged user is usually named root. In Windows containers, the equivalent is ContainerAdministrator. <br />

                                                A malicious user can run code on a system either thanks to actions that could be deemed legitimate - depending on internal business logic or operational management shells - or thanks to malicious actions. For example, with arbitrary code execution after exploiting a service that the container hosts. <br />

                                                Suppose the container is not hardened to prevent using a shell, interpreter, or Linux capabilities. In this case, the malicious user can read and exfiltrate any file, open new network connections, install malicious software, or, worse, break out of the container is isolation context by exploiting other components. <br />

                                                This means giving the possibility to attackers to steal important infrastructure files, intellectual property, or personal data. <br />

                                                Depending on the infrastructure is resilience, attackers may then extend their attack to other services, such as Kubernetes clusters or cloud providers, in order to maximize their reach. <br />
                                            </p>
                                        </TabsContent>
                                        <TabsContent value="Access the risk">
                                            <div className='m-7 w-full'>
                                                <p className=" text-text_title_20 ">Ask Yourself Whether</p>
                                                <p className="text-text_body_16 mt-5">
                                                    This container: <br />
                                                    • Serves services accessible from the Internet. <br />
                                                    • Does not require a privileged user to run. <br />
                                                    There is a risk if you answered yes to any of those questions.
                                                </p>
                                            </div>
                                        </TabsContent>
                                        <TabsContent value="How can i fix it?">
                                            <div className="w-full text-text_color_light dark:text-text_color_dark m-7">
                                                <p className=" text-text_title_20 ">Recommended Secure Coding Practices</p>
                                                <p className="text-text_body_16 mt-5">
                                                    In the Dockerfile: <br />
                                                    • Create a new default user and use it with the USER statement. <br />
                                                    • Some container maintainers create a specific user to be used without explicitly setting it as default, such as postgresql or zookeeper. It is recommended to use these users instead of root. <br />
                                                    • On Windows containers, the ContainerUser is available for this purpose. <br />
                                                </p>
                                                <p className="text-text_body_16 mt-5">
                                                    Or, at launch time: <br />
                                                    • Use the user argument when calling Docker or in the docker-compose file. <br />
                                                    • Add fine-grained Linux capabilities to perform specific actions that require root privileges. <br />
                                                    If this image is already explicitly set to launch with a non-privileged user, you can add it to the safe images list rule property of your SonarQube instance, without the tag.<br />
                                                </p>
                                            </div>
                                        </TabsContent>
                                    </Tabs>
                                </div>
                            </div>
                        </div>
                    </section>
                </section>
            </section>
        </>
    )
}
