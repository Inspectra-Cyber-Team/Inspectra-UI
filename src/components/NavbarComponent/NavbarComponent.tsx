"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { navbarData, navbarDataWithProfile } from "@/data/navbar";
import { useGetUserDetailQuery } from "@/redux/service/user";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { IoIosArrowUp } from "react-icons/io";
import { IoLogOutSharp, IoMenu } from "react-icons/io5";
import { SiMicrodotblog } from "react-icons/si";
import { TbScan } from "react-icons/tb";
import { FaBookmark } from "react-icons/fa6";

import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import ScrollProgressBarComponent from "./ScrollProgressBarComponent";
import { ModeToggle } from "../ToggleTheme/ToggleTheme";
import { signOut } from "next-auth/react";

export default function NavbarComponent() {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [userUUID, setUserUUID] = useState("");

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  const { data: userData } = useGetUserDetailQuery({ uuid: userUUID });

  const pathname = usePathname();
  const handleClick = () => {
    setIsOpen(false); // Close menu if this prop is passed
  };
  useEffect(() => {
    const storedUUID = localStorage.getItem("userUUID") || "";
    setUserUUID(storedUUID);
  });

  const handleSignOut = () => {
    fetch(process.env.NEXT_PUBLIC_BASE_URL_LOCALHOST + "/logout", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    })
      .then((res) => res.json())
      .then(() => {
        localStorage.clear();
        setUserUUID("");
        router.push("/");
      })
      .catch((error) => {
        console.error("Refresh Token error:", error);
      });
  };

  const isRender =
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/forget-password" ||
    pathname === "/newpassword" ||
    pathname === "/newpassword" ||
    pathname === "/verify" ||
    pathname === "/change-password";

  return (
    <>
    {!isRender && (
      <ScrollProgressBarComponent />)}
      <nav className="w-full mx-auto z-40 backdrop-blur-2xl sticky top-0">
        <div className="w-[90%] mx-auto ">
          {!isRender && (
            <div className="flex text-text_color_light dark:text-text_color_dark justify-between items-center p-4">
              {/* logo */}
              <div className="w-[40px] h-[40px] overflow-hidden rounded-full">
                <img
                  src="/images/logo.jpg"
                  alt="Logo"
                  width={50}
                  height={50}
                  onClick={() => router.push("/")}
                  className="object-cover w-full h-full cursor-pointer"
                />
              </div>
              {/* content navbar */}
              <div className="hidden lg:block ">
                <ul className="flex w-[500px]  text-text_body_16  justify-between">
                  {navbarData.map((item, index: number) => (
                    <Link
                      key={index}
                      href={
                        item.link === "/document"
                          ? "https://inspectra-doc.istad.co/"
                          : item.link
                      }
                      target={item.link === "/document" ? "_blank" : undefined} // Open in new tab for /document
                      rel={
                        item.link === "/document"
                          ? "noopener noreferrer"
                          : undefined
                      } // Add security for external links
                    >
                      {pathname === item.link ? (
                        <p className="text-secondary_color">{item?.name}</p>
                      ) : (
                        <p>{item.name}</p>
                      )}
                    </Link>
                  ))}
                </ul>
              </div>
              {/* group icon and sign in */}
              <div className="flex justify-center h-full items-center">
                <div className="flex items-center space-x-2">
                  {/* Icon to change theme */}
                  <ModeToggle />
                  {/* Sign in button */}
                  {userUUID === "" || !userData ? (
                    <Link
                      href="/login"
                      className="text-text_color_dark bg-background_dark_mode dark:bg-background_light_mode dark:text-text_color_light rounded-tl-[14px] rounded-br-[14px] text-text_body_16 px-4 lg:px-4 py-2 lg:py-1.5 hidden lg:block"
                    >
                      Sign in
                    </Link>
                  ) : (
                    <Menubar>
                      <MenubarMenu>
                        <MenubarTrigger
                          onClick={handleMenuToggle}
                          className="hidden md:block "
                        >
                          <img
                            src={userData?.data?.profile}
                            alt="Profile"
                            className="object-cover cursor-pointer rounded-full w-12 h-12 border-2 border-primary_color"
                            onError={(e) =>
                              (e.currentTarget.src =
                                "/images/default-profile.jpg")
                            }
                          />
                        </MenubarTrigger>
                        {isMenuOpen && (
                          <MenubarContent className="absolute -left-[295px] w-[350px] p-5 rounded-[10px] border-none bg-card_color_light dark:bg-background_dark_mode">
                            <p className="text-text_color_light text-text_body_16 dark:text-text_color_dark">
                              {userData?.data?.name}
                            </p>
                            <p className="text-text_color_desc_light text-[14px] dark:text-text_color_dark">
                              {userData?.data?.email}
                            </p>

                            <hr className="my-5" />
                            {/* Profile */}
                            <button
                              onClick={() => {
                                router.push("/myprofile");
                                handleMenuClose();
                              }}
                              className="p-3 my-3 flex w-full justify-between items-center text-center"
                            >
                              <div className="flex items-center">
                                <div className="flex items-center justify-center w-6 h-6">
                                  <FaUser className="w-full h-full text-text_title_20" />
                                </div>
                                <p className="mx-5 text-text_body_16">
                                  My Profile
                                </p>
                              </div>
                              <div>
                                <IoIosArrowUp className="rotate-90" />
                              </div>
                            </button>

                            {/* Blog History */}
                            <button
                              onClick={() => {
                                router.push("/bloghistory");
                                handleMenuClose();
                              }}
                              className="p-3 my-3 flex w-full justify-between items-center text-center"
                            >
                              <div className="flex items-center">
                                <div className="flex items-center justify-center w-6 h-6">
                                  <SiMicrodotblog className="w-full h-full text-text_title_20" />
                                </div>
                                <p className="mx-5 text-text_body_16">
                                  Blog History
                                </p>
                              </div>
                              <div>
                                <IoIosArrowUp className="rotate-90" />
                              </div>
                            </button>

                            {/* Blog Bookmark */}
                            <button
                              onClick={() => {
                                router.push("/bookmark");
                                handleMenuClose();
                              }}
                              className="p-3 my-3 flex w-full justify-between items-center text-center"
                            >
                              <div className="flex items-center">
                                <div className="flex items-center justify-center w-6 h-6">
                                  <FaBookmark className="w-full h-full text-text_title_20" />
                                </div>
                                <p className="mx-5 text-text_body_16">
                                  Blog Bookmark
                                </p>
                              </div>
                              <div>
                                <IoIosArrowUp className="rotate-90" />
                              </div>
                            </button>

                            {/* Scan History */}
                            <button
                              onClick={() => {
                                router.push("/scanhistory");
                                handleMenuClose();
                              }}
                              className="p-3 my-3 flex w-full justify-between items-center text-center"
                            >
                              <div className="flex items-center">
                                <div className="flex items-center justify-center w-6 h-6">
                                  <TbScan className="w-full h-full text-text_title_20" />
                                </div>
                                <p className="mx-5 text-text_body_16">
                                  Scan History
                                </p>
                              </div>
                              <div>
                                <IoIosArrowUp className="rotate-90" />
                              </div>
                            </button>

                            {/* Log Out */}
                            <button
                              onClick={() => {
                                // handle remove also session from next-auth
                                signOut();
                                handleSignOut();
                                handleMenuClose();
                              }}
                              className="p-3 my-3 flex w-full justify-between items-center text-center"
                            >
                              <div className="flex items-center">
                                <div className="flex items-center justify-center w-6 h-6">
                                  <IoLogOutSharp className="w-full h-full" />
                                </div>
                                <p className="mx-5 text-text_body_16">
                                  Log Out
                                </p>
                              </div>
                            </button>
                          </MenubarContent>
                        )}
                      </MenubarMenu>
                    </Menubar>
                  )}
                  {/* menu icon */}
                  <div className="text-[25px] block lg:hidden ">
                    {/* no account */}
                    {userUUID === "" ? (
                      <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                          <IoMenu />
                        </SheetTrigger>
                        <SheetContent className="bg-background_light_mode dark:bg-background_dark_mode border-hidden">
                          <ul className=" text-text_color_light dark:text-text_color_dark  text-text_body_16  justify-between space-y-4 flex flex-col">
                            {navbarData.map((item, index: number) => (
                              <Link
                                key={index}
                                href={
                                  item.link === "/document"
                                    ? "https://inspectra-doc.istad.co/"
                                    : item.link
                                }
                                target={
                                  item.link === "/document"
                                    ? "_blank"
                                    : undefined
                                } // Open in new tab for /document
                                rel={
                                  item.link === "/document"
                                    ? "noopener noreferrer"
                                    : undefined
                                } // Add security for external links
                              >
                                {pathname === item.link ? (
                                  <p
                                    onClick={handleClick}
                                    className="text-secondary_color "
                                  >
                                    {item?.name}
                                  </p>
                                ) : (
                                  <p onClick={handleClick}>{item.name}</p>
                                )}
                              </Link>
                            ))}
                            <Link href="/login">
                              <p>Sign in</p>
                            </Link>
                          </ul>
                        </SheetContent>
                      </Sheet>
                    ) : (
                      <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                          <IoMenu />
                        </SheetTrigger>
                        <SheetContent className="bg-background_light_mode dark:bg-background_dark_mode border-hidden">
                          <ul className=" text-text_color_light dark:text-text_color_dark  text-text_body_16   space-y-4 flex flex-col">
                            <div className="flex space-x-3">
                              <div className="overflow-hidden rounded-full w-12 h-12 border-2 border-primary_color">
                                <img
                                  src={userData?.data?.profile}
                                  alt="Profile"
                                  className="object-cover cursor-pointer rounded-full w-12 h-12 "
                                  onError={(e) =>
                                    (e.currentTarget.src =
                                      "/images/default-profile.jpg")
                                  }
                                />
                              </div>
                              <div>
                                <p className="text-text_color_light text-text_body_16 dark:text-text_color_dark">
                                  {userData?.data?.name}
                                </p>
                                <p className="text-text_color_desc_light text-[12px] dark:text-text_color_dark">
                                  {userData?.data?.email}
                                </p>
                              </div>
                            </div>
                            <hr className="text-text_color_light" />
                            {navbarData.map((item, index: number) => (
                              <Link
                                key={index}
                                href={
                                  item.link === "/document"
                                    ? "https://inspectra-doc.istad.co/"
                                    : item.link
                                }
                                target={
                                  item.link === "/document"
                                    ? "_blank"
                                    : undefined
                                } // Open in new tab for /document
                                rel={
                                  item.link === "/document"
                                    ? "noopener noreferrer"
                                    : undefined
                                } // Add security for external links
                              >
                                {pathname === item.link ? (
                                  <p
                                    onClick={handleClick}
                                    className="text-secondary_color"
                                  >
                                    {item?.name}
                                  </p>
                                ) : (
                                  <p onClick={handleClick}>{item.name}</p>
                                )}
                              </Link>
                            ))}
                            {navbarDataWithProfile.map(
                              (item, index: number) => (
                                <Link key={index} href={item.link}>
                                  {pathname === item.link ? (
                                    <p
                                      onClick={handleClick}
                                      className="text-secondary_color"
                                    >
                                      {item?.name}
                                    </p>
                                  ) : (
                                    <p onClick={handleClick}>{item.name}</p>
                                  )}
                                </Link>
                              )
                            )}
                            <button
                              onClick={() => {
                                // calling auth from next auth
                                signOut();
                                handleSignOut();
                              }}
                              className="text-start"
                            >
                              Log Out
                            </button>
                          </ul>
                        </SheetContent>
                      </Sheet>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
