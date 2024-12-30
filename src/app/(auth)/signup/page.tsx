import FormSignUpComponent from "@/components/FromLoginComponent/FormSignUpComoponent";
import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import Link from "next/link";
import { LoginAuth } from "@/components/FormLoginWithAuthComponent/login-auth";

import { VscGithub } from "react-icons/vsc";
import { FcGoogle } from "react-icons/fc";
import { RxCross2 } from "react-icons/rx";
import { IoIosArrowUp } from "react-icons/io";
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Signup - Inspectra',
  description:
    'Welcome to Inspectra. Signup to access your account and explore the platform’s advanced source code analysis tools for secure development.',
  keywords:
    'Inspectra, inspectra, inspect, cambodia, inspectra istad, inspectra.istad, istad, source code scan, scan, code scan, white-box testing Cambodia, secure development platform, source code analysis, cybersecurity tools, secure coding practices',
  authors: { name: 'Inspectra Team' },
  publisher: 'Inspectra',
  openGraph: {
    title: 'Signup - Inspectra',
    description:
      'Welcome to Inspectra. Signup to access your account and explore the platform’s advanced source code analysis tools for secure development.',
    siteName: 'Inspectra',
    locale: 'en_KH',
    type: 'website',
    url: 'https://inspectra.istad.co/',
    images: [
      {
        url: 'http://136.228.158.126:4011/images/3639a448-5eb8-43f4-bba9-a7f98c27792e.png',
        width: 1200,
        height: 630,
        alt: 'Inspectra',
      },
    ],
  },
};

export default function page() {
  return (
    <main className=" md:h-screen  xl:h-full  w-full mx-auto flex ">
      {/* secontion welcome */}
      <section className=" hidden xl:flex flex-col items-center justify-between w-[60%] bg-primary_color py-[40px] ">
        <div className="w-full px-[100px]">
          <p className="text-[60px] text-text_color_light font-semibold leading-[1.2]">
            Welcome to <br />
            <span className="font-normal">Inspectra</span>
          </p>
          <p className="text-text_body_16 text-ascend_color leading-[1.4] mt-2">
            Creating your account...
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
      {/* sign up section */}
      <section className="h-full w-full  my-auto xl:w-[40%]  xl:py-[20px] flex flex-col bg-text_color_dark">
        {/* welcome title */}

        <div className="w-full hidden lg:block lg:text-center   md:my-auto   xl:hidden">
          <p className="text-[60px] text-text_color_light font-semibold leading-[1.2]">
            Welcome to <br />
            <span className="font-normal">Inspectra</span>
          </p>
          <p className="text-text_body_16 text-ascend_color leading-[1.4] mt-2">
            Creating your account...
          </p>
        </div>

        {/* form */}
        <div className=" h-screen m-[40px] md:w-[60%] md:h-[90%]  lg:w-[60%] lg:h-[70%]   xl:w-[80%]  md:my-auto md:mx-auto flex flex-col xl:h-full">
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
              href={"/login"}
              className="text-text_header_34 text-text_color_light items-center"
            >
              <RxCross2 className="h-full" />
            </Link>
          </div>

          {/* form section */}
          <div className="h-full mt-[25px] md:mt-[20px] flex flex-col justify-between ">
            {/* Title */}
            <p className=" text-text_title_24  md:text-text_header_34 text-text_color_light font-semibold">
              Sign Up
            </p>

            <FormSignUpComponent />

            {/* Line Break */}
            <div className="flex items-center md:my-4">
              <hr className="flex-grow border-t border-gray-300" />
              <span className="mx-4 text-gray-500">or</span>
              <hr className="flex-grow border-t border-gray-300" />
            </div>
            {/* with google or github in ipad screen   */}
            <LoginAuth/>

            {/* Register */}
            <div className="text-center">
              <p className="text-text_color_desc_light text-[14px] pt-3">
                Already have an account?{" "}
                <Link href={"/login"}>
                  <span className="text-link_color underline font-medium">
                    Login Now
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
