import React, { useEffect, useState } from "react";

export default function NomessageComponent() {
  const [displayedText, setDisplayedText] = useState("");
  const welcomeMessage = "Greetings! Inspectra is ready to assist. Let’s dive into what you need!";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
        if (i < welcomeMessage.length - 1) {  // Ensure i does not exceed
            setDisplayedText((prev) => prev + welcomeMessage[i]);
            i++;
          } else {
            clearInterval(interval);
          }          
    }, 50); // Adjust speed here
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-md mx-auto  p-6 bg-white rounded-2xl shadow-sm flex items-center space-x-4 border border-gray-200">
      <div className="flex items-center justify-center  w-16 h-10 bg-primary_color text-white rounded-full">
        AI
      </div>
      <p className="text-gray-700 line-clamp-2 font-medium ">{displayedText}</p>
    </div>
  );
}
