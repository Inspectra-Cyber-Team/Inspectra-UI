"use client";
import {
  useDeleteBookmarkMutation,
  useGetBookmarksQuery,
} from "@/redux/service/bookmark";
import React, { useEffect, useState } from "react";
import { Blog } from "@/types/Blog";
import { useRouter } from "next/navigation";
import {
  FaCalendarAlt,
  FaCommentDots,
  FaEye,
  FaTrashAlt,
} from "react-icons/fa";
import { FaHandsClapping } from "react-icons/fa6";
import { convertToDayMonthYear } from "@/lib/utils";
import { useToast } from "../hooks/use-toast";
import LoadProjectComponent from "../Project/LoadingProjectComponent/LoadProjectComponent";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function BookmarkComponent() {
  const router = useRouter();

  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState("bookmark");

  const handleTabClick = (tab: any) => {
    setActiveTab(tab);

    if (tab === "scanHistory") {
      router.push("/scanhistory");
    } else if (tab === "mYprofile") {
      router.push("/myprofile");
    } else if (tab === "blogHistory") {
      router.push("/bloghistory");
    }
  };

  const [uuid, setUuid] = React.useState<string>("");

  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);

  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);

  const { data: bookmarkData, isLoading } = useGetBookmarksQuery({
    page: currentPage - 1,
    pageSize: 4,
  });

  // Set total pages from the API response
  useEffect(() => {
    if (bookmarkData) {
      setTotalPages(bookmarkData?.totalPages);
    }
  }, [bookmarkData]);

  // Function to handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const [deleteBookmark] = useDeleteBookmarkMutation();

  const blogList = bookmarkData?.content?.[0]?.blog;

  if (bookmarkData?.totalElements === 0) {
    return (
      <div className="w-[90%] mx-auto">
        <div className="flex justify-center md:justify-between pb-2">
          <p className="text-text_title_20 text-text_color_light dark:text-text_color_dark hidden md:inline-block">
            Blog Bookmark
          </p>
          <div className="flex gap-6 text-text_body_16">
            <button
              onClick={() => handleTabClick("bloghistory")}
              className={`pb-2 ${
                activeTab === "bloghistory"
                  ? "border-b-2 border-ascend_color text-ascend_color"
                  : "text-text_color_desc_light dark:text-text_color_desc_dark"
              }`}
            >
              Blog <span className="hidden md:inline-block">History</span>
            </button>
            <button
              onClick={() => setActiveTab("bookmark")}
              className={`pb-2 ${
                activeTab === "bookmark"
                  ? "border-b-2 border-ascend_color text-ascend_color"
                  : "text-text_color_desc_light dark:text-text_color_desc_dark"
              }`}
            >
              <span className="hidden md:inline-block">Blog</span> Bookmark
            </button>
            <button
              onClick={() => handleTabClick("scanhistory")}
              className={`pb-2 ${
                activeTab === "scanhistory"
                  ? "border-b-2 border-ascend_color text-ascend_color"
                  : "text-text_color_desc_light dark:text-text_color_desc_dark"
              }`}
            >
              Scan <span className="hidden md:inline-block">History</span>
            </button>
            <button
              onClick={() => handleTabClick("myprofile")}
              className={`pb-2 ${
                activeTab === "myprofile"
                  ? "border-b-2 border-ascend_color text-ascend_color"
                  : "text-text_color_desc_light dark:text-text_color_desc_dark"
              }`}
            >
              Profile <span className="hidden md:inline-block">Setting</span>
            </button>
          </div>
        </div>
        <div className="w-full bg-card_color_light dark:bg-card_color_dark rounded-[20px] my-10 p-10">
          <LoadProjectComponent textDisplay="No bookmark found" />
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <section className="mx-auto max-w-[88%] mt-1">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex w-full gap-4 ">
            <div className="flex-1 space-y-4">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <div className="flex items-center gap-4">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
            {/* Image placeholder on the right */}
            <Skeleton className="h-32 w-32 rounded-lg" />
          </div>
        ))}
      </section>
    );
  }

  const handleRemoveBookmark = async (uuid: string) => {
    try {
      if (!uuid) {
        return;
      }

      const res = await deleteBookmark({ blogUuid: uuid });
      if (res.data == null) {
        toast({
          description: "Bookmark removed successfully",
          variant: "success",
        });
        setDeleteModalOpen(false);
      } else {
        toast({
          description: "Error removing the bookmark",
          variant: "error",
        });
        setDeleteModalOpen(false);
      }
    } catch (error) {
      toast({
        description: "Error removing the bookmark",
        variant: "error",
      });
      setDeleteModalOpen(false);
    }
  };

  return (
    <section className="w-[90%] mx-auto">
      {/* header */}
      <div className="flex justify-center md:justify-between pb-2">
        <p className="text-text_title_20 text-text_color_light dark:text-text_color_dark hidden md:inline-block">
          Blog Bookmark
        </p>
        <div className="flex gap-6 text-text_body_16">
          <button
            onClick={() => handleTabClick("blogHistory")}
            className={`pb-2 ${
              activeTab === "blogHistory"
                ? "border-b-2 border-ascend_color text-ascend_color"
                : "text-text_color_desc_light dark:text-text_color_desc_dark"
            }`}
          >
            Blog <span className="hidden md:inline-block">History</span>
          </button>
          <button
            onClick={() => setActiveTab("bookmark")}
            className={`pb-2 ${
              activeTab === "bookmark"
                ? "border-b-2 border-ascend_color text-ascend_color"
                : "text-text_color_desc_light dark:text-text_color_desc_dark"
            }`}
          >
            <span className="hidden md:inline-block">Blog</span> Bookmark
          </button>
          <button
            onClick={() => handleTabClick("scanHistory")}
            className={`pb-2 ${
              activeTab === "scanHistory"
                ? "border-b-2 border-ascend_color text-ascend_color"
                : "text-text_color_desc_light dark:text-text_color_desc_dark"
            }`}
          >
            Scan <span className="hidden md:inline-block">History</span>
          </button>
          <button
            onClick={() => handleTabClick("myProfile")}
            className={`pb-2 ${
              activeTab === "myProfile"
                ? "border-b-2 border-ascend_color text-ascend_color"
                : "text-text_color_desc_light dark:text-text_color_desc_dark"
            }`}
          >
            Profile <span className="hidden md:inline-block">Setting</span>
          </button>
        </div>
      </div>
      {/* body content */}
      <section className="bg-card_color_light dark:bg-card_color_dark rounded-[20px] my-10 p-5">
        {blogList?.map((blog: Blog, index: number) => (
          <div
            key={index}
            className="flex my-5 flex-wrap lg:flex-nowrap justify-center lg:justify-between cursor-pointer items-center border-b border-b-text_color_desc_light dark:border-b-text_color_desc_dark pb-5"
          >
            <div className="flex flex-col gap-3 lg:w-[55%]">
              {/* profile */}
              <div className="flex gap-3 items-center">
                <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    src={blog?.user?.profile}
                    alt="profile"
                  />
                </div>
                <p className="text-text_color_desc_light  cursor-pointer  dark:text-text_color_desc_dark">
                  {blog?.user?.firstName} {blog?.user?.lastName}
                </p>
              </div>

              {/* title */}
              <h4
                onClick={() => router.push(`/blog/${blog?.uuid}`)}
                className="text-text_title_20 cursor-pointer line-clamp-2 text-text_color_light dark:text-text_color_dark font-semibold"
              >
                {blog?.title}
              </h4>

              {/* description */}
              <p
                className="text-text_body_16  cursor-pointer  text-text_color_desc_light dark:text-text_color_desc_dark line-clamp-1"
                dangerouslySetInnerHTML={{ __html: blog?.description || "" }}
              ></p>

              {/* created at */}
              <div className="flex space-x-8 mt-3">
                <div className="flex gap-2 items-center">
                  <FaCalendarAlt className="text-text_color_desc_light dark:text-text_color_desc_dark text-xl" />
                  <p>{convertToDayMonthYear(blog?.createdAt)}</p>
                </div>

                {/* view */}
                <div className="flex gap-2 items-center">
                  <FaEye className="text-text_color_desc_light dark:text-text_color_desc_dark text-2xl" />
                  <p>{blog?.viewsCount}</p>
                </div>

                {/* like */}
                <div className="hidden md:inline-block">
                  <div className="flex gap-2 items-center">
                    <FaHandsClapping className="text-text_color_desc_light dark:text-text_color_desc_dark text-xl" />
                    <p>{blog?.likesCount}</p>
                  </div>
                </div>

                {/* comment */}
                <div className="hidden md:inline-block">
                  <div className="flex gap-2 items-center">
                    <FaCommentDots className="text-text_color_desc_light dark:text-text_color_desc_dark text-xl" />
                    <p>{blog?.countComments}</p>
                  </div>
                </div>

                {/* remove bookmark */}
                <div className="flex gap-2 items-center">
                  <button
                    onClick={(e: any) => {
                      e.preventDefault();
                      setUuid(blog?.uuid);
                      setDeleteModalOpen(true);
                    }}
                    className="cursor-pointer flex gap-2 hover:text-custom_red dark:hover:text-custom_red items-center text-text_color_desc_light dark:text-text_color_desc_dark"
                  >
                    <FaTrashAlt />
                    Delete
                  </button>
                </div>
              </div>
            </div>

            {/* thumbnail */}
            <div
              className={"w-[300px] h-[180px] hidden lg:block overflow-hidden"}
            >
              <img
                className="w-full h-full object-cover rounded-xl transition-transform duration-300 hover:scale-110"
                src={blog?.thumbnail[0]}
                alt="thumbnail"
              />
            </div>
          </div>
        ))}
        <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
          <DialogContent className="bg-card w-full max-w-[90%] md:max-w-md lg:max-w-lg mx-auto h-fit p-6 md:p-10 rounded-xl">
            <DialogHeader>
              <DialogTitle>Remove Bookmark</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              Are you sure you want to remove this bookmark?
            </DialogDescription>

            <DialogFooter>
              <Button variant="ghost" onClick={() => setDeleteModalOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleRemoveBookmark(uuid)}
              >
                Confirm
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        {/* pagination */}
        <Pagination className="flex justify-center mt-10">
          <PaginationContent className="flex gap-2 items-center">
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() =>
                  currentPage > 1 && handlePageChange(currentPage - 1)
                } // Go to previous page
              />
            </PaginationItem>

            {/* Display page numbers dynamically */}
            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href="#"
                  onClick={() => handlePageChange(index + 1)}
                  className={
                    currentPage === index + 1 ? "bg-[#B9FF66] text-black" : ""
                  } // Highlight active page
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() =>
                  currentPage < totalPages && handlePageChange(currentPage + 1)
                } // Go to next page
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </section>
    </section>
  );
}
