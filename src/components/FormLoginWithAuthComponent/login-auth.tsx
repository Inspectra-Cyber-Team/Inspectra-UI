"use client";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";

export const LoginAuth = () => {
  const { data: session, status } = useSession(); // Destructure session and status directly

  const [isSigningIn, setIsSigningIn] = useState(false);

  // Custom signIn function
  const handleSignIn = async (provider: string) => {
    setIsSigningIn(true);
    await signIn(provider);
  };

  useEffect(() => {
    const initOrLoginUser = async () => {
      if (session?.user?.email) {
        const email = "github-s7" + session?.user?.email;
        console.log("Email:", email);

        try {
          // Check if the user is already initialized
          const initResponse = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}auth/init-user`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email }),
            }
          );

          const initData = await initResponse.json();

          console.log("User init response", initData);

          // If the user is already initialized, skip to login
          if (initData && initData.success) {
            console.log("User already initialized, proceeding to login.");
          } else {
            // If initialization fails or needs to log in, proceed with login
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_BASE_URL_LOCALHOST}login`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password: "123456" }),
              }
            );

            const loginData = await response.json();
            const userUUID = loginData?.user?.data?.uuid;
            localStorage.setItem("userUUID", userUUID);
            console.log("User login response", loginData);
          }
        } catch (error) {
          console.error(
            "An error occurred while initializing or logging in user:",
            error
          );
        }
      }
    };

    if (isSigningIn && status === "authenticated") {
      initOrLoginUser();
      setIsSigningIn(false);
    }
  }, [isSigningIn, status, session]);

  return (
    <div>
      {/* Google Button */}
      <button
        className="w-full py-3 flex items-center font-normal bg-text_color_light justify-center rounded-[10px]"
        onClick={() => {
          console.log("Google sign-in button clicked");
          handleSignIn("google");
        }}
      >
        <FcGoogle className="text-text_title_24" />
        <span className="text-text_color_dark ml-3">
          Or Sign in with Google
        </span>
      </button>

      {/* GitHub Button */}
      <button
        className="w-full py-3 flex items-center font-normal bg-background_light_mode justify-center rounded-[10px]"
        onClick={() => {
          console.log("GitHub sign-in button clicked");
          handleSignIn("github");
        }}
      >
        <FaGithub className="text-text_title_24" />
        <span className="text-text_color_light ml-3">
          Or Sign in with GitHub
        </span>
      </button>

      {/*<div>*/}
      {/*    <button>*/}
      {/*        <FcGoogle className="text-text_title_24" />*/}
      {/*        <span onClick={() => signOut()} className="text-text_color_dark ml-3">*/}
      {/*            Signout*/}
      {/*        </span>*/}
      {/*    </button>*/}
      {/*</div>*/}
    </div>
  );
};
