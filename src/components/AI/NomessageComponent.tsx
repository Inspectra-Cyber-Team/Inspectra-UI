"use client"

import { Plus } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "../ui/button"

export default function NomessageComponent() {
  const [displayedText, setDisplayedText] = useState("")
  const welcomeMessage = '   Get started by asking a question and Inspectra Chat AI can do the rest.'

  useEffect(() => {
    let i = 0;
    setDisplayedText("");
    const interval = setInterval(() => {
      if (i < welcomeMessage.length) {
        setDisplayedText((prev) => prev + welcomeMessage.charAt(i)); 
        i++;
      } else {
        clearInterval(interval);
      }
    }, 50); // Adjust speed here
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="w-full max-w-md space-y-8 ">
        <div className="text-center">
          <h2 className="text-xl md:text-3xl font-extrabold text-text_color_light dark:text-text_color_dark">Welcome to Inspectra AI</h2>
          <p className="my-2 text-sm md:text-text_body_16 text-text_color_desc_light dark:text-text_color_desc_dark h-16">{displayedText}</p>
        </div>


         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
            <button className="border h-24 justify-start items-start p-4 hover:bg-primary_color/10 rounded-lg cursor-auto">
              <div className="flex">
                <div className="w-10 h-10 rounded-lg bg-green-100 mb-2 flex items-center justify-center">📝</div>
               <p className="mt-3 ml-3"> Ask Question</p>
              </div>
            </button>
            <button  className=" border h-24 justify-start items-start p-4 hover:bg-primary_color/10 rounded-lg cursor-auto">
              <div className="flex">
                <div className="w-10 h-10 rounded-lg bg-pink-100 mb-2 flex items-center justify-center">💻</div>
                <p className="mt-3 ml-3"> Generate Code</p>
              </div>
            </button>
          </div>
      </div>
    </div>
  )
}

