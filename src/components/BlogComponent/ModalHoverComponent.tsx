import React from "react";
import { createPortal } from "react-dom";

type HoverModalProps = {
  likes: {
    firstName: string;
    profile: string;
    lastName: string;
    email: string;
    bio: string;
  }[];
  position: { top: number; left: number };
  isloading: boolean;
};

const HoverModal = ({ likes, position, isloading }: HoverModalProps) => {
  if (isloading) {
    return <h1>Loading...</h1>;
  }

  // Split the likes into profiles to display and remaining count
  const visibleProfiles = likes.slice(0, 2); // Show up to 2 profiles
  const remainingCount = likes.length > 2 ? likes.length - 2 : 0;

  return createPortal(
    <div
      className="absolute z-50 p-4"
      style={{
        top: position.top,
        left: position.left,
        transform: "translate(-50%, -90%)", // Center horizontally and adjust vertically
      }}
    >
      <div className="card_wrapper-acounts flex relative">
        {/* Render the +X circle */}
        {remainingCount > 0 && (
          <div className="card__acounts z-30 -ml-4 relative flex items-center justify-center bg-gray-300 rounded-full w-10 h-10 border-2 border-gray-300 shadow-md">
            <span className="text-black font-semibold">+{remainingCount}</span>
          </div>
        )}

        {/* Render reversed profiles */}
        {visibleProfiles.map((user, index) => (
          <div
            key={index}
            className={`card__acounts ${
              index === 0 ? "z-20" : "z-10"
            } -ml-4 relative`}
          >
            <img
              src={user.profile}
              alt={`${user.firstName} ${user.lastName}`}
              className="w-10 h-10 rounded-full border-2 border-gray-300 shadow-md"
              onError={(e) => {
                console.error("Error loading image", e);
                const target = e.currentTarget;
                target.onerror = null;
                target.src = "/images/default-profile.jpg";
              }}              
            />
          </div>
        ))}
      </div>
    </div>,
    document.body
  );
};

export default HoverModal;
