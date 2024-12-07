'use client'

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useGetBlogByUserUuidQuery } from "@/redux/service/blog";

type BlogCardProps = {
    uuid: string;
}

type Blog = {
    uuid: string;
    title: string;
    likesCount: number;
    viewsCount: number;
    countComments: number;
    description: string;
    thumbnail: string[];
    user: {
        uuid: string;
        firstName: string;
        lastName: string;
        profile: string;
    };
    createdAt: string;
}

export default function BlogUserCardComponent({ uuid }: BlogCardProps) {

    const { data } = useGetBlogByUserUuidQuery({ uuid: uuid });

    return (
        <section>
            {/* Header section below card */}
            <section className={'flex justify-between mt-5'}>
                <p className={'font-bold text-[20px]'}>More from {data?.data?.[0]?.user?.firstName} {data?.data?.[0]?.user?.lastName}</p>
                <Button className={'bg-[#B9FF66] text-black rounded-[16px]'}>See More</Button>
            </section>

            {/* Card blog section */}
            <section className={'m-5  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'}>
                {data?.data?.slice(0,6).map((blog: Blog) => (
                    <div key={blog.uuid} className=" mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="relative w-full h-48">
                            <Image
                                src={blog.thumbnail[0]} // Use the actual thumbnail URL
                                alt={blog.title}
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>

                        <div className="p-4">
                            <div className="flex items-center text-sm text-gray-500 mb-2">
                                <Image
                                    src={blog.user.profile} // Use the actual profile URL
                                    alt={`${blog.user.firstName} ${blog.user.lastName}`}
                                    width={32}
                                    height={32}
                                    className="rounded-full"
                                />
                                <div className="ml-2 flex justify-between w-full">
                                    <p className="font-medium">{blog.user.firstName} {blog.user.lastName}</p>
                                    <p>{new Date(blog.createdAt).toLocaleDateString()}</p>
                                </div>
                            </div>
                            <h2 className="line-clamp-2 text-lg font-semibold text-gray-800 mb-2">
                                {blog?.title}
                            </h2>
                            <p className="line-clamp-2 text-gray-600 text-sm mb-4">
                                {blog?.description}
                            </p>
                            <div className="flex justify-between items-center">
                                <div className={'flex justify-between gap-[20px]'}>
                                    <div className="flex items-center space-x-1 text-yellow-500">
                                        <span>👏</span>
                                        <span>{blog?.likesCount}</span>
                                    </div>
                                    <div className="flex items-center space-x-1 text-gray-500">
                                        <span>💬</span>
                                        <span>{blog?.countComments}</span>
                                    </div>
                                </div>
                                <a
                                    href="#"
                                    className="text-black font-medium hover:underline"
                                >
                                    Read more
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </section>
        </section>
    )
}