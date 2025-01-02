import React from "react";
import { RxCross2 } from "react-icons/rx";
import FormLoginComponent from "@/components/FromLoginComponent/FormLoginComponent";
import Link from "next/link";
import { LoginAuth } from "@/components/FormLoginWithAuthComponent/login-auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - Inspectra",
  description:
    "Welcome to Inspectra. Login to access your account and explore the platform’s advanced source code analysis tools for secure development.",
  keywords:
    "Inspectra, inspectra, inspect, cambodia, inspectra istad, inspectra.istad, istad, source code scan, scan, code scan, white-box testing Cambodia, secure development platform, source code analysis, cybersecurity tools, secure coding practices",
  authors: { name: "Inspectra Team" },
  publisher: "Inspectra",
  openGraph: {
    title: "Login - Inspectra",
    description:
      "Welcome to Inspectra. Login to access your account and explore the platform’s advanced source code analysis tools for secure development.",

    siteName: "Inspectra",
    locale: "en_KH",
    type: "website",
    url: "https://inspectra.istad.co/",
    images: [
      {
        url: "https://api-inspectra.istad.co/images/3639a448-5eb8-43f4-bba9-a7f98c27792e.png",
        width: 1200,
        height: 630,
        alt: "Inspectra",
      },
    ],
  },
};

export default function page() {
  //handle session from next-auth

  // eslint-disable-next-line react-hooks/rules-of-hooks
  //
  // console.log('this is session',session)
  //
  // if (session) {
  //     return (
  //         <div className="w-full h-screen flex flex-col justify-center items-center">
  //         <div className="w-44 h-44 relative mb-4">
  //             <Image
  //             src={session.user?.image as string || ""}
  //             fill
  //             alt=""
  //             className="object-cover rounded-full"
  //             />
  //         </div>
  //         <p className="text-2xl mb-2">
  //             Welcome <span className="font-bold">{session.user?.name}</span>. Signed
  //             In As
  //         </p>
  //         <p className="font-bold mb-4">{session.user?.email}</p>
  //         <button
  //             className="bg-red-600 py-2 px-6 rounded-md"
  //             onClick={() => signOut()}
  //         >
  //             Sign out
  //         </button>
  //         </div>
  //     );
  // } else {
  //     return (
  //         <div className="w-full h-screen flex flex-col justify-center items-center">
  //         <p className="text-2xl mb-4">You are not signed in</p>
  //         <button
  //             className="bg-blue-600 py-2 px-6 rounded-md"
  //             onClick={() => signIn()}
  //         >
  //             Sign in
  //         </button>
  //         <FormLoginComponent />
  //         </div>
  //     );
  // }

  return (
    <main className="h-screen  w-full mx-auto flex ">
      {/* secontion welcome */}
      <section className=" hidden  h-full xl:flex flex-col items-center justify-between w-[60%] bg-primary_color py-[40px] ">
        <div className="w-full px-[100px]">
          <p className="text-[60px] text-text_color_light font-semibold leading-[1.2]">
            Welcome to <br />
            <span className="font-normal">Inspectra</span>
          </p>
          <p className="text-text_body_16 text-ascend_color leading-[1.4] mt-2">
            Login to access your account
          </p>
        </div>

        <div className="w-full h-[400px] items-end flex justify-center">
          <img
            className="object-contain w-full h-full"
            alt="image login"
            src="/images/Login_page_image.png"
          />
        </div>
      </section>

      {/* login section */}
      <section className="h-screen w-full my-auto xl:w-[40%] bg-text_color_dark   flex flex-col ">
        {/* welcome title for small screen */}
        <div className="w-full hidden md:block md:text-center  md:h-[10%] md:mt-[50px] lg:h-[10%] lg:mt-[150px]    xl:hidden">
          <p className="text-[60px] text-text_color_light font-semibold leading-[1.2]">
            Welcome to <br />
            <span className="font-normal">Inspectra</span>
          </p>
          <p className="text-text_body_16 text-ascend_color leading-[1.4] mt-2">
            Login to access your account
          </p>
        </div>

        {/* form */}
        <div className=" h-full m-[40px]  md:w-[60%] md:h-[70%] md:my-[100px]  md:mx-auto lg:h-[55%] lg:my-auto xl:h-[100px] xl:my-[50px] flex flex-col ">
          {/* Logo and close icon */}
          <div className="w-full flex justify-between">
            {/* Logo and name */}
            <div className="w-full flex items-center">
              <div className="w-[40px] h-[40px] overflow-hidden rounded-full">
                <img
                  src="/images/logo.jpg"
                  alt="Logo"
                  width={50}
                  height={50}
                  className="object-cover w-full h-full"
                />
              </div>
              <p className="font-medium text-text_color_light pl-3 text-text_title_20">
                Inspectra
              </p>
            </div>
            {/* Close icon */}
            <Link
              href={"/"}
              className="text-text_header_34 text-text_color_light items-center"
            >
              <RxCross2 className="h-full" />
            </Link>
          </div>

          {/* form section */}
          <div className="h-full pt-[40px] flex flex-col justify-between ">
            {/* Title */}
            <p className="text-text_header_34 text-text_color_light font-semibold">
              Log In
            </p>

            <FormLoginComponent />

            <div className="space-y-5">
              {/* Auth Login */}
              <div className="flex items-center md:my-4">
                <hr className="flex-grow border-t border-gray-300" />
                <span className="mx-4 text-gray-500">or</span>
                <hr className="flex-grow border-t border-gray-300" />
              </div>

              {/*/!* Google Button *!/*/}
              {/*<button className="w-full py-3 flex items-center font-normal bg-text_color_light justify-center rounded-[10px]">*/}
              {/*  <FcGoogle className="text-text_title_24" />*/}
              {/*  <span className="text-text_color_dark ml-3">*/}
              {/*    Or Sign in with Google*/}
              {/*  </span>*/}
              {/*</button>*/}

              {/*/!* GitHub Button *!/*/}
              {/*<button className="w-full py-3 flex items-center font-normal bg-background_light_mode justify-center rounded-[10px]">*/}
              {/*  <FaGithub className="text-text_title_24 dark:text-text_color_light" />*/}
              {/*  <span className="text-text_color_light ml-3">*/}
              {/*    Or Sign in with GitHub*/}
              {/*  </span>*/}
              {/*</button>*/}
              <LoginAuth />
            </div>

            {/* Register */}
            <div className="text-center my-5">
              <p className="text-text_color_desc_light text-[14px]">
                Not yet have an account?{" "}
                <Link href={"/signup"}>
                  <span className="text-link_color underline font-medium">
                    Sign up now
                  </span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
