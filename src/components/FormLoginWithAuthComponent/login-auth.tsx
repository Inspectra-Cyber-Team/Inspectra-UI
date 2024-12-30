// "use client";
// import { FcGoogle } from "react-icons/fc";
// import { FaGithub } from "react-icons/fa";
// import React, { useState, useEffect } from "react";
// import { signIn, useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";

// export const LoginAuth = () => {
//   const router = useRouter();

//   const { data: session, status } = useSession(); // Destructure session and status directly

//   const [isSigningIn, setIsSigningIn] = useState(false);

//   // Custom signIn function
//   const handleSignIn = async (provider: string) => {
//     setIsSigningIn(true);
//     await signIn(provider);
//   };

//   useEffect(() => {
//     const initOrLoginUser = async () => {
//       if (session?.user?.email) {
//         const email = session?.user?.email;

//         try {
//           // Check if the user is already initialized
//           const initResponse = await fetch(
//             `${process.env.NEXT_PUBLIC_API_URL}auth/init-user`,
//             {
//               method: "POST",
//               headers: {
//                 "Content-Type": "application/json",
//               },
//               body: JSON.stringify({ email }),
//             }
//           );

//           const initData = await initResponse.json();

//           // If the user is already initialized, skip to login
//           if (initData && initData.success) {
//             console.log("User already initialized, proceeding to login.");
//           } else {
//             // If initialization fails or needs to log in, proceed with login
//             const response = await fetch(
//               `${process.env.NEXT_PUBLIC_BASE_URL_LOCALHOST}login`,
//               {
//                 method: "POST",
//                 headers: {
//                   "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ email, password: "123456" }),
//               }
//             );

//             const loginData = await response.json();
//             const userUUID = loginData?.user?.data?.uuid;
//             localStorage.setItem("userUUID", userUUID);
//             router.push("/");
//           }
//         } catch (error) {
//           console.error(
//             "An error occurred while initializing or logging in user:",
//             error
//           );
//         }
//       }
//     };

//     if (isSigningIn && status === "authenticated") {
//       initOrLoginUser();
//       setIsSigningIn(false);
//     }
//   }, [isSigningIn, status, session]);

//   return (
//     <div>
//       {/* Google Button */}
//       <button
//         className="w-full py-3 flex items-center font-normal bg-text_color_light justify-center rounded-[10px]"
//         onClick={() => {
//           console.log("Google sign-in button clicked");
//           handleSignIn("google");
//         }}
//       >
//         <FcGoogle className="text-text_title_24" />
//         <span className="text-text_color_dark ml-3">Sign in with Google</span>
//       </button>

//       {/* GitHub Button */}
//       <button
//         className="w-full mt-5 py-3 flex items-center font-normal bg-background_light_mode justify-center rounded-[10px]"
//         onClick={() => {
//           console.log("GitHub sign-in button clicked");
//           handleSignIn("github");
//         }}
//       >
//         <FaGithub className="text-text_title_24" />
//         <span className="text-text_color_light ml-3">Sign in with GitHub</span>
//       </button>

//       {/*<div>*/}
//       {/*    <button>*/}
//       {/*        <FcGoogle className="text-text_title_24" />*/}
//       {/*        <span onClick={() => signOut()} className="text-text_color_dark ml-3">*/}
//       {/*            Signout*/}
//       {/*        </span>*/}
//       {/*    </button>*/}
//       {/*</div>*/}
//     </div>
//   );
// };

// "use client";
// import { FcGoogle } from "react-icons/fc";
// import { FaGithub } from "react-icons/fa";
// import React, { useState, useEffect } from "react";
// import { signIn, signOut, useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { useToast } from "../hooks/use-toast";

// export const LoginAuth = () => {
//   const router = useRouter();
//   const { toast } = useToast();

//   const { data: session, status } = useSession();

//   const [isSigningIn, setIsSigningIn] = useState(false);

//   const [isLoading, setIsLoading] = useState(false);

//   // Custom signIn function
//   const handleSignIn = async (provider: string) => {
//     setIsSigningIn(true);
//     setIsLoading(true);
//     await signIn(provider);
//   };

//   useEffect(() => {
//     const initOrLoginUser = async () => {
//       if (session?.user?.email) {
//         const email = session.user.email;

//         try {
//           // Check if the user is already initialized
//           const initResponse = await fetch(
//             `${process.env.NEXT_PUBLIC_API_URL}auth/init-user`,
//             {
//               method: "POST",
//               headers: {
//                 "Content-Type": "application/json",
//               },
//               body: JSON.stringify({ email }),
//             }
//           );

//           const initData = await initResponse.json();

//           // If the user is already initialized, skip to login
//           if (initData?.success) {
//             router.push("/");
//           } else {
//             // If initialization fails, proceed with login
//             const response = await fetch(
//               `${process.env.NEXT_PUBLIC_BASE_URL_LOCALHOST}login`,
//               {
//                 method: "POST",
//                 headers: {
//                   "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ email, password: "123456" }),
//               }
//             );

//             if (response.status === 401) {
//               toast({
//                 description:
//                   "An account with this email already exists. Please log in using your email and password",
//                 variant: "error",
//               });
//               signOut();
//             }

//             if (response.status === 200) {
//               const loginData = await response.json();
//               const userUUID = loginData?.user?.data?.uuid;
//               localStorage.setItem("userUUID", userUUID);
//               router.push("/");
//             }
//           }
//         } catch (error) {
//           console.error(
//             "An error occurred while initializing or logging in user:",
//             error
//           );
//         }
//       }
//     };

//     if (status === "authenticated" && !isSigningIn) {
//       initOrLoginUser();
//     }
//   }, [status, session, isSigningIn]);

//   return (
//     <div>
//       {/* Google Button */}
//       <button
//         className="w-full py-3 flex items-center font-normal bg-text_color_light justify-center rounded-[10px]"
//         onClick={() => {
//           console.log("Google sign-in button clicked");
//           handleSignIn("google");
//         }}
//         disabled={isLoading}
//       >
//         <FcGoogle className="text-text_title_24" />
//         <span className="text-text_color_dark ml-3">
//           {isLoading ? "Signing in..." : "Sign in with Google"}
//         </span>
//       </button>

//       {/* GitHub Button */}
//       <button
//         className="w-full mt-5 py-3 flex items-center font-normal bg-background_light_mode justify-center rounded-[10px]"
//         onClick={() => {
//           console.log("GitHub sign-in button clicked");
//           handleSignIn("github");
//         }}
//         disabled={isLoading}
//       >
//         <FaGithub className="text-text_title_24" />
//         <span className="text-text_color_light ml-3">
//           {isLoading ? "Signing in..." : "Sign in with GitHub"}
//         </span>
//       </button>
//     </div>
//   );
// };

"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import React, { useState, useEffect, useRef } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "../hooks/use-toast";

export const LoginAuth = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { data: session, status } = useSession();

  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);

  // Prevent multiple calls using useRef
  const isCalledRef = useRef(false);

  // Custom signIn function
  const handleSignIn = async (provider: string) => {
    setIsSigningIn(true);
    if (provider === "google") {
      setIsLoading(true);
    } else {
      setIsLoading1(true);
    }
    await signIn(provider);
  };

  useEffect(() => {
    const initOrLoginUser = async () => {
      if (isCalledRef.current) return; // Prevent multiple calls
      isCalledRef.current = true;

      if (session?.user?.email) {
        const email = session.user.email;
        const image = session.user.image;

        try {
          // Check if the user is already initialized
          const initResponse = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}auth/init-user`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email, image }),
            }
          );

          const initData = await initResponse.json();

          if (initData?.success) {
            // If the user is initialized, redirect to the home page
            router.push("/");
          } else {
            // If initialization fails, proceed with login
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

            if (response.status === 401) {
              toast({
                description:
                  "An account with this email already exists. Please log in using your email and password",
                variant: "error",
              });
              try {
                await signOut(); // Wait for the signOut function to complete
              } catch (error) {
                console.error("Error during sign-out:", error);
                toast({
                  description:
                    "There was an issue signing out. Please try again.",
                  variant: "error",
                });
              }
            }

            if (response.status === 200) {
              const loginData = await response.json();
              const userUUID = loginData?.user?.data?.uuid;
              localStorage.setItem("userUUID", userUUID);
              router.push("/");
            }
          }
        } catch (error) {
          console.error(
            "An error occurred while initializing or logging in user:",
            error
          );
        }
      }
    };

    if (status === "authenticated" && !isSigningIn) {
      initOrLoginUser();
    }
  }, [status, session, isSigningIn, router, toast]);

  return (
    <div>
      {/* Google Button */}
      <button
        className="w-full py-3 flex items-center font-normal bg-text_color_light justify-center rounded-[10px]"
        onClick={() => {
          console.log("Google sign-in button clicked");
          handleSignIn("google");
        }}
        disabled={isLoading}
      >
        <FcGoogle className="text-text_title_24" />
        <span className="text-text_color_dark ml-3">
          {isLoading ? "Signing in..." : "Sign in with Google"}
        </span>
      </button>

      {/* GitHub Button */}
      <button
        className="w-full mt-5 py-3 flex items-center font-normal bg-background_light_mode justify-center rounded-[10px]"
        onClick={() => {
          console.log("GitHub sign-in button clicked");
          handleSignIn("github");
        }}
        disabled={isLoading}
      >
        <FaGithub className="text-text_title_24" />
        <span className="text-text_color_light ml-3">
          {isLoading1 ? "Signing in..." : "Sign in with GitHub"}
        </span>
      </button>
    </div>
  );
};
