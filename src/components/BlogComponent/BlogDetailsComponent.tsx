"use client";

import React, { useEffect, useState } from "react";
import {
  useGetBlogDetailsQuery,
  useLikeBlogMutation,
} from "@/redux/service/blog";
import { useReportMutation } from "@/redux/service/report";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MdReport, MdClear, MdCheckCircle } from "react-icons/md";
import { FaCalendarAlt, FaCommentDots, FaEye } from "react-icons/fa";
import { convertToDayMonthYear } from "@/lib/utils";
import { FaHandsClapping } from "react-icons/fa6";
import BlogUserCardComponent from "@/components/BlogComponent/BlogUserCardComponent";
import CommentSection from "@/components/CommentComponent/CommentComponent";
import { Blog } from "@/types/Blog";
import { useGetUserLikeBlogQuery } from "@/redux/service/userlikeblog";
import HoverModal from "./ModalHoverComponent";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/hooks/use-toast";


type BlogDetailsProps = Readonly<{
  uuid: string;
}>;

type ReportProps = {
  blogUuid: string;
  message: string;
};

export default function BlogDetailsComponent({ uuid }: BlogDetailsProps) {
  const { toast } = useToast();

  const router = useRouter();

  const [modalOpen, setModalOpen] = useState(false);

  const [showModalReport, setShowModalReport] = useState(false);

  const [userUUID, setUserUUID] = useState("");

  useEffect(() => {
    setUserUUID(localStorage.getItem("userUUID") ?? "");
  });

  //calling user like blog
  const { data: userLike, isLoading } = useGetUserLikeBlogQuery({ uuid });

  const [report, setReport] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);

  const [likeColor, setLikeColor] = useState(false);

  const [blogData, setBlogData] = useState<Blog | undefined>();
  const [socket, setSocket] = useState<WebSocket | null>(null);

  const { data } = useGetBlogDetailsQuery({ uuid });
  const [createReport] = useReportMutation();
  const [likeBlog] = useLikeBlogMutation();

  //set condition to show page

  useEffect(() => {
    if (data) setBlogData(data.data);

    const likedBlogs = JSON.parse(localStorage.getItem("likedBlogs") || "{}");
    setLikeColor(!!likedBlogs[data?.data?.uuid]);
  }, [data]);

  useEffect(() => {
    const connectWebSocket = () => {
      const ws = new WebSocket(process.env.NEXT_PUBLIC_WS_URL as string);

      ws.onopen = () => console.log("WebSocket connection established.");
      ws.onmessage = (event) => {
        try {
          const newBlog = JSON.parse(event.data);
          if (newBlog.uuid === uuid) {
            setBlogData((prevData) => ({
              ...prevData,
              ...newBlog,
            }));
          }
        } catch (error) {
          console.error("Error parsing WebSocket message:", error);
        }
      };
      ws.onerror = () => console.error("WebSocket error. Retrying...");
      ws.onclose = () => console.error("WebSocket closed. Retrying...");

      setSocket(ws);
    };

    if (!socket) connectWebSocket();

    return () => {
      socket?.close();
    };
  }, [uuid, socket]);

  const handleSubmitReport = async ({ blogUuid, message }: ReportProps) => {
    try {
      const res = await createReport({ report: { blogUuid, message } });
      setReport("");
      if (res.data) {
        toast({
          description: "Blog Report Successfully",
          variant: "success",
        });
        setShowModalReport(false);
        setModalOpen(true);
      }
    } catch (error) {
      console.error("Error reporting the blog:", error);
      toast({
        description: "Error reporting the blog",
        variant: "error",
      });
    }
  };

  const handleLike = async (blogUuid?: string) => {
    if (!blogUuid) {
      console.error("Blog UUID is undefined");
      return;
    }

    try {
      // Call the API to toggle like/unlike
      const res = await likeBlog({ uuid: blogUuid });
      const message = res?.data?.data; // Extract the message from the API response

      const likedBlogs = JSON.parse(localStorage.getItem("likedBlogs") || "{}");

      if (message === "Blog liked successfully") {
        // Blog has been liked
        setLikeColor(true);
        likedBlogs[blogUuid] = true; // Add blogUuid to local storage
      } else if (message === "Blog unliked successfully") {
        // Blog has been unliked
        setLikeColor(false);
        delete likedBlogs[blogUuid]; // Remove blogUuid from local storage
      }

      // Update local storage
      localStorage.setItem("likedBlogs", JSON.stringify(likedBlogs));

      // Notify via WebSocket
      socket?.send(
        JSON.stringify({
          type: message === "Blog liked successfully" ? "like" : "unlike",
          blogUuid,
          userUuid: blogData?.user?.uuid,
        })
      );

      console.log(message);
    } catch (error) {
      console.error("Error toggling like status:", error);
    }
  };

  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleMouseEnter = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const position = { top: rect.top - 10, left: rect.left + rect.width / 2 };

    // Add a small delay before showing the modal
    const timeout = setTimeout(() => {
      setModalPosition(position);
      setShowModal(true);
    }, 300);
    setHoverTimeout(timeout);
  };

  const handleMouseLeave = () => {
    if (hoverTimeout) clearTimeout(hoverTimeout);

    setTimeout(() => setShowModal(false), 200);
  };

  const modifiedDescription = blogData?.description.replace(
    /<img /g, 
    '<img style="max-width: 100%; height: auto; display: block; margin: 0 auto; object-fit: contain;" '
  );

  return (
    <section className="w-[90%] mx-auto my-[20px] md:my-[60px]">
      {/* Blog Details */}
      <div className="w-[90%] mx-auto">
        <h1 className="lg:text-[34px] md:text-[20px] font-bold">
          {blogData?.title}
        </h1>
        <div className="flex flex-col md:flex-row text-[16px] my-5 gap-[35px]">
          {/* Author Info */}
          <div className="flex items-center">
            <img
              className="w-10 h-10 rounded-full"
              src={blogData?.user?.profile}
              alt="profile"
            />
            <p className="ml-2">
              {blogData?.user?.firstName} {blogData?.user?.lastName}
            </p>
          </div>
          {/* Created Date */}
          <div className="flex gap-2 items-center">
            <FaCalendarAlt className="text-text_color_desc_light text-[24px]" />
            <p>{convertToDayMonthYear(blogData?.createdAt || "")}</p>
          </div>
          <div className="flex gap-[35px]">
            {/* Views */}
            <div className="flex gap-2 items-center">
              <FaEye className="text-text_color_desc_light text-[24px]" />
              <p>{blogData?.viewsCount}</p>
            </div>
            {/* Likes */}
            <div
              className="flex gap-2 items-center "
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <FaHandsClapping
                className={`text-[24px] cursor-pointer ${
                  likeColor ? "text-orange-400" : "text-text_color_desc_light"
                }`}
                onClick={() => handleLike(blogData?.uuid)}
              />
              <p>{blogData?.likesCount}</p>
            </div>
            {/* Comments */}
            <div className="flex gap-2 items-center">
              <FaCommentDots
                className="text-text_color_desc_light text-[24px] cursor-pointer"
                onClick={() => setShowSidebar(!showSidebar)}
              />
              <p>{blogData?.countComments}</p>
            </div>
            {/* Action Buttons */}
            <div className="flex items-end justify-end gap-3">
              {userUUID === blogData?.user?.uuid && (
                <Button
                  onClick={() => router.push(`/blog/${uuid}/update`)}
                  className="bg-[#B9FF66] text-black rounded-[16px]"
                >
                  Update Blog
                </Button>
              )}

              <Dialog open={showModalReport} onOpenChange={setShowModalReport}>
                <DialogTrigger asChild>
                  <div className="rounded-[16px]">
                    <MdReport className="text-custom_red text-[40px] cursor-pointer" />
                  </div>
                </DialogTrigger>
                <DialogContent className="bg-background_light_mode dark:bg-background_dark_mode max-w-md text-text_color_light dark:text-text_color_dark">
                  <DialogHeader>
                    <DialogTitle>Report</DialogTitle>
                  </DialogHeader>
                  <Textarea
                    placeholder="Write your concern here..."
                    value={report}
                    onChange={(e) => setReport(e.target.value)}
                    className="mt-4 focus:outline-none focus:ring-0 focus:border-none !border-none"
                  />
                  <div className="flex justify-end">
                    <Button
                      onClick={() =>
                        handleSubmitReport({ blogUuid: uuid, message: report })
                      }
                      className="bg-primary_color px-3 text-text_color_light dark:text-text_color_light rounded-tl-[20px] rounded-br-[20px] w-[110px] h-[36px] text-text_body_16"
                    >
                      Submit
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
        {/* Thumbnail */}
        {blogData?.thumbnail?.[0] && (
          <div className="w-full md:h-[400px]">
            <img
              className="w-full h-full object-contain"
              src={blogData.thumbnail[0]}
              alt="thumbnail"
            />
          </div>
        )}
        {/* Description */}
        <div
          dangerouslySetInnerHTML={{ __html: modifiedDescription || "" }}
        ></div>
        
      </div>

      {/* User Card */}
      <section className="mt-5">
        <hr />
        <BlogUserCardComponent uuid={blogData?.user?.uuid || ""} />
      </section>

      {/* Sidebar */}
      {showSidebar && (
        <div className="fixed px-5 hidden md:block lg:block xl:block overflow-y-auto scrollbar-hide right-0 top-0 h-full w-[30%] bg-white dark:bg-background_dark_mode shadow-lg z-50 transform translate-x-0">
          <p className="font-bold mt-3">User Response</p>
          <button
            className="absolute top-4 right-4 text-gray-600 dark:text-text_color_dark"
            onClick={() => setShowSidebar(false)}
          >
            <MdClear />
          </button>
          <CommentSection uuid={uuid} />
        </div>
      )}

      {/* Hover Modal */}
      {showModal && userLike && (
        <HoverModal
          likes={userLike?.data}
          position={modalPosition}
          isloading={isLoading}
        />
      )}

      {/* model show info after report */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="bg-white dark:bg-background_dark_mode max-w-md  p-[50px]  w-full mx-auto">
          <MdCheckCircle size={100} className="text-primary_color mx-auto" />
          <div className="text-center">
            <p className="font-bold text-[24px]">Thanks for letting us know</p>
            <p className="text-base mt-1 dark:text-text_color_desc_dark ">
              We use your feedback to help our systems learn when something's
              not right.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
