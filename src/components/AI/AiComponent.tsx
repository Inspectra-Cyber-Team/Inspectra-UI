"use client";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Settings,
  Copy,
  CheckIcon,
  LogOut,
  User,
  SendHorizonalIcon,
  LogIn,
  X
} from "lucide-react";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import NomessageComponent from "./NomessageComponent";
import Image from "next/image";
import {
  useCreateMessageMutation,
  useCreateSessionMutation,
  useDeleteSessionMutation,
  useGetAllMessageBySessionUuidQuery,
  useGetAllSessionsQuery,
} from "@/redux/service/chat-session";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useToast } from "../hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import "highlight.js/styles/atom-one-dark.css";
import CodeBlock from "./CodeBlock";
import { IoMenu } from "react-icons/io5";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import Loader from "./Loader";
import { BsStopCircleFill } from "react-icons/bs";
import { CgAttachment } from "react-icons/cg";
import { useUploadFileMutation } from "@/redux/service/faqs";

interface GenerationConfig {
  temperature: number;
  topK: number;
  topP: number;
  maxOutputTokens: number;
}


// ai model
const MODEL_NAME = "gemini-1.5-flash-8b"  //"gemini-1.0-pro";

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY as string;

export default function AIComponent() {

  const messageEndRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  const { toast } = useToast();

  const [activeSession, setActiveSession] = useState<string | any>(null);

  const [messages, setMessages] = useState<{ role: string; text: string; images?: any }[]>([]);

  const [inputValue, setInputValue] = useState<string>("");

  const [loading, setLoading] = useState(false);

  const [buttonLoading, setButtonLoading] = useState(false);

  const [isTyping, setIsTyping] = useState(false);

  const [controller, setController] = useState<AbortController | null>(null);

  // const abortController = new AbortController();

  const [activeChatIndex, setActiveChatIndex] = useState<number | null>(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [sessionUuid, setSessionUuid] = useState<string>("");

  const [sidebarVisible, setSidebarVisible] = useState(false);

  const [userUUID, setUserUUID] = useState<string>("");

  useEffect(() => {
    setUserUUID(localStorage.getItem("userUUID") ?? "");
  });

  const toggleSidebar = () => {
    setSidebarVisible((prevState) => !prevState);
  };

  //trigger when message changes make content grow to bottom auto scroll automatically
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollTo({
        top: messageEndRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  // fetch all chat sessions
  const { data: sessions } = useGetAllSessionsQuery(null);

  // Fetch messages for the selected session
  const { data: ChatMessages, refetch: refetchMessages } =
    useGetAllMessageBySessionUuidQuery(
      { sessionUuid: activeSession! },
      { skip: !activeSession }
    );


  // Mutations
  const [createSession] = useCreateSessionMutation();

  const [createMessage] = useCreateMessageMutation();

  const [deleteSession] = useDeleteSessionMutation();

  // upload file mutation
  const [uploadSingleFile] = useUploadFileMutation();


  // Load first session automatically
  const [sessionList, setSessionList] = useState<any[]>([]); // Store sessions

  useEffect(() => {
    if (sessions?.data?.length > 0) {
      setSessionList(sessions?.data); // Update session list
      if (!activeSession) {
        setActiveSession(sessions?.data[0]?.uuid); // Set default active session
      }
    }
  }, [sessions]);

  // Handle sending messages
  const sendMessage = async (responseText: string, promt: string) => {

    const payload = {
      sessionUuid: activeSession,
      query: promt,
      response: responseText,
      image: preViewImage
    };

    try {

      const res = await createMessage({ message: payload });

      // if (res?.data) {

      //   refetchMessages();

      // }
    } catch {

      toast({
        title: "Error",
        description: "An error occurred while sending the message.",
        variant: "error",
      });

    }
  };

  useEffect(() => {
    if (ChatMessages?.data) {
      const messages = ChatMessages.data.flatMap((msg: any) => [
        {
          role: "user",
          text: msg?.query, // User's input
          images: msg?.image
        },
        {
          role: "model",
          text: msg?.response, // AI's response
        },
      ]);

      setMessages(messages);
    }
  }, [ChatMessages]);


  const stopTyping = () => {

    setIsTyping(true); // Stop typing

    if (controller) {
      controller.abort();
    }

    setButtonLoading(false); // Reset the button state

    setIsTyping(false); // Reset the typing state

    setController(null);

    toast({
      title: "Typing Stopped",
      description: "The message generation was stopped.",
      variant: "success",
    });


  };


  const [preViewImage, setPreViewImag] = useState<string>("");


  // function generate text from images
  const generateImageText = async (image: File, promt: string) => {

    setLoading(true);

    setButtonLoading(true);

    try {
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: MODEL_NAME });

      //ts-ignore
      const generationConfig: GenerationConfig = {
        temperature: 0.9,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
      };

      const safetySettings = [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
      ];

      const reader = new FileReader();

      reader.onloadend = async () => {
        const base64String = reader.result as string;

        const request = {
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: promt,
                },
                {
                  inlineData: {
                    mimeType: image.type,
                    data: base64String.split(",")[1],
                  },
                },
              ],
            },
          ],
        };

        try {

          const result = await model.generateContent(request, {
            // @ts-expect-error: TypeScript does not recognize the shape of generationConfig and safetySettings
            generationConfig,
            safetySettings,
          });

          const responseText = result?.response?.candidates?.[0]?.content?.parts?.[0]?.text || "";

          let charIndex = 0;
          const newMessage = [
            { role: "user", text: promt, images: preViewImage },
            { role: "model", text: responseText || "AI is typing...", images: preViewImage },
          ]

          setMessages((prevMessages) => [...prevMessages, newMessage[1]]);

          const typeMessage = async () => {

            // if (abortController.signal.aborted) {
            //   await sendMessage(newMessages[1].text.slice(0, charIndex), prompt);
            //   setButtonLoading(false);
            //   return; // Stop typing if request is aborted
            // }
            if (charIndex < newMessage[1].text.length) {

              setMessages((prevMessages) => [
                ...prevMessages.slice(0, prevMessages.length - 1),
                {
                  role: "model",
                  text: newMessage[1].text.slice(0, charIndex + 1),
                },
              ]);
              charIndex++;
              setTimeout(typeMessage, 10); // Continue typing one character at a time
            } else {
              // Once typing is complete, send the message
              if (newMessage[1].text) {
                await sendMessage(newMessage[1].text, promt); // Send the response message from the typing effect
              }

              setButtonLoading(false);
              setPreViewImag("");
              setFileImage(null);
              setSendImage("");
            }
          };

          typeMessage();


          // if (responseText) {
          //   setLoading(false);
          //   setButtonLoading(false);
          //   await sendMessage(responseText, promt); // Send the message after the response
          // }

        } catch {

          toast({
            title: "Error",
            description: "An error occurred while generating text from the image.",
            variant: "error",
          });

        }
      };

      if (image) {
        reader.readAsDataURL(image);
      }

    } catch (error) {
      console.error("Error during chat generation:", error);
    }
    finally {
      setLoading(false);


    }

  };



  const handleFileSingleUpload = async (file: any) => {

    const formData = new FormData();

    formData.append("file", file);

    try {
      const response = await uploadSingleFile({ file: formData }).unwrap();

      // Check the response structure to ensure `fullUrl` exists
      if (response?.data?.fullUrl) {
        return response.data.fullUrl; // Return the full URL
      }
    } catch {

      toast({
        title: "Error",
        description: "An error occurred while uploading the file.",
        variant: "error",
      });

    }

  };

  const fileInputRef = useRef<HTMLInputElement>(null);


  const [fileImage, setFileImage] = useState<File | null>(null);

  const [sendImage, setSendImage] = useState<string>("");


  // file upload in this 
  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {

    const file = event.target.files?.[0];
    if (file) {

      const fullUrl = await handleFileSingleUpload(file);

      setFileImage(file);
      setPreViewImag(fullUrl);
      setSendImage(URL.createObjectURL(file));


    }
  };

  // Trigger file input click on icon click
  const handleClick = () => {
    fileInputRef.current?.click();
  };



  // fucntion generate text simple chat
  const runChat = async (prompt: string) => {

    setLoading(true);

    setButtonLoading(true);

    const abortController = new AbortController();

    setController(abortController);


    try {
      const genAI = new GoogleGenerativeAI(API_KEY);

      const model = genAI.getGenerativeModel({ model: MODEL_NAME });

      const generationConfig = {
        temperature: 0.9,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
      };

      const safetySettings = [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
      ];

      const chat = model.startChat({
        generationConfig,
        safetySettings,
        history: [
          { role: "user", parts: [{ text: prompt }] },
          ...messages.map((msg) => ({
            role: msg.role === "user" ? "user" : "model",
            parts: [{ text: msg.text }],
          })),
        ],
      });

      const result = await chat.sendMessage(prompt, { signal: abortController.signal });

      if (abortController.signal.aborted) {
        setIsTyping(false);
        toast({
          title: "Request Aborted",
          description: "Request has been aborted1",
          variant: "success",
        })
        setButtonLoading(false);
        return
      }

      const responseText = result.response?.text();


      if (abortController.signal.aborted) {
        setIsTyping(false)
        setButtonLoading(false);
        return;
      }

      // if (responseText) {
      //   await sendMessage(responseText, prompt); // Send the message after the response
      // }

      // Simulate typing effect
      let charIndex = 0;
      const newMessages = [
        { role: "user", text: prompt },
        { role: "model", text: responseText || "AI is typing..." },
      ];

      if (!abortController.signal.aborted) {
        setMessages((prevMessages) => [...prevMessages, newMessages[1]]);
      }


      const typeMessage = async () => {

        if (abortController.signal.aborted) {
          await sendMessage(newMessages[1].text.slice(0, charIndex), prompt);
          setButtonLoading(false);
          return; // Stop typing if request is aborted
        }
        if (charIndex < newMessages[1].text.length) {

          setMessages((prevMessages) => [
            ...prevMessages.slice(0, prevMessages.length - 1),
            {
              role: "model",
              text: newMessages[1].text.slice(0, charIndex + 1),
            },
          ]);
          charIndex++;
          setTimeout(typeMessage, 10); // Continue typing one character at a time
        } else {
          // Once typing is complete, send the message
          if (newMessages[1].text) {
            await sendMessage(newMessages[1].text, prompt); // Send the response message from the typing effect
          }
          setButtonLoading(false);
        }
      };

      typeMessage();
    } catch {

      toast({
        title: "Error",
        description: "An error occurred while generating text.",
        variant: "error",
      });

    }
    finally {
      setLoading(false);
    }
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

    event.preventDefault();

    setSendImage("");


    if (!inputValue.trim()) return;

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset height
    }

    setInputValue("");

    const prompt = (event.target as HTMLFormElement).prompt?.value.trim();

    if (!prompt) {
      return;
    };

    let newMessages;

    if (preViewImage && prompt) {

      newMessages = [...messages, { role: "user", text: prompt, images: preViewImage }];

    } else {
      newMessages = [...messages, { role: "user", text: prompt }];
    }

    if (activeChatIndex === null) {
      // Create new chat session

      setActiveChatIndex(0);
    }

    setMessages(newMessages);

    if (prompt && fileImage) {

      await generateImageText(fileImage!, prompt);
    } else if (prompt) {

      await runChat(prompt);
    }


    (event.target as HTMLFormElement).reset();

  };

  // Start a new chat (reset)
  const newChat = async () => {
    // call method to create new session
    const res = await createSession({});

    if (res.data) {
      setActiveSession(res.data.uuid);

      setActiveUuid(res?.data?.uuid);

      setSessionList([...sessionList, res?.data]);

      setMessages([]);
    } else {
      setSendImage("");
      setFileImage(null);
      setMessages([]);
    }
  };

  const [copyText, setCopyText] = useState<boolean>(false);
  //function copy to clipboard
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopyText(true);
    setTimeout(() => {
      setCopyText(false);
    }, 2000);
  };

  const [activeUuid, setActiveUuid] = useState<string>("");

  const handleChatSwitch = (uuid: string, index: number) => {

    setActiveUuid(uuid);

    const selectedSession = sessions?.data[index];

    if (selectedSession) {
      setActiveSession(selectedSession.uuid);
      setSendImage("");
      refetchMessages();
    }

  };

  // function handle delete session
  const handleDeleteSession = async (sessionUuid: string) => {

    const res = await deleteSession({ sessionUuid });

    if (res?.data == null) {
      toast({
        description: "Session deleted successfully",
        variant: "success",
      });

      setActiveSession(null);
      setMessages([]);

      setActiveChatIndex(null);
      setSendImage("");
      setDeleteModalOpen(false);
    }
  };

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset height
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${Math.min(scrollHeight, 120)}px`;

      // Show scrollbar only when exceeding 120px
      textareaRef.current.style.overflowY = scrollHeight > 120 ? "auto" : "hidden";
    }
  }, [inputValue]);

  //  fucntion handle logout
  const handleLogout = () => {
    fetch(process.env.NEXT_PUBLIC_BASE_URL_LOCALHOST + "/logout", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    })
      .then((res) => res.json())
      .then(() => {
        localStorage.clear();
        router.push("/");
      })
      .catch((error) => {
        console.error("Refresh Token error:", error);
      });
  };

  // handle function enter key press on text area instad of click icoon send
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (inputValue.trim()) {
        const form = e.currentTarget.closest("form");
        if (form) {
          form.requestSubmit();
        }
      }
    }
  };



  return (
    <section className="w-[88%] mx-auto">
      {/* Toggle Button for Sidebar */}
      <div className="lg:hidden flex justify-start ">
        <IoMenu onClick={toggleSidebar} className=" text-text_color_light dark:text-text_color_dark cursor-pointer">
          {sidebarVisible ? "Hide Sidebar" : "Show Sidebar"}
        </IoMenu>
      </div>

      <section className="flex my-4  h-[600px] bg-card_color_light dark:bg-card_color_dark rounded-xl ">

        {/* Sidebar */}
        <section className="w-1/3 border-r flex-col lg:flex hidden ">
          <section className="px-4 py-4 border-b">
            <h1 className="text-text_title_24 font-bold">Inspectra Chat AI</h1>
            <Button
              className="w-full bg-primary_color hover:bg-secondary_color text-black mt-4"
              onClick={newChat}
            >
              New chat <Plus className="h-4 w-4 text-black" />
            </Button>
          </section>

          <div className="flex-1 p-4 ">
            {sessionList?.map((res: any, index: any) => {
              // const filteredMessages = ChatMessages?.data?.filter(
              //   (msg: any) => msg?.chatSessionUuid === res?.uuid
              // );
              // const lastMessage =
              //   filteredMessages?.[filteredMessages.length - 1];

              return (
                <div key={res?.uuid}>
                  <div className="relative w-full group">
                    <Button
                      key={res?.uuid}
                      className={`w-full justify-start text-sm  bg-transparent hover:bg-gray-200 dark:hover:bg-gray-900 text-gray-900  dark:text-text_color_dark ${res.uuid === activeUuid
                        ? "bg-primary_color text-black dark:bg-primary_color dark:text-black"
                        : ""
                        }`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleChatSwitch(res?.uuid, index);
                      }}
                    >
                      <span className="truncate max-w-[300px] line-clamp-1 flex items-start">{res?.sessionName || "New chat"}</span>
                    </Button>

                    <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <FaTrashAlt
                        onClick={() => {
                          setDeleteModalOpen(true);
                          setSessionUuid(res?.uuid);
                        }}
                        className="h-4 w-4 text-red-600 hover:cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="border-t flex flex-col">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-start py-[33px]"
                >
                  <Settings className="mr-2 h-4 w-4" /> Settings
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="start" forceMount>
                {userUUID ? (
                  <>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {ChatMessages?.data?.[0]?.username || "U"}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="cursor-pointer hover:bg-gray-100 dark:hover:text-text_color_light"
                      onClick={() => router.push("/myprofile")}
                    >
                      <User className="mr-2 h-4 w-4" />
                      <span>My profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="cursor-pointer hover:bg-gray-100 dark:hover:text-text_color_light"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <DropdownMenuItem
                    className="cursor-pointer hover:bg-gray-100 dark:hover:text-text_color_light"
                    onClick={() => router.push("/login")}
                  >
                    <LogIn className="mr-2 h-4 w-4" />
                    <span>Login</span>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </section>

        {/* Sidebar using Sheet component */}
        <Sheet open={sidebarVisible} onOpenChange={setSidebarVisible}>
          <SheetContent
            side="left"
            className="w-1/2 bg-background_light_mode border-r flex flex-col dark:bg-background_dark_mode"
          >
            <SheetHeader>
              <SheetTitle className="md:text-base text-sm text-start">
                Inspectra Chat AI
              </SheetTitle>
            </SheetHeader>
            <div className="border-b">
              <Button
                className="w-full text-[10px] sm:text-base  bg-primary_color hover:bg-secondary_color text-black"
                onClick={newChat}
              >
                New chat <Plus className="sm:h-4 sm:w-4 h-2 w-2 text-black" />
              </Button>
            </div>
            <div className="flex-1 border-b border-t">
              {sessionList?.map((res: any, index: any) => {
                // const filteredMessages = ChatMessages?.data?.filter(
                //   (msg: any) => msg?.chatSessionUuid === res?.uuid
                // );
                // const lastMessage =
                //   filteredMessages?.[filteredMessages.length - 1];

                return (
                  <div key={res?.uuid}>
                    <div className="relative w-full group">
                      <Button
                        className={`w-full justify-start text-[10px]  sm:text-sm my-[6px] bg-transparent hover:bg-gray-200 text-gray-900 dark:bg-background_dark_mode dark:text-text_color_dark ${res.uuid === activeUuid
                          ? "bg-primary_color text-black dark:bg-primary_color dark:text-black"
                          : ""
                          }`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleChatSwitch(res?.uuid, index);
                        }}
                      >
                        <span className="truncate max-w-[200px] line-clamp-1 flex items-start">{res?.sessionName || "New chat"}</span>
                      </Button>
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <FaTrashAlt
                          onClick={() => {
                            setDeleteModalOpen(true);
                            setSessionUuid(res?.uuid);
                          }}
                          className="h-4 w-4 text-red-600 hover:cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="relative">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                  >
                    <Settings className="mr-2 h-4 w-4 " /> Settings
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-30 sm:w-56" align="start" forceMount>

                  {userUUID ? (
                    <>
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {ChatMessages?.data?.[0]?.username || "U"}
                          </p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="cursor-pointer hover:bg-gray-100 dark:hover:text-text_color_light"
                        onClick={() => router.push("/myprofile")}
                      >
                        <User className="mr-2 h-4 w-4" />
                        <span>My profile</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="cursor-pointer hover:bg-gray-100 dark:hover:text-text_color_light"
                        onClick={handleLogout}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <DropdownMenuItem
                      className="cursor-pointer  hover:bg-gray-100 dark:hover:text-text_color_light"
                      onClick={() => router.push("/login")}
                    >
                      <LogIn className="mr-2 h-4 w-4" />
                      <span>Login</span>
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

          </SheetContent>
        </Sheet>
        {/* end sidebar with shet here */}

        {/* Main Content */}
        <div className="relative flex flex-col w-full h-full ">
          <main className="flex-1  overflow-y-auto scrollbar-hide">
            <div ref={messageEndRef} className="h-full overflow-y-auto scrollbar-hide" >
              <div className="space-y-4 "        >
                {messages.length === 0 ? (
                  <div className="flex justify-center overflow-hidden items-center mt-28 ">
                    <NomessageComponent />
                  </div>
                ) : (
                  messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex mt-8 pb-2 px-5 w-full items-start gap-2  ${msg.role === "user" ? "justify-end " : "justify-start"
                        }`}
                    >
                      {msg.role !== "user" && (
                        <div className="md:w-10 md:h-10 w-6 h-6 rounded-full flex items-center justify-center text-black text-sm">
                          <Image
                            src="/images/logo_no_name.png"
                            alt="AI"
                            width={50}
                            height={50}
                          />
                        </div>
                      )}
                      <div
                        className={`inline-block px-3 md:px-5 text-text_body_16 sm:text-base py-1 md:py-2 rounded-tl-[20px] rounded-br-[20px] ${msg.role === "user"
                          ? "bg-primary_color dark:text-black text-black max-w-[60%]"
                          : "bg-background_light_mode text-gray-900 dark:bg-background_dark_mode dark:text-text_color_dark max-w-[60%] "
                          }`}
                      >
                        <CodeBlock content={msg?.text} />

                        {/* images send preview here */}
                        {msg?.role === "user" && msg?.images && (
                          <img src={msg?.images} alt="preview" className="w-1/2" />
                        )}


                      </div>

                      <div>
                        {msg.role === "model" &&
                          index === messages.length - 1 && (
                            <button
                              className="mt-4 text-gray-600 hover:text-text_color_light"
                              onClick={() => handleCopy(msg.text)}
                            >
                              {copyText ? (
                                <CheckIcon className="h-4 w-4" />
                              ) : (
                                <Copy className="h-4 w-4" />
                              )}
                            </button>
                          )}
                      </div>
                      {msg.role === "user" && (
                        <Image
                          src={
                            ChatMessages?.data?.[0]?.profile ||
                            "/placeholder/Profile_avatar.png"
                          }
                          alt={ChatMessages?.data?.[0]?.username}
                          width={50}
                          height={50}
                          className="md:w-10 md:h-10 w-6 h-6 rounded-full  flex items-center justify-center"
                        />
                      )}
                    </div>
                  ))
                )}

                {loading && (
                  <div className="flex justify-start items-start gap-2">
                    <div className="md:w-10 md:h-10 w-6 h-6 rounded-full flex items-center justify-center text-black text-sm px-5">
                      <Image
                        src="/images/logo_no_name.png"
                        alt="AI"
                        width={50}
                        height={50}
                      />
                    </div>
                    <div className="inline-block px-10 py-4 text-[10px] sm:text-base bg-background_light_mode text-gray-900 dark:bg-background_dark_mode dark:text-text_color_dark rounded-tl-[20px] rounded-br-[20px]">
                      <Loader />
                    </div>
                  </div>
                )}

              </div>
            </div>
          </main>

          {/* Image Preview */}
          <div className="relative">
            {sendImage && (
              <div className="w-20 top-4  bottom-14 left-[116px] relative">
                <Image
                  src={sendImage || ""}
                  alt="Preview"
                  width={50}
                  height={50}
                  className="w-full h-auto rounded-xl mb-3"
                />
                <X
                  type="button"
                  className="absolute p-1 top-0 right-0 cursor-pointer text-white bg-red-500 hover:bg-red-700 rounded-full"
                  onClick={() => {

                    setSendImage("")
                    setPreViewImag("");

                  }
                  } // Function to clear the image
                />
              </div>
            )}
          </div>


          {/* Input Form */}
          <div className="p-4 ">

            <div className="max-w-3xl mx-auto relative">

              <form onSubmit={onSubmit} className="flex gap-2 relative">

                <div className="top-2 left-2 static flex items-center">
                  <CgAttachment
                    onClick={handleClick}
                    className="w-5 h-5 cursor-pointer hover:opacity-60 transition-all"
                  />
                  {/* Hidden file input */}
                  <input
                    ref={fileInputRef}
                    name="image"
                    onChange={handleImageChange}
                    type="file"
                    className="hidden"
                  />
                </div>
                <div className="relative w-full">
                  <textarea
                    ref={textareaRef}
                    name="prompt"
                    placeholder="What's on your mind..."
                    value={inputValue}
                    onKeyDown={handleKeyDown}
                    onChange={(e) => setInputValue(e.target.value)}
                    rows={1}
                    className="flex sm:flex-1 focus:ring-none scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800 
                   focus:border-primary_color rounded-xl text-sm pr-12 p-3 w-full resize-none bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 
                  placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200 ease-in-out"

                  />


                  <button
                    type={buttonLoading ? "button" : "submit"}
                    className={`absolute inset-y-0 right-5 flex items-center ${loading || !inputValue.trim() ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                      }`}
                  // disabled={loading || !inputValue.trim()}
                  >
                    {buttonLoading ? <BsStopCircleFill className="cursor-pointer" onClick={() => stopTyping()} size={20} /> : <SendHorizonalIcon className="h-5 w-5 text-black dark:text-text_color_dark" />}
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>

        {/* modal delete chat session */}
        <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
          <DialogContent className="bg-card w-full max-w-[90%] md:max-w-md lg:max-w-lg mx-auto h-fit p-6 md:p-10 rounded-xl">
            <DialogHeader>
              <DialogTitle>Delete Chat</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              Are you sure you want to delete this chat session?
            </DialogDescription>

            <DialogFooter>
              <Button variant="ghost" onClick={() => setDeleteModalOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleDeleteSession(sessionUuid)}
              >
                Confirm
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </section>

    </section>
  );
}
