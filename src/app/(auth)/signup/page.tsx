import FormSignUpComponent from "@/components/FromLoginComponent/FormSignUpComoponent";
import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Metadata } from "next";
import Link from "next/link";

import { VscGithub } from "react-icons/vsc";
import { FcGoogle } from "react-icons/fc";
import { RxCross2 } from "react-icons/rx";
import { IoIosArrowUp } from "react-icons/io";
export const metadata: Metadata = {
  title: "Sign Up - Inspectra",
  description:
    "Learn more about Inspectra, a white-box testing platform designed to review source code and identify security weaknesses. Discover our mission, values, and commitment to secure development.",
};
export default function page() {
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
            <hr className="my-2 xl:mt-5" />
            {/* auth with google and github */}
            <div className=" block xl:hidden justify-center text-center items-center text-text_color_desc_light">
              <p className="font-normal">Or Continue</p>
            </div>
            {/* with google or github in ipad screen   */}
            <div className=" flex flex-row md:flex-col my-2  justify-between  space-x-5 space-y-0 md:space-x-0 md:space-y-6 ">
              <button className="xl:hidden w-full py-3 flex items-center font-normal bg-text_color_light justify-center rounded-[10px]">
                <FcGoogle className="text-text_title_24" />
                <span className=" hidden md:block text-text_color_dark ml-3">
                  Sign up with Google
                </span>
                <span className=" block md:hidden text-text_color_dark ml-3">
                  Google
                </span>
              </button>
              <button className="xl:hidden  w-full py-3 flex items-center font-normal bg-background_light_mode justify-center rounded-[10px]">
                <VscGithub className="text-text_title_24 text-text_color_light" />
                <span className=" hidden md:block text-text_color_light ml-3">
                  Sign up with GitHub
                </span>
                <span className=" block md:hidden text-text_color_light ml-3">
                  GitHub
                </span>
              </button>
            </div>

            {/* with google or github in Login with laptop screen */}
            <Menubar className="hidden xl:block">
              <MenubarMenu>
                <MenubarTrigger className="w-full flex rounded-[10px] justify-center items-center">
                  <div className="flex items-center text-text_color_desc_light">
                    <p className="text-center font-normal">
                      Or Continue With More Option
                    </p>
                    <IoIosArrowUp className="h-5 w-5 ml-2" />
                  </div>
                </MenubarTrigger>

                <MenubarContent className="absolute  bottom-[50px] -left-1">
                  <div className="w-full h-[60px] space-x-5 flex justify-between">
                    <button className="w-[230px] py-3 flex items-center font-normal bg-text_color_light justify-center rounded-[10px]">
                      <FcGoogle className="text-text_title_24" />
                      <span className="text-text_color_dark ml-3">Google</span>
                    </button>

                    <button className="w-[230px]  py-3 flex items-center font-normal bg-background_light_mode justify-center rounded-[10px]">
                      <VscGithub className="text-text_title_24 text-text_color_light" />
                      <span className="text-text_color_light ml-3">GitHub</span>
                    </button>
                  </div>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>

            {/* Register */}
            <div className="text-center">
              <p className="text-text_color_desc_light text-[14px]">
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
