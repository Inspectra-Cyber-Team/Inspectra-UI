'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function ImageBackground() {
  const pathname = usePathname();

  const isRender =
    pathname === '/aboutUs' ||
    pathname === '/useCase' ||
    pathname === '/project' ||
    pathname === '/useCase' ||
    (pathname.startsWith('/blog') && pathname !== '/blog/uuid') ||
    pathname === '/faq' ||
    pathname === '/login' ||
    pathname === '/register' ||
    pathname === '/signup' ||
    pathname === '/forgetpassword' ||
    pathname === '/newpassword' ||
    pathname === '/newpassword' ||
    pathname === '/verify' ||
    pathname === '/scanHistory' ||
    pathname === '/blogHistory' ||
    pathname === '/change-password' ||
    pathname === '/forget-password' ||
    pathname === '/myProfile';

  return (
    <>
      {!isRender && (
        <>
          <div className="absolute hidden lg:block -z-30 -top-10 -right-10 animate-float-slow">
            <Image
              src="/images/Ellipse-bg.png"
              alt="Background Top Right"
              width={600}
              height={600}
              className="filter blur-2xl"
            />
          </div>
          <div className="absolute hidden lg:block -z-30 -bottom-[5px] -left-[200px] md:top-[140px] md:-left-[250px] lg:top-[140px] lg:-left-[250px] xl:top-[300px] xl:-left-[400px] animate-float">
            <Image
              src="/images/Ellipse-bg.png"
              alt="Background Bottom Left"
              width={600}
              height={600}
              className="filter blur-3xl"
            />
          </div>
        </>
      )}
    </>
  );
}

