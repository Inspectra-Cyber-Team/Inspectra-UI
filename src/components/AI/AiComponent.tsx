

"use client"
import { useState} from "react" // Added React import
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Plus, Settings, Send } from "lucide-react"
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import NomessageComponent from "./NomessageComponent"
import Image from "next/image"


const MODEL_NAME = "gemini-1.0-pro"
const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY as string

export default function AIComponent() {

  const [messages, setMessages] = useState<{ role: string; text: string }[]>([])

  const [loading, setLoading] = useState(false)

  const [file, setFile] = useState<File | null>(null)

//   handle get chat history 
  

  // Existing chat logic remains the same
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
      history: messages.map((msg) => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.text }],
      })),
    });

    const result = await chat.sendMessage(prompt);
    const response = result.response;
    setMessages((prev) => [
      ...prev,
      { role: "user", text: prompt },
      { role: "model", text: response.text() },
    ]);
    setLoading(false);
  }
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
   
    event.preventDefault();
    const prompt = (event.target as HTMLFormElement).prompt?.value.trim();
    if (!prompt) return;
    runChat(prompt);
    (event.target as HTMLFormElement).reset();

  }

//   handle file chnage
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };
  function formatText(text: string) {
    const lines = text.split("\n");
  
    return lines.map((line, index) => {
      // Bullet points (lines starting with *)
      if (line.startsWith("*")) {
        return (
          <ul key={index}>
            <li>{line.slice(1).trim()}</li>
          </ul>
        );
      }
  
      // Bold text (handling lines containing ** for bold formatting)
      else if (line.includes("**")) {
        return line.split("**").map((part, idx) => 
          idx % 2 === 1 ? <strong key={idx}>{part}</strong> : part
        );
      }
  
      // Code block (lines containing ``` for code formatting)
      else if (line.includes("```")) {
        const code = line.replace("```", ""); // Remove the backticks from the line
        return <pre key={index}><code>{code}</code></pre>;
      } 
  
      // Regular paragraph text
      else {
        return <p key={index}>{line}</p>;
      }
    });
  }
  
  

  // Clear chat history
  const clearChat = () => {
    setMessages([]);
    setFile(null);
  };

  // Start a new chat (reset)
  const newChat = () => {
    setMessages([]);
    setFile(null);
  };

  return (
    <section className="flex mt-6 h-screen w-[88%] mx-auto bg-white rounded-lg shadow-lg ">
      {/* Sidebar */}
      <div className=" w-1/2 border-r flex flex-col ">
        <div className="px-8 py-8 border-b">
          <h1 className="text-xl font-bold mb-4">Inspectra Chat AI</h1>
          <Button className="w-full bg-primary_color hover:bg-secondary_color text-black" onClick={newChat}>
            New chat <Plus className=" first-letter:h-4 w-4 text-black" /> 
          </Button>
        </div>
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-2">
            {messages.length > 0 && (
              <Button variant="ghost" className="w-full justify-start text-sm" onClick={() => {}}>
                Previous Chat
              </Button>
            )}
          </div>
        </ScrollArea>
        <div className="p-4 border-t ">
          <Button variant="ghost" className="w-full justify-start py-[33px]" onClick={() => {}}>
            <Settings className="mr-2 h-4 w-4 " />
            Settings
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col w-full ">
        <main className="flex-1 overflow-auto py-6 mx-[20px]">
          <ScrollArea className="h-full scrollbar-hide">
          <div className="space-y-4">
   {messages.length === 0 ? (
      <div className="flex justify-center items-center h-screen">
        <NomessageComponent/>
    </div>
  ) : (
    messages.map((msg, index) => (
      <div
        key={index}
        className={`flex items-start gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
      >
        {msg.role !== "user" && (
          <div className="w-10 h-10 rounded-full  flex items-center justify-center text-black text-sm">
            <Image src="/images/logo_no_name.png" alt="AI" width={50} height={50} />
          </div>
        )}
        <div
          className={`rounded-lg px-4 py-2 max-w-[80%] ${
            msg.role === "user" ? "bg-primary_color text-black" : "bg-gray-100 text-gray-900"
          }`}
        >
          {formatText(msg?.text)}
        </div>
        {msg.role === "user" && (
          <div className="w-8 h-8 rounded-full bg-secondary_color flex items-center justify-center">U</div>
        )}
      </div>
    ))
  )}
</div>

          </ScrollArea>
        </main>

        {/* Input Form */}
        <div className="border-t p-4 ">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={onSubmit} className="flex gap-2">
              <Input type="text" name="prompt" placeholder="What's in your mind..." className="flex-1 py-8 rounded-xl" />
              <Button type="submit" className="bg-primary_color hover:opacity-70 py-8 px-6 rounded-xl" disabled={loading}>
                <Send className="h-4 w-4 text-black " />
              </Button>
            </form>
            {file && <div className="mt-2 text-sm text-gray-500">Uploaded: {file.name}</div>}
          </div>
        </div>
      </div>
    </section>
  )
}

