"use client";

import React, { useEffect, useState } from "react";
import {
  useDeleteBlogMutation,
  useGetBlogDetailsQuery,
  useLikeBlogMutation,
} from "@/redux/service/blog";
import { useReportMutation } from "@/redux/service/report";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
 
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { FaBookmark } from "react-icons/fa6";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { MdMoreVert } from "react-icons/md";
import {
  useCreateBookmarkMutation,
  useDeleteBookmarkMutation,
  useIsBookmarkedQuery,
} from "@/redux/service/bookmark";
import { Share, Share2, ShareIcon } from "lucide-react";
import { PiShareBold, PiShareDuotone, PiShareFat, PiShareFatBold, PiShareFatFill } from "react-icons/pi";
import { ShareModal } from "./ShareButton";

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

  const [submitReport, setSubmitReport] = useState(false);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [showModalReport, setShowModalReport] = useState(false);

  // set boolean for bookmark at blog
  const [isBookmark, setIsBookmark] = useState(false);

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

  // calling bookmark status
  const { data: isBookmarkData } = useIsBookmarkedQuery({ blogUuid: uuid });

  const { data } = useGetBlogDetailsQuery({ uuid });

  const [createReport] = useReportMutation();

  const [likeBlog] = useLikeBlogMutation();

  useEffect(() => {
    if (data) setBlogData(data?.data);

    const likedBlogs = JSON.parse(localStorage.getItem("likedBlogs") || "{}");
    setLikeColor(!!likedBlogs[data?.data?.uuid]);
  }, [data]);

  useEffect(() => {
    if (blogData?.description) {
      setTimeout(() => {
        document.querySelectorAll("pre code").forEach((block) => {
          hljs.highlightElement(block as HTMLElement);
        });
      }, 0);
    }
  });

  // handle check if blog is bookmarked
  useEffect(() => {
    try {
      if (isBookmarkData) {
        setIsBookmark(isBookmarkData?.data);
      } else {
        setIsBookmark(false);
      }
    } catch {
      toast({
        description: "Error checking bookmark status",
        variant: "error",
      });
    }
  }, [isBookmarkData]);

  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const connectWebSocket = () => {
      const ws = new WebSocket(process.env.NEXT_PUBLIC_WS_URL as string);

      ws.onopen = () => console.log("WebSocket connection established.");
      ws.onmessage = (event) => {
        try {
          const newBlog = JSON.parse(event.data);
          
          if (newBlog?.data?.uuid === uuid && newBlog.event === "like-blog") {
            setBlogData((prevData) => ({
              ...prevData,
              ...newBlog.data
            }));
          } else if (newBlog?.data?.uuid === uuid && newBlog.event === "unlike-blog") {
            setBlogData((prevData) => ({
              ...prevData,
              ...newBlog.data
            }));
            delete localStorage.likedBlogs[uuid];
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
      setSubmitReport(true);
      if (res.data) {
        toast({
          description: "Blog Report Successfully",
          variant: "success",
        });
        setSubmitReport(false);
        setShowModalReport(false);
        setModalOpen(true);
      } else {
        toast({
          description: "Report Message is required",
          variant: "error",
        });
        setSubmitReport(false);
      }
      if (res.error && "status" in res.error) {
        if (res.error.status === 401) {
          toast({
            description: "Please login to report the blog",
            variant: "error",
          });
          router.push("/login");
        }
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

      if (res.error && "status" in res.error) {
        if (res.error.status === 401) {
          toast({
            description: "Please login to like the blog",
            variant: "error",
          });
          router.push("/login");
        }
      }
      // Update local storage
      localStorage.setItem("likedBlogs", JSON.stringify(likedBlogs));


      data?.refetch();

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

  // handle delete blog
  const [deleteBlog] = useDeleteBlogMutation();

  const handleDeleteBlog = async (uuid: string) => {
    try {
      const res = await deleteBlog({ uuid });
      if (res.data == null) {
        toast({
          description: "Blog deleted successfully",
          variant: "success",
        });
        setDeleteModalOpen(false);
        router.push("/blog");
      } else {
        toast({
          description: "Error deleting the blog",
          variant: "error",
        });
      }
    } catch (error) {
      console.error("Error deleting the blog:", error);
      toast({
        description: "Error deleting the blog",
        variant: "error",
      });
    }
  };

  // function to bookmark blog
  const [createBookmark] = useCreateBookmarkMutation();

  const [deleteBookmark] = useDeleteBookmarkMutation();

  // function to handle remove bookmark

  const handleBookmark = async () => {
    try {
      const res = await createBookmark({ blogUuid: uuid });
      if (res.data) {
        toast({
          description: "Blog bookmarked successfully",
          variant: "success",
        });
        setIsBookmark(true);
      } else {
        toast({
          description: "Error bookmark the blog",
          variant: "error",
        });
        setIsBookmark(false);
      }
      if (res.error && "status" in res.error) {
        if (res.error.status === 401) {
          toast({
            description: "Please login to bookmark the blog",
            variant: "error",
          });
          router.push("/login");
        }
      }
    } catch (error) {
      toast({
        description: "Error bookmarking the blog",
        variant: "error",
      });
      setIsBookmark(false);
    }
  };

  // function to handle remove bookmark
  const handleRemoveBookmark = async () => {
    try {
      const res = await deleteBookmark({ blogUuid: uuid });
      if (res.data == null) {
        toast({
          description: "Bookmark removed successfully",
          variant: "success",
        });
        setIsBookmark(false);
      } else {
        toast({
          description: "Error removing the bookmark",
          variant: "error",
        });
        setIsBookmark(true);
      }
      if (res.error && "status" in res.error) {
        if (res.error.status === 401) {
          toast({
            description: "Please login to remove bookmark",
            variant: "error",
          });
          router.push("/login");
        }
      }
    } catch (error) {
      toast({
        description: "Error removing the bookmark",
        variant: "error",
      });
      setIsBookmark(true);
    }
  };

  const handleBookmarkToggle = async () => {
    try {
      if (!uuid) {
        return;
      }

      if (isBookmark) {
        handleRemoveBookmark();
        setIsBookmark(false);
      } else {
        handleBookmark();
        setIsBookmark(true);
      }
    } catch {
      toast({
        description: "Error toggling bookmark status",
        variant: "error",
      });
      setIsBookmark(false);
    }
  };

  const[isModalShare,setIsModalShare]=useState(false);

  const blogUrl = `https://inspectra.istad.co/blog/${uuid}`;

  // Open the modal
  const openModal = () => {
    setIsModalShare(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalShare(false);
  };

  return (
    <section className="w-[90%] mx-auto my-5 md:my-10">
      {/* header */}
      <div className="flex gap-3 text-text_body_16 text-text_color_desc_light dark:text-text_color_desc_dark lg:mb-10">
        <button onClick={() => router.push("/")}>Home</button>
        <span>/</span>
        <button onClick={() => router.push("/blog")}>Blog</button>
        <span>/</span>
        <p className="text-ascend_color">Blog Detail</p>
      </div>

      {/* Blog Details */}
      <div className="lg:w-[90%] mx-auto">
        <h1 className="md:text-4xl text-xl font-bold my-5">
          {blogData?.title}
        </h1>
        <div className="flex flex-col md:flex-row my-4 gap-6">
          <div className="flex items-center space-x-5">
            {/* Author Info */}
            <div className="flex items-center space-x-2">
              <img
                className="w-10 h-10 rounded-full"
                src={blogData?.user?.profile || "/placeholder/Profile_avatar.png"}
                alt="profile"
              />
              <p>
                {blogData?.user?.firstName} {blogData?.user?.lastName}
              </p>
            </div>
            {/* Created Date */}
            <div className="flex items-center space-x-2">
              <FaCalendarAlt className="text-text_color_desc_light text-xl" />
              <p>{convertToDayMonthYear(blogData?.createdAt || "")}</p>
            </div>
          </div>
          <div className="flex items-center space-x-6 sm:space-x-9">
            {/* Views */}
            <div className="flex space-x-2 items-center justify-center">
              <FaEye className="text-text_color_desc_light text-xl sm:text-2xl" />
              <p>{blogData?.viewsCount}</p>
            </div>
            {/* Likes */}
            <div
              className="flex space-x-2 items-center justify-center"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <FaHandsClapping
                className={`text-xl sm:text-2xl cursor-pointer mb-1 ${
                  likeColor ? "text-orange-400" : "text-text_color_desc_light"
                }`}
                onClick={() => handleLike(blogData?.uuid)}
              />
              <p>{blogData?.likesCount}</p>
            </div>


           {/* toolip Provideer start here  */}
            <TooltipProvider>
            {/* Comments */}
            <Tooltip delayDuration={250}>
    <TooltipTrigger asChild>
      <div className="flex space-x-2 items-center cursor-pointer">
        <FaCommentDots
          className="text-text_color_desc_light text-xl sm:text-2xl"
          onClick={() => setShowSidebar(!showSidebar)}
        />
        <p>{blogData?.countComments}</p>
      </div>
    </TooltipTrigger>
    <TooltipContent>
      <p>View Comments</p>
    </TooltipContent>
  </Tooltip>

 
  {/* Share Icon */}
  <Tooltip delayDuration={50}>
    <TooltipTrigger asChild>
      <div className="text-text_color_desc_light text-xl sm:text-2xl cursor-pointer mb-1">
        <PiShareFatFill
          onClick={() => openModal()}
          className="text-text_color_desc_light"
        />
      </div>
    </TooltipTrigger>
    <TooltipContent>
      <p>Share this post</p>
    </TooltipContent>
  </Tooltip>

  {/* Bookmark Icon */}
  <Tooltip delayDuration={50}>
    <TooltipTrigger asChild>
      <div className="text-text_color_desc_light text-xl sm:text-2xl cursor-pointer mb-1">
        <FaBookmark
          onClick={() => handleBookmarkToggle()}
          className={`${
            isBookmark ? "text-yellow-400" : "text-text_color_desc_light"
          }`}
        />
      </div>
    </TooltipTrigger>
    <TooltipContent>
      <p>{isBookmark ? "Remove Bookmark" : "Add to Bookmark"}</p>
    </TooltipContent>
  </Tooltip>

    {/* toolip Provider end here  */}
</TooltipProvider>


            {/* Action Buttons */}
            <div className="flex items-center justify-center">
              {userUUID === blogData?.user?.uuid && (
                // <Button
                //   onClick={() => router.push(`/blog/${uuid}/update`)}
                //   className="bg-[#B9FF66] text-black rounded-[16px]"
                // >
                //   Update Blog
                // </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="h-6 w-6 p-0">
                      <span className="sr-only">Open menu</span>
                      <MdMoreVert className="h-6 w-6 cursor-pointer" />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => router.push(`/blog/${uuid}/update`)}
                      className="text-secondary_color hover:cursor-pointer hover:bg-[#f5f5f5]"
                    >
                      <FaEdit className="mr-2 h-4 w-4" /> Edit
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => setDeleteModalOpen(true)}
                      className="text-destructive  hover:cursor-pointer hover:bg-[#f5f5f5]"
                    >
                      <FaTrashAlt className="mr-2 h-4 w-4" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}

              {/*  doesn't allow own blog report to thier blog */}
              {userUUID !== blogData?.user?.uuid && (
                <Dialog
                  open={showModalReport}
                  onOpenChange={setShowModalReport}
                >
                  <DialogTrigger asChild>
                    <div>
                      <MdReport className="text-destructive text-2xl sm:text-3xl cursor-pointer mb-1" />
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
                          handleSubmitReport({
                            blogUuid: uuid,
                            message: report,
                          })
                        }
                        className="bg-primary_color px-3 text-text_color_light dark:text-text_color_light rounded-tl-[20px] rounded-br-[20px] w-[110px] h-[36px] text-text_body_16"
                      >
                        {submitReport ? (
                          <div className="spinner-border animate-spin inline-block w-6 h-6 border-2 rounded-full border-t-2 border-text_color_light border-t-transparent"></div>
                        ) : (
                          "Submit"
                        )}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>
        </div>
        {/* Thumbnail */}
        {blogData?.thumbnail?.[0] && (
          <div className="w-full md:h-[400px]">
            <img
              className="w-full h-full object-contain"
              src={blogData?.thumbnail[0] || "/placeholder/blog_placeholder.png"}
              alt="thumbnail"
            />
          </div>
        )}
        {/* Description */}
        <hr className="my-5" />
        <div
          dangerouslySetInnerHTML={{
            __html: blogData?.description ?? "No Blog Description !",
          }}
        ></div>
      </div>

      {/* User Card */}
      <section className="mt-5">
        <hr />
        <BlogUserCardComponent uuid={blogData?.user?.uuid || ""} />
      </section>

      {/* Sidebar */}
      {showSidebar && (
        <div className="fixed px-5  md:block lg:block xl:block overflow-y-auto scrollbar-hide right-0 top-0 h-full w-[60%] sm:w-[50%] md:w-[30%] bg-white dark:bg-background_dark_mode shadow-lg z-50 transform translate-x-0">
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

      {/* delete modal */}
      <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
        <DialogContent className="bg-card w-full max-w-[90%] md:max-w-md lg:max-w-lg mx-auto h-fit p-6 md:p-10 rounded-xl">
          <DialogHeader>
            <DialogTitle>Delete Blog</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Are you sure you want to delete this blog?
          </DialogDescription>

          <DialogFooter>
            <Button variant="ghost" onClick={() => setDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => handleDeleteBlog(uuid)}
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ShareModal isOpen={isModalShare} onClose={closeModal} blogUrl={blogUrl} />

    </section>
  );
}
