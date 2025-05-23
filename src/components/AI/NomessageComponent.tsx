"use client"

import { useTypewriter } from "react-simple-typewriter";

export default function NomessageComponent() {

  const [text] = useTypewriter({
    words: ["Get started by asking a question and Inspectra Chat AI can do the rest."],
    loop: 1,
    typeSpeed: 50,
    deleteSpeed: 0,
  });

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-xl md:text-3xl font-extrabold text-text_color_light dark:text-text_color_dark">
            Welcome to Inspectra AI
          </h2>
          <p className="my-2 text-sm px-2 md:px-0 md:text-text_body_16 text-text_color_desc_light dark:text-text_color_desc_dark h-16">
            {text}
          </p>
        </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
            <button className="border dark:border-text_color_desc_dark h-24 justify-start items-start mx-5 md:mx-0 p-4 hover:bg-primary_color/10 rounded-lg cursor-auto">
              <div className="flex justify-center items-center">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">📝</div>
               <p className="ml-3"> Ask Question</p>
              </div>
            </button>
            <button className=" border dark:border-text_color_desc_dark h-24 justify-start items-start mx-5 md:mx-0 p-4 hover:bg-primary_color/10 rounded-lg cursor-auto">
              <div className="flex justify-center items-center">
                <div className="w-10 h-10 rounded-lg bg-pink-100 flex items-center justify-center">💻</div>
                <p className="ml-3"> Generate Code</p>
              </div>
            </button>
          </div>
      </div>
    </div>
  );
}

