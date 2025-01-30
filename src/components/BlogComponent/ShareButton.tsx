import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PiShareFatFill } from "react-icons/pi"; 
import { FaFacebook, FaTelegramPlane, FaLinkedin, FaCopy } from "react-icons/fa"; // Icons for better UI

export function ShareModal({ isOpen, onClose, blogUrl }: any) {
  const [copied, setCopied] = useState(false);

  // Handle copying the link
  const handleCopyLink = () => {
    navigator.clipboard.writeText(blogUrl)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
      })
      .catch((error) => console.error("Failed to copy link:", error));
  };

  // Social sharing functions
  const handleShare = (platform: string) => {
    let url = "";
    if (platform === "facebook") url = `https://www.facebook.com/sharer/sharer.php?u=${blogUrl}`;
    if (platform === "telegram") url = `https://t.me/share/url?url=${blogUrl}&text=Check%20out%20this%20blog!`;
    if (platform === "linkedin") url = `https://www.linkedin.com/sharing/share-offsite/?url=${blogUrl}`;
    window.open(url, "_blank", "width=600,height=400");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[450px] mx-auto sm:p-6 p-4">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Share this Blog</DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Share this blog with your friends on social media!
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col space-y-3 mt-4">
          <Button 
            variant="outline" 
            onClick={handleCopyLink} 
            className="flex items-center justify-center w-full"
          >
            {copied ? <FaCopy className="mr-2 text-secondary_color dark:text-[#B9FF66]" /> : <FaCopy className="mr-2" />}
            {copied ? "Copied!" : "Copy Link"}
          </Button>

          <Button 
            variant="outline" 
            onClick={() => handleShare("facebook")} 
            className="flex items-center justify-center w-full  hover:bg-blue-600 hover:text-white"
          >
            <FaFacebook className="mr-2" /> Share on Facebook
          </Button>

          <Button 
            variant="outline" 
            onClick={() => handleShare("telegram")} 
            className="flex items-center justify-center w-full  hover:bg-blue-500 hover:text-white"
          >
            <FaTelegramPlane className="mr-2" /> Share on Telegram
          </Button>

          <Button 
            variant="outline" 
            onClick={() => handleShare("linkedin")} 
            className="flex items-center justify-center w-full  hover:bg-blue-700 hover:text-white"
          >
            <FaLinkedin className="mr-2" /> Share on LinkedIn
          </Button>
        </div>

        <DialogFooter>
          <Button  onClick={onClose} className="w-full bg-[#B9FF66] text-black">Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
