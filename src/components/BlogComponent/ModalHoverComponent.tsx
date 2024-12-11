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
  maxVisible?: number; // Optional: max profiles to show at a time
};

const HoverModal = ({ likes, position, isloading, maxVisible = 3 }: HoverModalProps) => {
  if (isloading) {
    return <h1>Loading..</h1>;
  }

  const visibleProfiles = likes.slice(0, maxVisible);
  const remainingCount = likes.length - maxVisible;

  return createPortal(
    <div
      className="absolute shadow-lg rounded-md z-50 overflow-y-auto bg-white p-4"
      style={{
        top: position.top,
        left: position.left,
        transform: "translate(-100%, -100%)",
      }}
    >
      <ul className="flex items-center space-x-2">
        {visibleProfiles.map((user, index) => (
          <li key={index} className="relative">
            {/* User Profile Image */}
            <img
              src={user.profile}
              alt={`${user.firstName} ${user.lastName}`}
              className="w-10 h-10 rounded-full border border-gray-200 shadow-md"
              onError={(e) => (e.currentTarget.src = '/images/default-profile.jpg')}
            />
          </li>
        ))}
        {remainingCount > 0 && (
          <li className="relative w-10 h-10 flex items-center justify-center rounded-full bg-gray-300 text-black font-semibold">
            +{remainingCount}
          </li>
        )}
      </ul>
    </div>,
    document.body
  );
};

export default HoverModal;
