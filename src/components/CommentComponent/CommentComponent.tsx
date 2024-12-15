'use client'
import React, {  useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useReplyMutation } from "@/redux/service/reply";
import { FaCommentDots } from "react-icons/fa";
import { convertToDayMonthYear } from "@/lib/utils";
import { FaHandsClapping } from "react-icons/fa6";
import {
  useCreateCommentMutation,
  useGetCommentByBlogUuidQuery,
  useCreateLikeCommentMutation,
} from "@/redux/service/comment";
import { Content, Reply } from "@/types/Blog";
import { useToast } from "../hooks/use-toast";
import { Skeleton } from "../ui/skeleton";

type commentProp = {
  uuid: string;
};

const CommentSection = ({ uuid }: commentProp) => {
  //calling toast function
  const { toast } = useToast();

  //handle create comment
  const [createComment] = useCreateCommentMutation();
  const [content, setContent] = useState("");

  const handleCreateComment = async (blogUuid: string) => {
    try {
      const res = await createComment({ comment: { content, blogUuid } });
      setContent("");
      console.log("Comment response:", res);
    } catch (error) {
      console.error("Error commenting on the blog:", error);
    }
  };



  //get all comment
  const { data: comment ,isLoading} = useGetCommentByBlogUuidQuery({
    uuid: uuid,
    page: 0,
    size: 25,
  });

  const [dataComment, setDataComment] = useState<Content[]>([]);

  const [socket, setSocket] = useState<WebSocket | null>(null);


   useEffect(() => {

      const connectWebSocket = () => {

        const ws = new WebSocket(process.env.NEXT_PUBLIC_WS_URL as string);
  
        ws.onopen = () => console.log("WebSocket connection established.");
        ws.onmessage = (event) => {
          try {
            const newComment = JSON.parse(event.data);

            console.log("Received new comment:", newComment);
     
            if (
              newComment &&
              newComment.uuid &&
              newComment.content &&
              newComment.user &&
              newComment.replies &&
              newComment.createdAt
            ) {
              // Append the new comment to the existing list
              setDataComment((prevData) => [...prevData, newComment]);
            } else {
              console.warn("Received comment is missing required fields:", newComment);
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
    }, [uuid,socket]);

    
  useEffect(() => {
    if (comment) {
      setDataComment(comment?.content);
    }
  }, [comment]);
    
   console.log('this is new comment',dataComment)

  const [replyToComment] = useReplyMutation();

  const [replyContent, setReplyContent] = useState<{ [key: string]: string }>(
    {}
  );

  const [showReplies, setShowReplies] = useState<{ [key: string]: boolean }>(
    {}
  );

  const [showReplyInput, setShowReplyInput] = useState<{
    [key: string]: boolean;
  }>({});

  const [showReplyInReplyInput, setShowReplyInReplyInput] = useState<{
    [key: string]: boolean;
  }>({});

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

  const toggleReplyInReplyInput = (commentUuid: string) => {
    setShowReplyInReplyInput((prevState) => ({
      ...prevState,
      [commentUuid]: !prevState[commentUuid],
    }));
  };

  const handleReplySubmit = async (commentUuid: string) => {
    try {
      const res = await replyToComment({
        data: { commentUuid, content: replyContent[commentUuid] },
      });
      setReplyContent((prevState) => ({
        ...prevState,
        [commentUuid]: "",
      }));
      console.log("Reply response:", res);
    } catch (error) {
      console.error("Error replying to the comment:", error);
    }
  };

  //calling function to create like comment
  const [createLikeComment] = useCreateLikeCommentMutation();

  const handleLikeComment = async (commentUuid: string) => {
    try {
      const res = await createLikeComment({ commentUuid });

      if (res.data) {
        toast({
          description: "Comment liked successfully",
          variant: "success",
        });
      }
    } catch (error) {
      toast({
        description: "Something went wrong",
        variant: "error",
      });
      console.error("Error liking the comment:", error);
      
    }
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
          <div className={"flex justify-end"}>
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
                  src={comment?.user?.profile}
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
                <div className="flex items-center">
                  <FaHandsClapping
                    onClick={() => handleLikeComment(comment?.uuid)}
                    className="cursor-pointer text-text_color_desc_light dark:text-text_color_desc_dark"
                  />
                  <span className="ml-1 text-gray-500">
                    {comment.countLikes}
                  </span>
                  {comment.replies.length > 0 && (
                    <>
                      <FaCommentDots
                        className="text-gray-500 cursor-pointer ml-4"
                        onClick={() => toggleReplies(comment.uuid)}
                      />
                      <button
                        className="ml-1 cursor-pointer text-[14px]"
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
                </div>
              </div>

              {showReplyInput[comment.uuid] && (
                <div className="mt-2">
                  <Textarea
                    placeholder="Write your reply here..."
                    value={replyContent[comment.uuid] || ""}
                    onChange={(e) =>
                      setReplyContent((prevState) => ({
                        ...prevState,
                        [comment.uuid]: e.target.value,
                      }))
                    }
                    className="mt-2 px-3 rounded-[20px] border-0 bg-[#f5f5f5] dark:border-b-background_dark_mode"
                  />
                  <div className="flex justify-end">
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
                            <FaHandsClapping className="cursor-pointer text-text_color_desc_light dark:text-text_color_desc_dark" />
                            <span className="ml-1 text-gray-500">
                              {reply.countLikes}
                            </span>
                          </div>
                          <div className="flex ml-auto">
                            <Button
                              onClick={() =>
                                toggleReplyInReplyInput(reply.uuid)
                              }
                            >
                              Reply
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div>
                        {showReplyInReplyInput[reply.uuid] && (
                          <div className="mt-2">
                            <Textarea
                              placeholder="Write your reply here..."
                              value={replyContent[comment.uuid] || ""}
                              onChange={(e) =>
                                setReplyContent((prevState) => ({
                                  ...prevState,
                                  [comment.uuid]: e.target.value,
                                }))
                              }
                              className="mt-2 px-3 rounded-[20px] border-0 bg-[#f5f5f5] "
                            />
                            <div className="flex justify-end">
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
    </section>
  );
};

export default CommentSection;
