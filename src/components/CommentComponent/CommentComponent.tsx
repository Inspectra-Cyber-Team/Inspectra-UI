"use client";
import React, { useEffect, useRef, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FaCommentDots } from "react-icons/fa";
import { convertToDayMonthYear } from "@/lib/utils";
import { FaHandsClapping } from "react-icons/fa6";
import {
  useCreateCommentMutation,
  useGetCommentByBlogUuidQuery,
  useCreateLikeCommentMutation,
  useReplyMutation,
  useLikeReplyMutation,
  useEditCommentMutation,
  useDeleteCommentMutation,
  useEditReplyMutation,
  useDeleteReplyMutation,
} from "@/redux/service/comment";
import { Content, Reply } from "@/types/Blog";
import { useToast } from "../hooks/use-toast";
import { Skeleton } from "../ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Edit, MoreHorizontal, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

type commentProp = {
  uuid: string;
};

const CommentSection = ({ uuid }: commentProp) => {
  //calling toast function
  const { toast } = useToast();

  const router = useRouter();

  const [userUUID, setUserUUID] = useState("");

  useEffect(() => {
    setUserUUID(localStorage.getItem("userUUID") ?? "");
  });

  //handle create comment
  const [createComment] = useCreateCommentMutation();
  const [content, setContent] = useState("");

  const handleCreateComment = async (blogUuid: string) => {
    try {

      if (!content.trim()) {
        toast({
          description: "Please write a comment on the blog",
          variant: "error",
        });
        return;
      }

      const res = await createComment({ comment: { content, blogUuid } });

      if (res.data) {
        toast({
          description: "Comment successfully",
          variant: "success",
        });
        setContent("");
      } else {
        toast({
          description: "Something went wrong",
          variant: "error",
        });
      }
      if (res.error && "status" in res.error) {
        if (res.error.status === 401) {
          toast({
            description: "Please login to comment on the blog",
            variant: "error",
          });
          router.push("/login");
        }
      }
    } catch  {
      toast({
        description: "Something went wrong",
        variant: "error",
      });
    }
  };

  // handle edit comment
  const [editComment] = useEditCommentMutation();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [commentUuid, setCommentUuid] = useState<string>("");

  const handleEditComment = async (uuid: string, content: string) => {
    try {

      if (!content.trim()) {
        toast({
          description: "Please write a comment on the blog",
          variant: "error",
        });
        return;
      }

      const res = await editComment({ uuid, content });

      if (res.data) {
        toast({
          description: "Comment edited successfully",
          variant: "success",
        });
        setEditModalOpen(false);
      } else {
        toast({
          description: "Something went wrong",
          variant: "error",
        });
      }
      if (res.error && "status" in res.error) {
        if (res.error.status === 401) {
          toast({
            description: "Please login to edit the comment",
            variant: "error",
          });
          router.push("/login");
        }
      }
    } catch (error) {
      toast({
        description: "Something went wrong",
        variant: "error",
      });
      console.error("Error editing the comment:", error);
    }
  };

  const [deleteComment] = useDeleteCommentMutation();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleDeleteComment = async (uuid: string) => {
    try {
      const res = await deleteComment({ uuid: uuid });

      if (res.data == null) {
        toast({
          description: "Comment deleted successfully",
          variant: "success",
        });
        setDeleteModalOpen(false);
      } else {
        toast({
          description: "Something went wrong",
          variant: "error",
        });
      }
      if (res.error && "status" in res.error) {
        if (res.error.status === 401) {
          toast({
            description: "Please login to delete the comment",
            variant: "error",
          });
          router.push("/login");
        }
      }
    } catch (error) {
      toast({
        description: "Something went wrong",
        variant: "error",
      });
      console.error("Error deleting the comment:", error);
    }
  };

  //get all comment
  const { data: comment, isLoading } = useGetCommentByBlogUuidQuery({
    uuid: uuid,
    page: 0,
    size: 25,
  });

  const [dataComment, setDataComment] = useState<Content[]>([]);


  const [socket, setSocket] = useState<WebSocket | null>(null);

  const receivedUuidsRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    const connectWebSocket = () => {
      const ws = new WebSocket(process.env.NEXT_PUBLIC_WS_URL as string);

      ws.onopen = () => console.log("WebSocket connection established.");
      
      ws.onmessage = (event) => {
        try {
          const newComment = JSON.parse(event.data);

          if (newComment?.data?.uuid && newComment.event == "create" && !receivedUuidsRef.current.has(newComment?.data?.uuid)) {
            // Add unique comment to the list and track its UUID
            setDataComment((prevData) => [newComment.data,...prevData]);
            receivedUuidsRef.current.add(newComment?.data?.uuid);
          }
           else if (newComment?.data?.uuid && newComment.event === "delete") {
            // Remove the comment with the corresponding UUID
            setDataComment((prevData) => prevData.filter(comment => comment.uuid !== newComment.data.uuid));

            receivedUuidsRef.current.delete(newComment?.data?.uuid);
          }

          else if (newComment?.data?.uuid && newComment.event === "update") {
            // Update the comment with the corresponding UUID
            setDataComment((prevData) => prevData.map(comment => 
              comment.uuid === newComment.data.uuid ? { ...comment, ...newComment.data } : comment
            ));
          } 

          else if (newComment?.data?.uuid && newComment.event === "like") {
            // Add a like to the comment, ensure only one like per user
            setDataComment((prevData) => prevData.map((comment:any) => 
              comment.uuid === newComment.data.uuid && !comment.likedBy?.includes(newComment.data.user.uuid) 
                ? { 
                    ...comment, 
                    countLikes: (comment.countLikes || 0) + 1,
                    likedBy: [...(comment.likedBy || []), newComment.data.user.uuid] // Track the user who liked
                  } 
                : comment
            ));
          } else if (newComment?.data?.uuid && newComment.event === "unlike") {
            // Remove a like from the comment, ensure only one unlike per user
            setDataComment((prevData) => prevData.map((comment:any) => 
              comment.uuid === newComment.data.uuid && comment.likedBy?.includes(newComment.data.user.uuid) 
                ? { 
                    ...comment, 
                    countLikes: Math.max((comment.countLikes || 0) - 1, 0),
                    likedBy: comment.likedBy.filter((userUuid:any) => userUuid !== newComment.data.user.uuid) // Remove user from likedBy
                  } 
                : comment
            ));
          } else if (newComment.event === "create-reply" && newComment.data ) {
            
            const replyData = newComment?.data;

            // Ensure replies are added to the correct parent comment and prevent duplication
            setDataComment((prevData) =>
              prevData.map((comment) =>
                comment.uuid === replyData.parentCommentUuid  // Ensure correct parent association
                  ? {
                      ...comment,
                      replies: comment.replies?.some(reply => reply.uuid === replyData.uuid)
                        ? comment.replies  // If the reply already exists, keep existing replies
                        : [...(comment.replies || []), replyData]  // Otherwise, add the new reply
                    }
                  : comment
              )
            );
            
          } // Handle the 'delete-reply' event
          else if (newComment?.event === "delete-reply" && newComment?.data) {

            const { parentCommentUuid, uuid} = newComment?.data || {};
      
            setDataComment((prevData) =>
              prevData.map((comment) =>
                comment.uuid === parentCommentUuid  // Ensure correct parent association
                  ? {
                      ...comment,
                      replies: comment.replies?.filter(reply => reply.uuid !== uuid ),  // Remove the reply
                    }
                  : comment
              )
            );
          }
          else if (newComment?.event === "update-reply" && newComment?.data) {
      
            const { parentCommentUuid, uuid } = newComment?.data || {};

            setDataComment((prevData) =>
       
              prevData.map((comment) =>
       
                comment.uuid === parentCommentUuid  // Ensure correct parent association
            ? {
                ...comment,
                replies: comment.replies?.map((reply:any) =>
                  reply.uuid === uuid
                    ? { ...reply, ...newComment?.data }  // Update the reply with new data
                    : reply
                ),
              }
            : comment
        )
      );
    } else if (newComment?.event === "like-reply" && newComment?.data) {
      const { parentCommentUuid, uuid, user } = newComment?.data || {};
    
      setDataComment((prevData) =>
        prevData.map((comment) =>
          comment.uuid === parentCommentUuid
            ? {
                ...comment,
                replies: comment.replies?.map((reply: any) =>
                  reply.uuid === uuid
                    ? {
                        ...reply,
                        // Check if the user has already liked the reply
                        countLikes: reply.likedBy?.includes(user.uuid) ? reply.countLikes : (reply.countLikes || 0) + 1,
                        // Prevent adding the user if they already liked the reply
                        likedBy: reply.likedBy?.includes(user.uuid)
                          ? reply.likedBy
                          : [...(reply.likedBy || []), user.uuid], 
                      }
                    : reply
                ),
              }
            : comment
        )
      );
    }
     else if (newComment?.event === "unlike-reply" && newComment?.data) {
      
      const { parentCommentUuid, uuid, user } = newComment?.data || {};

      setDataComment((prevData) =>
        prevData.map((comment) =>
          comment.uuid === parentCommentUuid  // Ensure correct parent association
            ? {
                ...comment,
                replies: comment.replies?.map((reply:any) =>
                  reply.uuid === uuid
                    ? { 
                        ...reply, 
                        countLikes: Math.max((reply.countLikes || 0) - 1, 0),
                        likedBy: reply.likedBy?.filter((userUuid:any) => userUuid !== user.uuid) // Remove user from likedBy
                      } 
                    : reply
                ),
              }
            : comment
        )
      );
    }

        } catch (error) {
          console.error("Error parsing WebSocket message:", error);
        }
      };

      ws.onerror = () => console.error("WebSocket error occurred.");
      ws.onclose = () => console.log("WebSocket closed.");

      setSocket(ws);
    };

    if (!socket) connectWebSocket();

    return () => {
      socket?.close();
    };
  }, [socket]);


  useEffect(() => {
    if (comment) {
      setDataComment(comment?.content);
    }
  }, [comment]);

  const [replyToComment] = useReplyMutation();

  const [likeReply] = useLikeReplyMutation();

  const [replyContent, setReplyContent] = useState<{ [key: string]: string }>({});

  const [replyNestedContent, setReplyNestedContent] = useState<{ [key: string]: string }>({});


  const [showReplies, setShowReplies] = useState<{ [key: string]: boolean }>(
    {}
  );

  const [showReplyInput, setShowReplyInput] = useState<{
    [key: string]: boolean;
  }>({});

  const [showNesTedReplyInput, setShowNesTedReplyInput] = useState<{[key: string]: boolean;}>({});

  const [showComments, setShowComments] = useState(true);

  const toggleReplies = (commentUuid: string) => {
    setShowReplies((prevState) => ({
      ...prevState,
      [commentUuid]: !prevState[commentUuid],
    }));
  };

  const toggleReplyInput = (commentUuid: string) => {
    setShowReplyInput((prevState) => ({
      ...prevState,
      [commentUuid]: !prevState[commentUuid],
    }));
  };

  const toggleNestedReplyInput = (commentUuid: string) => {
    setShowNesTedReplyInput((prevState) => ({
      ...prevState,
      [commentUuid]: !prevState[commentUuid],
    }));
  };

  const handleReplySubmit = async (commentUuid: string) => {
    try {
      const contentToReply = 
      replyContent[commentUuid]?.trim() ? replyContent[commentUuid] 
      : replyNestedContent[commentUuid] ?? "";
    
 
      if (!contentToReply.trim()) {
        toast ({
          description: "Please write a reply the comment",
          variant: "error"
        })
        return;
      }

      const res = await replyToComment({
        data: { commentUuid, content: contentToReply },
      });

      setReplyContent((prevState) => ({
        ...prevState,
        [commentUuid]: "",
      }));

      setReplyNestedContent((prevState) => ({
        ...prevState,
        [commentUuid]: "",
      }));

      if (res.error && "status" in res.error) {
        if (res.error.status === 401) {
          toast({
            description: "Please login to reply to the comment",
            variant: "error",
          });
          router.push("/login");
        }
      }
    } catch (error) {
      console.error("Error replying to the comment:", error);
    }
  };

  // handle like reply comment
  const handleLikeReply = async (replyUuid: string) => {
    try {
      


      const res = await likeReply({ replyUuid: replyUuid });

      if (res.error && "status" in res.error) {
        if (res.error.status === 401) {
          toast({
            description: "Please login to like the reply",
            variant: "error",
          });
          router.push("/login");
        }
      }
    } catch (error) {
      toast({
        description: "Something went wrong",
        variant: "error",
      });
      console.error("Error liking the reply:", error);
    }
  };

  //calling function to create like comment
  const [createLikeComment] = useCreateLikeCommentMutation();

  const handleLikeComment = async (commentUuid: string) => {
    try {
      const res = await createLikeComment({ commentUuid });

      if (res.error && "status" in res.error) {
        if (res.error.status === 401) {
          router.push("/login");
        }
      }
    } catch  {
      toast({
        description: "Something went wrong",
        variant: "error",
      });
     
    }
  };

  const [modalType, setModalType] = useState(null);
  const [replyUuid, setReplyUuid] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const [editReply] = useEditReplyMutation();
  const [deleteReply] = useDeleteReplyMutation();

  // handle edit reply
  const handleEditReply = async (uuid: string, content: string) => {
    try {

      if (!content.trim()) {
        toast({
          description: "Please write a reply the comment",
          variant: "error",
        });
        return;
      }

      const res = await editReply({ uuid, content });

      if (res.data) {
        toast({
          description: "Reply edited successfully",
          variant: "success",
        });
      } else {
        toast({
          description: "Something went wrong",
          variant: "error",
        });
      }
      if (res.error && "status" in res.error) {
        if (res.error.status === 401) {
          router.push("/login");
        }
      }
    } catch (error) {
      toast({
        description: "Something went wrong",
        variant: "error",
      });
      console.error("Error editing the reply:", error);
    }
  };

  // handle delete reply
  const handleDeleteReply = async (uuid: string) => {
    try {
      const res = await deleteReply({ uuid });

      if (res.data == null) {
        toast({
          description: "Reply deleted successfully",
          variant: "success",
        });
      } else {
        toast({
          description: "Something went wrong",
          variant: "error",
        });
      }
      if (res.error && "status" in res.error) {
        if (res.error.status === 401) {
          router.push("/login");
        }
      }
    } catch (error) {
      toast({
        description: "Something went wrong",
        variant: "error",
      });
      console.error("Error deleting the reply:", error);
    }
  };

  const openModal = (type: any, replyUuid: any, currentContent = "") => {
    setModalType(type);
    setReplyUuid(replyUuid);
    setContent(currentContent);
    setModalOpen(true); // Open the modal
  };

  const handleModalAction = () => {
    if (modalType === "editReply") {
      handleEditReply(replyUuid, content); // Edit reply
    } else if (modalType === "deleteReply") {
      handleDeleteReply(replyUuid); // Delete reply
    }
    setModalOpen(false); // Close the modal after action
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        {[...Array(2)].map((_, index: number) => (
          <div key={index} className="space-y-4">
            <div className="flex items-start gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                </div>
                <Skeleton className="h-4 w-3/4" />
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-4" />
                  </div>
                  <Skeleton className="h-4 w-24" />
                  <div className="flex-1 flex justify-end">
                    <Skeleton className="h-4 w-16" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <section className="">
      <section className={"flex h-full mx-auto flex-col justify-between"}>
        <div>
          <Textarea
            placeholder="Write your comment here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mt-4 p-3 h-[130px] rounded-[20px] border-0 bg-[#f5f5f5] dark:bg-card_color_dark dark:border-b-background_dark_mode"
          />
          <div className={"flex justify-end my-3"}>
            <Button
              onClick={() => handleCreateComment(uuid)}
              className="right-4 mt-2 bg-primary_color px-3 text-text_color_light dark:text-text_color_light rounded-tl-[20px] rounded-br-[20px] w-[110px] h-[36px] text-text_body_16"
            >
              Submit
            </Button>
          </div>
        </div>
      </section>

      <section className="mt-2">
        <button onClick={() => setShowComments(!showComments)} className="mb-4">
          {showComments ? "Hide Comments" : "Show Comments"}
        </button>
        {showComments &&
          dataComment?.map((comment: Content) => (
            <div key={comment.uuid} className="border-b border-gray-200 py-2">
              <div className="flex items-center mb-2">
                <img
                  className="w-8 h-8 rounded-full"
                  width={8}
                  height={8}
                  src={comment?.user?.profile || "/placeholder/Profile_avatar.png"}
                  alt="profile"
                />
                <div className={"flex justify-between w-full "}>
                  <div className="ml-2">
                    <p className="font-semibold">
                      {comment.user.firstName} {comment.user.lastName}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(comment.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <p>{convertToDayMonthYear(comment?.createdAt)}</p>
                </div>
              </div>
              <p className="">{comment.content}</p>
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center my-3">
                  <FaHandsClapping
                    onClick={() => handleLikeComment(comment?.uuid)}
                    className="cursor-pointer text-text_color_desc_light dark:text-text_color_desc_dark"
                  />
                  <span className="ml-2 text-gray-500">
                    {comment.countLikes}
                  </span>
                  {comment?.replies?.length > 0 && (
                    <>
                      <FaCommentDots
                        className="text-gray-500 cursor-pointer ml-4"
                        onClick={() => toggleReplies(comment.uuid)}
                      />
                      <button
                        className="ml-2 cursor-pointer text-[14px]"
                        onClick={() => toggleReplies(comment.uuid)}
                      >
                        {showReplies[comment.uuid]
                          ? "Hide Replies"
                          : "Show Replies"}
                      </button>
                    </>
                  )}
                </div>

                <div className="flex justify-end text-[14px]">
                  <button onClick={() => toggleReplyInput(comment.uuid)}>
                    Reply
                  </button>
                  {userUUID === comment.user.uuid && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-6 w-6 p-0 ml-1">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => {
                            setContent(comment?.content);
                            setCommentUuid(comment?.uuid);
                            setEditModalOpen(true);
                          }}
                          className="text-yellow-600 hover:cursor-pointer hover:bg-[#f5f5f5]"
                        >
                          <Edit className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => {
                            setCommentUuid(comment?.uuid);
                            setDeleteModalOpen(true);
                          }}
                          className="text-destructive  hover:cursor-pointer hover:bg-[#f5f5f5]"
                        >
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              </div>

              {showReplyInput[comment.uuid] && (
                <div className="my-3">
                  <Textarea
                    placeholder="Write your reply here..."
                    value={replyContent[comment.uuid] || ""}
                    onChange={(e) =>
                      setReplyContent((prevState) => ({
                        ...prevState,
                        [comment.uuid]: e.target.value,
                      }))
                    }
                    className="mt-2 px-3 rounded-[20px] border-0 bg-[#f5f5f5] dark:bg-card_color_dark dark:border-b-background_dark_mode"
                  />
                  <div className="flex justify-end my-3">
                    <Button
                      onClick={() => handleReplySubmit(comment.uuid)}
                      className="mt-2 bg-primary_color px-3 text-text_color_light dark:text-text_color_light rounded-tl-[20px] rounded-br-[20px] w-[110px] h-[36px] text-text_body_16"
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              )}

              {showReplies[comment.uuid] && comment.replies.length > 0 && (
                <div className="ml-4 mt-2">
                  {comment.replies.map((reply: Reply) => (
                    <div
                      key={reply.uuid}
                      className="border-b border-gray-200 py-2"
                    >
                      <div className={"border-s px-4"}>
                        <div className={"flex justify-between w-full"}>
                          <div className="flex items-center mb-2">
                            <img
                              className="w-7 h-7 rounded-full dark:text-text_color_desc_dark"
                              src={reply.user.profile}
                              alt="profile"
                            />
                            <div className="ml-2">
                              <p className="font-semibold dark:text-text_color_desc_dark text-sm">
                                {reply.user.firstName} {reply.user.lastName}
                              </p>
                              <p className="text-sm text-gray-500">
                                {new Date(reply.createdAt).toLocaleTimeString(
                                  [],
                                  {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }
                                )}
                              </p>
                            </div>
                          </div>
                          <p>{convertToDayMonthYear(reply?.createdAt)}</p>
                        </div>
                        <p className="mb-2">{reply.content}</p>
                        <div className={"flex w-full"}>
                          <div className="flex items-center">
                            <FaHandsClapping
                              onClick={() => handleLikeReply(reply?.uuid)}
                              className="cursor-pointer text-text_color_desc_light dark:text-text_color_desc_dark"
                            />
                            <span className="ml-1 text-gray-500">
                              {reply.countLikes}
                            </span>
                          </div>
                          <div className="flex ml-auto text-[14px]">
                            <button
                              onClick={() =>
                                toggleNestedReplyInput(reply.uuid)
                              }
                            >
                              Reply
                            </button>
                            {userUUID === reply.user.uuid && (
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    className="h-6 w-6 p-0 ml-1"
                                  >
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    onClick={() =>
                                      openModal(
                                        "editReply",
                                        reply?.uuid,
                                        reply?.content
                                      )
                                    }
                                    className="text-yellow-600 hover:cursor-pointer hover:bg-[#f5f5f5]"
                                  >
                                    <Edit className="mr-2 h-4 w-4" /> Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    onClick={() =>
                                      openModal("deleteReply", reply?.uuid)
                                    }
                                    className="text-destructive  hover:cursor-pointer hover:bg-[#f5f5f5]"
                                  >
                                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            )}
                          </div>
                        </div>
                      </div>

                      <div>
                        {showNesTedReplyInput[reply.uuid] && (
                          <div className="my-3">
                            <Textarea
                              placeholder="Write your reply here..."
                              value={replyNestedContent[comment.uuid] || ""}
                              onChange={(e) =>
                                setReplyNestedContent((prevState) => ({
                                  ...prevState,
                                  [comment.uuid]: e.target.value,
                                }))
                              }
                              className="mt-2 px-3 rounded-[20px] border-0 bg-[#f5f5f5] dark:bg-card_color_dark dark:border-b-background_dark_mode"
                            />
                            <div className="flex justify-end my-3">
                              <Button
                                onClick={() => handleReplySubmit(comment.uuid)}
                                className="mt-2 bg-primary_color px-3 text-text_color_light rounded-tl-[20px] rounded-br-[20px] w-[110px] h-[36px] text-text_body_16"
                              >
                                Submit
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
      </section>

      {/* edit comment modal */}
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent className="bg-card w-full max-w-[90%] md:max-w-md lg:max-w-lg mx-auto h-fit p-6 md:p-10 rounded-xl">
          <DialogHeader>
            <DialogTitle>Update Comment</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <h2 className="text-sm font-medium mb-2 block">Your Comment</h2>
              <Input
                id="Question"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setEditModalOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-primary_color text-black"
              onClick={() => handleEditComment(commentUuid, content)}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* delete modal */}
      <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
        <DialogContent className="bg-card w-full max-w-[90%] md:max-w-md lg:max-w-lg mx-auto h-fit p-6 md:p-10 rounded-xl">
          <DialogHeader>
            <DialogTitle>Delete Comment</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Are you sure you want to delete this comment?
          </DialogDescription>

          <DialogFooter>
            <Button variant="ghost" onClick={() => setDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => handleDeleteComment(commentUuid)}
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dynamic Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="bg-card w-full max-w-[90%] md:max-w-md lg:max-w-lg mx-auto h-fit p-6 md:p-10 rounded-xl">
          <DialogHeader>
            <DialogTitle>
              {modalType === "editReply" && "Edit Reply"}
              {modalType === "deleteReply" && "Delete Reply"}
            </DialogTitle>
          </DialogHeader>
          <DialogDescription>
            {modalType === "deleteReply" &&
              "Are you sure you want to delete this reply?"}
          </DialogDescription>

          {modalType === "editReply" && (
            <div>
              <h2 className="text-sm font-medium mb-2 block">Your Reply</h2>
              <Input
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
          )}

          <DialogFooter>
            <Button variant="ghost" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button
              className={
                modalType === "deleteReply"
                  ? "bg-destructive"
                  : "bg-primary_color text-black"
              }
              onClick={handleModalAction}
            >
              {modalType === "deleteReply" ? "Confirm" : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default CommentSection;
