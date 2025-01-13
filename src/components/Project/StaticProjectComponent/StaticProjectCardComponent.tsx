'use client'

import React from 'react'
import { useRouter } from 'next/navigation';
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { StaticCardData } from '@/data/StaticCard';
import { StaticCard } from '@/types/StaticCard';
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";

export default function StaticProjectCardComponent() {
    const router = useRouter();
    return (
        <>
            <section
                className="w-full  my-5 h-full  p-5  border border-opacity-40 border-text_color_desc_light dark:border-primary_color rounded-[20px] ">
                <div className="flex justify-between w-full">
                    <p onClick={() => router.push('/project/NextJS')} className="text-text_body_16 cursor-pointer text-text_color_light dark:text-text_color_dark hover:text-ascend_color hover:underline ">
                        NextJS
                    </p>
                    <div className='flex'>
                        <div className="flex text-center items-center" >
                            <div className="w-[25px] h-[25px] flex items-center justify-center rounded-[5px] bg-primary_color">
                                <FaCheck className="dark:text-text_color_light" />
                            </div>
                        </div>
                        <p className="px-2 text-text_body_16">
                            Passed
                        </p>
                        <p className="mx-2">|</p>
                        <RxCross2 className="h-6 w-6 text-custom_red cursor-pointer" />
                    </div>
                </div>
                <p className=" my-2 text-left text-[14px] text-text_color_desc_light dark:text-text_color_desc_dark ">
                    <span className="text-secondary_color truncate">
                        Last analysis: </span>
                    4 days ago 199 • Lines of Code • Language • CSS DOCKER JS TS
                </p>
                <hr className="my-5 dark:border-primary_color" />
                <div className="grid grid-cols-2 md:grid-cols-3 lg:gap-4 xl:gap-5">
                    <div className="w-full h-full ">
                        <div className="flex w-full justify-center text-center items-center"></div>
                    </div>
                </div>
                <div className="grid  grid-cols-2 md:grid-cols-3 lg:gap-4 xl:gap-5">
                    {StaticCardData.map((card: StaticCard, index: number) => {
                        return (
                            <div key={index} className="w-full h-full ">
                                <div className="flex w-full justify-center text-center items-center">
                                    <div
                                        className={`w-[30px] h-[30px] flex items-center justify-center rounded-[5px] border border-${card?.border}`}
                                    >
                                        {card?.grade}
                                    </div>
                                    <p className="text-text_body_16 px-2">
                                        {card?.total}
                                    </p>
                                </div>
                                <div className="my-5 cursor-default w-full flex items-center justify-center">
                                    <HoverCard>
                                        <HoverCardTrigger>{card?.name}</HoverCardTrigger>
                                        <HoverCardContent className="text-text_body_16">
                                            {card?.hover}
                                        </HoverCardContent>
                                    </HoverCard>
                                </div>
                            </div>
                        )
                    })}
                    <div className="w-full h-full ">
                        <div className="flex w-full justify-center text-center items-center">
                            <p className="text-text_body_16 px-2">
                                No Data
                            </p>
                        </div>
                        <div className="my-5 cursor-default w-full flex items-center justify-center">
                            <HoverCard>
                                <HoverCardTrigger>Coverage</HoverCardTrigger>
                                <HoverCardContent className="text-text_body_16">
                                    Measures how well your unit tests cover the codebase.
                                </HoverCardContent>
                            </HoverCard>
                        </div>
                    </div>
                    <div className="w-full h-full ">
                        <div className="flex w-full justify-center text-center items-center">
                            <p className="text-text_body_16 px-2">
                                No Data
                            </p>
                        </div>
                        <div className="my-5 cursor-default w-full flex items-center justify-center">
                            <HoverCard>
                                <HoverCardTrigger>Duplicated</HoverCardTrigger>
                                <HoverCardContent className="text-text_body_16">
                                    Identifies duplicate or copy-pasted code.
                                </HoverCardContent>
                            </HoverCard>
                        </div>
                    </div>
                </div>

            </section>
        </>
    )
}
