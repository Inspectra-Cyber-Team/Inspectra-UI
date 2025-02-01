// 'use client'
// import { useEffect, useState } from "react"; // Added React import
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Plus, Settings, Send, Copy, TicketCheck, CheckIcon } from "lucide-react";
// import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
// import NomessageComponent from "./NomessageComponent";
// import Image from "next/image";
// import { set } from "date-fns";

// const MODEL_NAME = "gemini-1.0-pro";
// const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY as string;

// export default function AIComponent() {

//   const [chatHistory, setChatHistory] = useState<{ messages: { role: string; text: string }[] }[]>([]);

//   const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);

//   const [loading, setLoading] = useState(false);

//   const [activeChatIndex, setActiveChatIndex] = useState<number | null>(null); 

//   useEffect(() => {
//     // Load chat history from localStorage when the component mounts
//     const storedChatHistory = localStorage.getItem('chatHistory');
//     if (storedChatHistory) {
//       setChatHistory(JSON.parse(storedChatHistory));
//     }
//   }, []);

//   useEffect(() => {
//     // Save chat history to localStorage whenever it changes
//     if (chatHistory.length > 0) {
//       localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
//     }
//   }, [chatHistory]);



//   async function runChat(prompt: string) {

//     setLoading(true);

//     const genAI = new GoogleGenerativeAI(API_KEY);

//     const model = genAI.getGenerativeModel({ model: MODEL_NAME });

//     const generationConfig = {
//       temperature: 0.9,
//       topK: 1,
//       topP: 1,
//       maxOutputTokens: 2048,
//     };

//     const safetySettings = [
//       {
//         category: HarmCategory.HARM_CATEGORY_HARASSMENT,
//         threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//       },
//       {
//         category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
//         threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//       },
//       {
//         category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
//         threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//       },
//       {
//         category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
//         threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//       },
//     ];

//     const chat = model.startChat({
//       generationConfig,
//       safetySettings,
//       history: [{ role: "user", parts: [{ text: prompt }] }, ...messages.map((msg) => ({
//         role: msg.role === "user" ? "user" : "model",
//         parts: [{ text: msg.text }],
//       }))],
//     });

//     const result = await chat.sendMessage(prompt);
    
//     const response = result.response;
    
//     // Simulate typing effect by adding one character at a time
//     const newMessages = [
//       { role: "user", text: prompt },
//       { role: "model", text: response?.text() || "AI is typing..."},
//     ];


//     let charIndex = 0;
//     const typingSpeed = 10; // Adjust the speed of typing effect (in milliseconds)

//     // Add user message immediately
    

//     setMessages((prevMessages) => [...prevMessages, newMessages[1]]);

//     const typeMessage = () => {
//       if (charIndex < newMessages[1].text.length) {
//         setMessages((prevMessages) => [
//           ...prevMessages.slice(0, prevMessages.length - 1),
//           { role: "model", text: newMessages[1].text.slice(0, charIndex + 1) },
//         ]);
//         charIndex++;
//         setTimeout(typeMessage, typingSpeed); // Recur until all characters are added
//       }
//     };

//     setChatHistory(prev => {
//       const updatedChats = [...prev];
//       if (activeChatIndex !== null) {
//         updatedChats[activeChatIndex] = { messages: newMessages };
//       }
//       return updatedChats;
//     });

//     typeMessage();
//     setLoading(false);
//   }

//   const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     const prompt = (event.target as HTMLFormElement).prompt?.value.trim();
  
//     if (!prompt) return;

//     const newMessages = [...messages, { role: "user", text: prompt }];
  
//     if (activeChatIndex === null) {
//       // Create a new chat session if none exists
//       setChatHistory([{ messages: newMessages }]);
//       setActiveChatIndex(0);
//     } else {
//       // Ensure activeChatIndex is within range before updating
//       if (activeChatIndex >= 0 && activeChatIndex < chatHistory.length) {
//         setChatHistory(prev => {
//           const updatedChats = [...prev];
//           updatedChats[activeChatIndex].messages.push({ role: "user", text: prompt });
//           return updatedChats;
//         });
//       }
//     }
  
//     setMessages(newMessages);

//     runChat(prompt);

//     (event.target as HTMLFormElement).reset();
//   };
  

//   // Start a new chat (reset)
//   const newChat = () => {
//     // Add current chat to history before starting a new one
//     if (activeChatIndex !== null) {
//       setChatHistory((prev) => [
//         ...prev,
//         { messages: [{ role: "user", text: "" }] }, // Placeholder for new chat
//       ]);
//     }

//     setMessages([]); // Reset messages
//     setActiveChatIndex(chatHistory.length); // Set the index to new chat
//   };

//   const [copyText, setCopyText] = useState<boolean>(false);
//   //function copy to clipboard
//   const handleCopy = (text: string) => {
//     navigator.clipboard.writeText(text);
//     setCopyText(true);
//     setTimeout(() => {
//       setCopyText(false);
//     }, 2000);
//   };

//   const handleChatSwitch = (index: number) => {
    
//     const chat = chatHistory[index];

//     setMessages(chat.messages);

//     setActiveChatIndex(index);
//   };


//   return (
//     <section className="flex mt-6 h-[800px] w-[88%] mx-auto bg-white rounded-lg shadow-lg dark:bg-background_dark_mode">
//       {/* Sidebar */}
//       <div className="w-1/2 border-r flex flex-col">
//         <div className="px-8 py-8 border-b">
//           <h1 className="text-xl font-bold mb-4">Inspectra Chat AI</h1>
//           <Button className="w-full bg-primary_color hover:bg-secondary_color text-black" onClick={newChat}>
//             New chat <Plus className="h-4 w-4 text-black" />
//           </Button>
//         </div>
//         <ScrollArea className="flex-1 p-4">
//           {chatHistory.map((_, index) => (
//             <Button
//               key={index}
//               className={` w-full justify-start text-sm my-[6px]  bg-transparent text-gray-900 dark:bg-background_dark_mode dark:text-text_color_dark` + (index === activeChatIndex ? " bg-primary_color text-black dark:bg-primary_color dark:text-black" : "")}
//               onClick={() => handleChatSwitch(index)}
//             >
//               {chatHistory[index].messages[0].text || "New chat"}
//             </Button>
//           ))}
//         </ScrollArea>

//         <div className="p-4 border-t">
//           <Button variant="ghost" className="w-full justify-start py-[33px]" onClick={() => {}}>
//             <Settings className="mr-2 h-4 w-4" /> Settings
//           </Button>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex flex-col w-full">
//         <main className="flex-1 overflow-auto py-6 mx-[20px]">
//           <ScrollArea className="h-full scrollbar-hide">
//             <div className="space-y-4">
//               {messages.length === 0 ? (
//                 <div className="flex justify-center items-center h-screen">
//                   <NomessageComponent />
//                 </div>
//               ) : (
//                 messages.map((msg, index) => (
//                   <div key={index} className={`flex items-start gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
//                     {msg.role !== "user" && (
//                       <div className="w-10 h-10 rounded-full flex items-center justify-center text-black text-sm">
//                         <Image src="/images/logo_no_name.png" alt="AI" width={50} height={50} />
//                       </div>
//                     )}
//                     <div className={`rounded-lg px-4 py-3 max-w-[80%] ${msg.role === "user" ? "bg-primary_color text-black" : "bg-gray-100 text-gray-900 dark:bg-background_dark_mode dark:text-text_color_dark"}`}>
//                       <p>{msg.text}</p>
//                     </div>
//                     <div>
//                       {msg.role === "model" && index === messages.length - 1 && (
//                         <button className="mt-4 text-gray-600 hover:text-gray-900" onClick={() => handleCopy(msg.text)}>
//                           {copyText ? <CheckIcon className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
//                         </button>
//                       )}
//                     </div>
//                     {msg.role === "user" && (
//                       <div className="w-8 h-8 rounded-full bg-secondary_color flex items-center justify-center">U</div>
//                     )}
//                   </div>
//                 ))
//               )}
             
//             </div>
//           </ScrollArea>
//         </main>

//         {/* Input Form */}
//         <div className="border-t p-4">
//           <div className="max-w-3xl mx-auto">
//             <form onSubmit={onSubmit} className=" sm:flex gap-2">
//               <Input type="text" name="prompt" placeholder="What's on your mind..." className="flex sm:flex-1 py-4 sm:py-8 rounded-xl" />
//               <Button type="submit" className="bg-primary_color hover:opacity-70 sm:py-8 max-sm:w-full mt-2 sm:mt-0 p-4  rounded-xl" disabled={loading}>
//                 <Send className="sm:h-4 sm:w-4 text-black" />
//               </Button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }








'use client'
import { useEffect, useState } from "react"; // Added React import
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Settings, Send, Copy, TicketCheck, CheckIcon } from "lucide-react";
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import NomessageComponent from "./NomessageComponent";
import Image from "next/image";
import { set } from "date-fns";
import { useCreateMessageMutation, useCreateSessionMutation, useDeleteSessionMutation, useGetAllMessageBySessionUuidQuery, useGetAllSessionsQuery } from "@/redux/service/chat-session";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MdMoreVert } from "react-icons/md";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useToast } from "../hooks/use-toast";

const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY as string;

export default function AIComponent() {

  const {toast } = useToast();

  const [activeSession, setActiveSession] = useState<string | any>(null);

  const [chatHistory, setChatHistory] = useState<{ messages: { role: string; text: string }[] }[]>([]);

  const [chatHistory1,setChatHistory1] = useState<any>([]);

  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);

  const [loading, setLoading] = useState(false);

  const [activeChatIndex, setActiveChatIndex] = useState<number | null>(null); 


  // fetch all chat sessions
  const {data:sessions} = useGetAllSessionsQuery(null);


  // Fetch messages for the selected session
  const { data: ChatMessages, refetch: refetchMessages } = useGetAllMessageBySessionUuidQuery(
    { sessionUuid: activeSession! },
    { skip: !activeSession }
  );


   // Mutations
   const [createSession] = useCreateSessionMutation();
   const [createMessage, { isLoading }] = useCreateMessageMutation();
   const [deleteSession] = useDeleteSessionMutation();

    // Load first session automatically
  useEffect(() => {
    if (sessions?.data?.length > 0 && !activeSession) {
      setActiveSession(sessions);
    }
  }, [sessions]);


  const [messageInput, setMessageInput] = useState<string>("");

  const [repsonse,setResponse] = useState<string>("");

  // Handle sending messages
  const sendMessage = async () => {

    if (!messageInput.trim() || !activeSession) return;

    const payload = {
      sessionUuid: activeSession,
      query: messageInput,
      response: repsonse,
    }

    const res = await createMessage({message: payload});

    if(res?.data){

    setMessageInput("");
    refetchMessages(); // Refresh messages after sending

    }
  };


  // useEffect(() => {
  //   // Load chat history from localStorage when the component mounts
  //   const storedChatHistory = localStorage.getItem('chatHistory');
  //   if (storedChatHistory) {
  //     setChatHistory(JSON.parse(storedChatHistory));
  //   }
  // }, []);

  // useEffect(() => {
  //   // Save chat history to localStorage whenever it changes
  //   if (chatHistory.length > 0) {
  //     localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
  //   }
  // }, [chatHistory]);


  useEffect(() => {
    if (ChatMessages?.data) {
      const messages = ChatMessages.data.flatMap((msg: any) => [
        {
          role: "user",
          text: msg?.query, // User's input
        },
        {
          role: "model",
          text: msg?.response, // AI's response
        }
      ]);

      setMessages(messages);

      setChatHistory1(ChatMessages)

    }
  }, [ChatMessages]);
  

  async function runChat(prompt: string) {

    setLoading(true);

   

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
      history: [{ role: "user", parts: [{ text: prompt }] }, ...messages.map((msg) => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.text }],
      }))],
    });

    const result = await chat.sendMessage(prompt);
    
    const response = result.response;

    setResponse(response?.text());

    //calling function trigger save to api
     await sendMessage();

    
    
    // Simulate typing effect by adding one character at a time
    const newMessages = [
      { role: "user", text: prompt },
      { role: "model", text: response?.text() || "AI is typing..."},
    ];


    let charIndex = 0;
    const typingSpeed = 10; // Adjust the speed of typing effect (in milliseconds)

    // Add user message immediately
    

    setMessages((prevMessages) => [...prevMessages, newMessages[1]]);

    const typeMessage = () => {
      if (charIndex < newMessages[1].text.length) {
        setMessages((prevMessages) => [
          ...prevMessages.slice(0, prevMessages.length - 1),
          { role: "model", text: newMessages[1].text.slice(0, charIndex + 1) },
        ]);
        charIndex++;
        setTimeout(typeMessage, typingSpeed); // Recur until all characters are added
      }
    };

    setChatHistory(prev => {
      const updatedChats = [...prev];
      if (activeChatIndex !== null) {
        updatedChats[activeChatIndex] = { messages: newMessages };
      }
      return updatedChats;
    });

    typeMessage();
    setLoading(false);
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

    event.preventDefault();

    const prompt = (event.target as HTMLFormElement).prompt?.value.trim();
  


    if (!prompt) return;

    setMessageInput(prompt);


    const newMessages = [...messages, { role: "user", text: prompt }];
  
    if (activeChatIndex === null) {
      // Create a new chat session if none exists
      setChatHistory([{ messages: newMessages }]);
      setActiveChatIndex(0);
    } else {
      // Ensure activeChatIndex is within range before updating
      if (activeChatIndex >= 0 && activeChatIndex < chatHistory.length) {
        setChatHistory(prev => {
          const updatedChats = [...prev];
          updatedChats[activeChatIndex].messages.push({ role: "user", text: prompt });
          return updatedChats;
        });
      }
    }
  
    setMessages(newMessages);

    runChat(prompt);

    (event.target as HTMLFormElement).reset();
  };
  

  const handleCreateNewSession = async () => {

    const res = await createSession({});

    if(res?.data){
      setActiveSession(res?.data?.uuid);
    }
  }

  // Start a new chat (reset)
  const newChat = async () => {

        // call method to create new session
       await handleCreateNewSession();

     // Add current chat to history before starting a new one
     if (activeChatIndex !== null) {
      setChatHistory((prev) => [
        ...prev,
        { messages: [{ role: "user", text: "" }] }, // Placeholder for new chat
      ]);
    } 



    setMessages([]); // Reset messages
    setActiveChatIndex(chatHistory.length); // Set the index to new chat
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

  const handleChatSwitch = (index: number) => {

    const selectedSession = sessions?.data[index];
  
    // Ensure the selected session exists
    if (selectedSession) {
      // Set the entire session object
      setActiveSession(selectedSession?.uuid);
  
      // Fetch the messages for this session
      refetchMessages(); // Trigger refetch of messages using the hook
  
      // Optionally update other states (like chat history) as needed
      const messages = ChatMessages?.data?.flatMap((msg: any) => [
        { role: "user", text: msg?.query },
        { role: "model", text: msg?.response },
      ]) || [];
  
      setMessages(messages); // Set messages for the active chat
      setActiveChatIndex(index); // Update the index to reflect the active chat
    }
  };
  
  // function handle delete session
  const handleDeleteSession = async (sessionUuid: string) => {

    const res = await deleteSession({sessionUuid});

    if(res?.data == null){

      toast({
        description: "Session deleted successfully",
        variant: "success",
      });

      setActiveSession(null);
      setMessages([]);
      setChatHistory([]);
      setActiveChatIndex(null);

  }
}

  return (
    <section className="flex mt-6 h-[800px] w-[88%] mx-auto bg-white rounded-lg shadow-lg dark:bg-background_dark_mode">
      {/* Sidebar */}
      <div className="w-1/2 border-r flex flex-col">
        <div className="px-8 py-8 border-b">
          <h1 className="text-xl font-bold mb-4">Inspectra Chat AI</h1>
          <Button className="w-full bg-primary_color hover:bg-secondary_color text-black" onClick={newChat}>
            New chat <Plus className="h-4 w-4 text-black" />
          </Button>
        </div>
        <ScrollArea className="flex-1 p-4">
          {activeSession?.data?.map((res:any, index:any) => (
            <div key={index}>
            <Button
              key={index}
              className={`w-full justify-start text-sm my-[6px] bg-transparent hover:bg-gray-200 text-gray-900 dark:bg-background_dark_mode dark:text-text_color_dark` + (index === activeChatIndex ? " bg-primary_color text-black dark:bg-primary_color dark:text-black" : "")}
              onClick={(e) => {
                 
                e.preventDefault();
                handleChatSwitch(index)

              }
                 
              }
            >
              {res?.uuid || "New chat"} 
                 
             
            </Button>
            <div className="flex w-full justify-end items-center ">
               <FaTrashAlt onClick={()=> handleDeleteSession(res?.uuid)} className=" h-4 w-4  text-red-600 hover:cursor-pointer" />
            </div>
            
             </div>
          ))}


        </ScrollArea>

        <div className="p-4 border-t">
          <Button variant="ghost" className="w-full justify-start py-[33px]" onClick={() => {}}>
            <Settings className="mr-2 h-4 w-4" /> Settings
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col w-full">
        <main className="flex-1 overflow-auto py-6 mx-[20px]">
          <ScrollArea className="h-full scrollbar-hide">
            <div className="space-y-4">
              {messages.length === 0 ? (
                <div className="flex justify-center items-center h-screen">
                  <NomessageComponent />
                </div>
              ) : (
                messages.map((msg, index) => (
                  <div key={index} className={`flex items-start gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    {msg.role !== "user" && (
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-black text-sm">
                        <Image src="/images/logo_no_name.png" alt="AI" width={50} height={50} />
                      </div>
                    )}
                    <div className={`rounded-lg px-4 py-3 max-w-[80%] ${msg.role === "user" ? "bg-primary_color text-black" : "bg-gray-100 text-gray-900 dark:bg-background_dark_mode dark:text-text_color_dark"}`}>
                      <p>{msg?.text}</p>
                    </div>
                    <div>
                      {msg.role === "model" && index === messages.length - 1 && (
                        <button className="mt-4 text-gray-600 hover:text-gray-900" onClick={() => handleCopy(msg.text)}>
                          {copyText ? <CheckIcon className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </button>
                      )}
                    </div>
                    {msg.role === "user" && (
                      <Image src={ChatMessages?.data?.[0]?.profile} alt={ChatMessages?.data?.[0]?.username}
                       width={50} height={50}
                       className="w-10 h-10 rounded-full  flex items-center justify-center"/>
                    )}
                  </div>
                ))
              )}
             
            </div>
          </ScrollArea>
        </main>

        {/* Input Form */}
        <div className="border-t p-4">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={onSubmit} className=" sm:flex gap-2">
              <Input type="text" name="prompt" placeholder="What's on your mind..." className="flex sm:flex-1 py-4 sm:py-8 rounded-xl" />
              <Button type="submit" className="bg-primary_color hover:opacity-70 sm:py-8 max-sm:w-full mt-2 sm:mt-0 p-4  rounded-xl" disabled={loading}>
                <Send className="sm:h-4 sm:w-4 text-black" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
















