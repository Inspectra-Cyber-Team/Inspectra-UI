import { PiExportFill } from "react-icons/pi";
import { useState, useEffect } from "react";

export default function StaticExportButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [isOffset, setIsOffset] = useState(false);

  useEffect(() => {
    const handleVisibilityChange = (event: CustomEvent) => {
      setIsOffset(event.detail); // Update the offset based on the ScrollToTopButton visibility
    };

    window.addEventListener("scrollToTopVisibilityChange", handleVisibilityChange as EventListener);

    return () => {
      window.removeEventListener("scrollToTopVisibilityChange", handleVisibilityChange as EventListener);
    };
  }, []);

  const handleExportPDF = () => {
    setIsLoading(true); // Set loading state before fetch starts

    // Define the static PDF file URL
    const fileUrl = '/static/NextJS.pdf'; // Ensure this path is correct

    // Fetch the file as a blob
    fetch(fileUrl)
      .then((response) => response.blob())
      .then((blob) => {
        // Create a URL for the blob
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        
        // Set download attributes
        link.href = url;
        link.download = 'NextJS.pdf'; // You can change the filename if needed
        document.body.appendChild(link);
        link.click(); // Trigger the download
        document.body.removeChild(link); // Cleanup

        setIsLoading(false); // Set loading to false after the download starts
      })
      .catch((error) => {
        console.error('Error downloading the file:', error);
        setIsLoading(false);
      });
  };

  return (
    <button
      onClick={handleExportPDF}
      title="Export"
      className={`fixed right-4 z-[1100] w-11 h-11 flex justify-center items-center bg-primary_color hover:opacity-70 text-background_dark_mode p-3 rounded-full shadow-sm hover:bg-primary_dark transition-all duration-300 ${
        isOffset ? "bottom-16 mb-1" : "bottom-4"
      }`}
    >
      {isLoading ? (
        <div className="spinner-border animate-spin inline-block w-5 h-5 border-2 rounded-full border-t-2 border-text_color_light border-t-transparent"></div>
      ) : (
        <PiExportFill className="h-5 w-5" />
      )}
    </button>
  );
}
