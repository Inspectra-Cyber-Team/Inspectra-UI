import { useGetProjectDetailQuery } from '@/redux/service/overview';
import React from 'react'
import { LuDot } from 'react-icons/lu'
import { SiTicktick } from 'react-icons/si'

export default function PageOverviewProjectDetail() {
    const { data: overviewData } = useGetProjectDetailQuery({
        projectName: 'project168',
    });
    const overviewResult = overviewData
    console.log(overviewResult);
    
    return (
        <section>
           
            {/* First section of page */}
            <div className='w-[100%] flex justify-between items-center'>
                <div className='text-text_color_light'>
                    <h2>{overviewResult?.name || 'Project Details'}</h2>
                </div>
                <div className=''>
                    <ul className='flex items-center gap-3 p-3 text-text_color_light'>
                        <li>13K Lines of Code</li> <LuDot />
                        <li>Version not Provided</li> <LuDot />
                        <li>
                            <button className='bg-primary_color p-2 rounded-full w-[100px]'>
                                Export
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="border-b border-primary_color mt-3 mb-5"></div>

            {/* Second section of page */}
            <div className='w-[100%] flex justify-between items-center'>
                <div className='text-text_color_light flex items-center gap-3'>
                    <h2 className='bg-primary_color p-3 rounded-md'><SiTicktick /></h2>
                    <div>
                        <p className='text-[10px]'>Quality Date</p>
                        <p className='font-bold'>Passed</p>
                    </div>
                </div>
                <div className=''>
                    Last Analysis <b>1 month ago</b>
                </div>
            </div>

            {/* Third Section of page */}
            <div className='w-[100%]'>
                <div className='grid grid-cols-3 mt-5 mb-5'>
                    <div className='text-text_color_light flex-col items-center gap-3 border-r border-primary_color p-3'>
                        <p className='text-text_body_16 mb-3'>Security</p>
                        <div className='text-text_body_16 flex justify-between items-center mb-3'>
                            <p className='font-bold'>
                                0 <span className='font-normal'>Open Issues</span>
                            </p>
                            <p className='w-[36px] h-[36px] text-text_body_16 flex items-center justify-center border border-primary_color p-2 rounded-md'>
                                A
                            </p>
                        </div>
                        <div className="flex space-x-4 justify-between">
                            <p className="px-12 py-2 bg-gray-100 rounded-md text-text_color_light text-sm font-medium shadow-sm">
                                0 H
                            </p>

                            <p className="px-12 py-2 bg-gray-100 rounded-md text-text_color_light text-sm font-medium shadow-sm">
                                0 M
                            </p>

                            <p className="px-12 py-2 bg-gray-100 rounded-md text-text_color_light text-sm font-medium shadow-sm">
                                0 L
                            </p>
                        </div>


                    </div>
                    <div className='text-text_color_light flex-col items-center gap-3 border-r border-primary_color p-3'>
                        <p className='text-text_body_16 mb-3'>Reliability</p>
                        <div className='text-text_body_16 flex justify-between items-center mb-3'>
                            <p className='font-bold'>
                                4 <span className='font-normal'>Open Issues</span>
                            </p>
                            <p className='w-[36px] h-[36px] text-text_body_16 flex items-center justify-center border border-secondary_color p-2 rounded-md'>
                                C
                            </p>
                        </div>
                        <div className="flex space-x-4 justify-between">
                            <p className="px-12 py-2 bg-gray-100 rounded-md text-text_color_light text-sm font-medium shadow-sm">
                                0 H
                            </p>

                            <p className="px-12 py-2 bg-yellow-100 rounded-md text-text_color_light text-sm font-medium shadow-sm">
                                0 M
                            </p>

                            <p className="px-12 py-2 bg-gray-100 rounded-md text-text_color_light text-sm font-medium shadow-sm">
                                0 L
                            </p>
                        </div>

                    </div>
                    <div className='text-text_color_light flex-col items-center gap-3 border-r border-primary_color p-3'>
                        <p className='text-text_body_16 mb-3'>Maintainability</p>
                        <div className='text-text_body_16 flex justify-between items-center mb-3'>
                            <p className='font-bold'>
                                0 <span className='font-normal'>Open Issues</span>
                            </p>
                            <p className='w-[36px] h-[36px] text-text_body_16 flex items-center justify-center border border-primary_color p-2 rounded-md'>
                                A
                            </p>
                        </div>
                        <div className="flex space-x-4 justify-between">
                            <p className="px-12 py-2 bg-red-100 rounded-md text-text_color_light text-sm font-medium shadow-sm">
                                52 H
                            </p>

                            <p className="px-12 py-2 bg-gray-100 rounded-md text-text_color_light text-sm font-medium shadow-sm">
                                0 M
                            </p>

                            <p className="px-12 py-2 bg-gray-100 rounded-md text-text_color_light text-sm font-medium shadow-sm">
                                0 L
                            </p>
                        </div>


                    </div>
                </div>

                <div className="border-b border-primary_color mt-3 mb-5"></div>

                <div className='grid grid-cols-3 mt-5 mb-5'>
                    <div className='text-text_color_light flex-col items-center gap-3 border-r border-primary_color p-3'>
                        <p className='text-text_body_16 mb-3'>Security</p>
                        <div className='text-text_body_16 flex justify-between items-center mb-3'>
                            <p className='font-bold'>
                                0 <span className='font-normal'>Open Issues</span>
                            </p>
                            <div className="relative w-12 h-12">

                                {/* <div className="absolute w-full h-full rounded-full bg-red-500"></div> */}

                                <div
                                    className="absolute w-full h-full rounded-full bg-transparent"
                                    style={{ background: 'conic-gradient(lime 0% 45%, red 45% 100%)' }}>
                                </div>

                                <div className="absolute w-1/2 h-1/2 bg-white dark:bg-background_dark_mode rounded-full top-3 left-3"></div>
                            </div>
                        </div>
                        <div className="flex space-x-4 justify-between">
                            <p className="px-12 py-2 bg-gray-100 rounded-md text-text_color_light text-sm font-medium shadow-sm">
                                0 H
                            </p>

                            <p className="px-12 py-2 bg-gray-100 rounded-md text-text_color_light text-sm font-medium shadow-sm">
                                0 M
                            </p>

                            <p className="px-12 py-2 bg-gray-100 rounded-md text-text_color_light text-sm font-medium shadow-sm">
                                0 L
                            </p>
                        </div>
                    </div>
                    <div className='text-text_color_light flex-col items-center gap-3 border-r border-primary_color p-3'>
                        <p className='text-text_body_16 mb-3'>Reliability</p>
                        <div className='text-text_body_16 flex justify-between items-center mb-3'>
                            <p className='font-bold'>
                                4 <span className='font-normal'>Open Issues</span>
                            </p>
                            <div className="relative w-12 h-12">

                                {/* <div className="absolute w-full h-full rounded-full bg-red-500"></div> */}

                                <div
                                    className="absolute w-full h-full rounded-full bg-transparent border border-gray-100"
                                    style={{ background: 'conic-gradient(lime 0% 45%, white 45% 0%)' }}>
                                </div>

                                <div className="absolute w-1/2 h-1/2 bg-white dark:bg-background_dark_mode rounded-full top-3 left-3 border border-gray-100"></div>
                            </div>
                        </div>
                        <div className="flex space-x-4 justify-between">
                            <p className="px-12 py-2 bg-gray-100 rounded-md text-text_color_light text-sm font-medium shadow-sm">
                                0 H
                            </p>

                            <p className="px-12 py-2 bg-yellow-100 rounded-md text-text_color_light text-sm font-medium shadow-sm">
                                0 M
                            </p>

                            <p className="px-12 py-2 bg-gray-100 rounded-md text-text_color_light text-sm font-medium shadow-sm">
                                0 L
                            </p>
                        </div>
                    </div>
                    <div className='text-text_color_light flex-col items-center gap-3 border-r border-primary_color p-3'>
                        <p className='text-text_body_16 mb-3'>Maintainability</p>
                        <div className='text-text_body_16 flex justify-between items-center mb-3'>
                            <p className='font-bold'>
                                0 <span className='font-normal'>Open Issues</span>
                            </p>
                            <div className="relative w-12 h-12">

                            {/* <div className="absolute w-full h-full rounded-full bg-red-500"></div> */}

                                <div
                                    className="absolute w-full h-full rounded-full bg-transparent border border-gray-100"
                                    style={{ background: 'conic-gradient(lime 0% 45%, white 45% 0%)' }}>
                                </div>

                                <div className="absolute w-1/2 h-1/2 bg-white dark:bg-background_dark_mode rounded-full top-3 left-3 border border-gray-100"></div>
                            </div>
                        </div>
                        <div className="flex space-x-4 justify-between">
                            <p className="px-12 py-2 bg-red-100 rounded-md text-text_color_light text-sm font-medium shadow-sm">
                                52 H
                            </p>

                            <p className="px-12 py-2 bg-gray-100 rounded-md text-text_color_light text-sm font-medium shadow-sm">
                                0 M
                            </p>

                            <p className="px-12 py-2 bg-gray-100 rounded-md text-text_color_light text-sm font-medium shadow-sm">
                                0 L
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
