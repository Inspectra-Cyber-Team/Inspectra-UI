"use client";

import React, { useEffect, useState } from "react";
import useNetwork from "@/hooks/useNetwork";
import Image from "next/image";

const NetworkStatusProvider = ({ children }: { children: React.ReactNode }) => {
  const isOnline = useNetwork();
  const [statusMessage, setStatusMessage] = useState<string>("");

  const handleReconnect = () => {
    // Attempt to reconnect by refreshing the page
    window.location.reload();
  };

  useEffect(() => {
    if (!isOnline) {
      setStatusMessage("Whoops!!");
    } else {
      setStatusMessage("You are online.");
    }
  }, [isOnline]);

  return (
    <section>
      {/* Offline message */}
      {!isOnline && (
        <div className="grid place-content-center h-screen ">
          {/* Display an image or icon */}
          {/* <div>
            <Image
              className="flex items-center mx-auto rounded-md"
              src={"/images/no-connection.svg"}
              width={500}
              height={500}
              layout="responsive"
              objectFit="contain"
              alt="No connection"
            />
          </div> */}
          {/* Display status message */}
          <div className="text-center my-4 ">
            <h1 className="font-bold text-text_header_34 mb-2">
              {statusMessage}
            </h1>
            <p>
              No internet connection was found. Please check <br /> your
              connection and try again.
            </p>
            {/* Retry button */}
            <div className="mt-6">
              <button
                onClick={handleReconnect}
                className=" px-6 py-2 rounded-tl-[20px] rounded-br-[20px] text-black bg-primary_color hover:bg-primary_dark"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main content is hidden when offline */}
      {isOnline && <main>{children}</main>}
    </section>
  );
};

export default NetworkStatusProvider;
