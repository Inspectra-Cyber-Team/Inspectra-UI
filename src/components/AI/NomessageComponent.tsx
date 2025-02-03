"use client"

import { Plus } from "lucide-react"
import { useEffect, useState } from "react"

export default function NomessageComponent() {
  const [displayedText, setDisplayedText] = useState("")
  const welcomeMessage = "Greetings! Inspectra is ready to assist. Let's dive into what you need!"

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      if (i < welcomeMessage.length) {
        setDisplayedText((prev) => prev + welcomeMessage[i])
        i++
      } else {
        clearInterval(interval)
      }
    }, 50) // Adjust speed here
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-md space-y-8q">
        <div className="text-center">
          <h2 className=" text-3xl font-extrabold text-text_color_light dark:text-text_color_dark">Welcome to Inspectra AI</h2>
          <p className="my-2 text-sm text-gray-600 h-16">{displayedText}</p>
        </div>
        <div className="mt-4 border border-gray-200 p-2 gap-2 rounded-lg overflow-hidden">
          <div className="px-4 py-2 sm:p-2">
            <div className="flex items-center space-x-4 ">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary_color text-text_color_light font-semibold text-lg">
                  AI
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-lg font-medium text-text dark:text-text_color_dark truncate">Ask Anything</p>
                <p className="text-sm text-gray-500">Start a conversation with Inspectra AI</p>
              </div>
              <div className="flex-shrink-0">
                <button
                  type="button"
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-text_color_light bg-primary_color "
                >
                  <Plus className="h-5 w-5 mr-2" />
                  New Chat
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

