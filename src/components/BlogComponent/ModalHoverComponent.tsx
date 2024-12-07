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
    return <h1>Loading..</h1>;
  }

  return createPortal(
    <div
      className="absolute bg-white shadow-lg rounded-md p-4 z-50 w-80 overflow-y-auto"
      style={{
        top: position.top,
        left: position.left,
        transform: "translate(-100%, -100%)",
      }}
    >
      <ul className="space-y-4">
        {likes?.map((user, index) => (
          <li
            key={index}
            className="flex gap-4 items-start border-b pb-3 last:border-none"
          >
            {/* User Profile Image */}
            <img
              src={user.profile}
              alt={`${user.firstName} ${user.lastName}`}
              className="w-12 h-12 rounded-full shadow-md"
            />
            {/* User Details */}
            <div>
              <h4 className="font-semibold text-gray-900 text-md">
                {user.firstName} {user.lastName}
              </h4>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>,
    document.body
  );
};

export default HoverModal;
