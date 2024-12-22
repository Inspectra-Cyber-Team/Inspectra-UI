import VerifyComponent from "@/components/VerifyComponent/VerifyComponent";
import Link from "next/link";
import { RxCross2 } from "react-icons/rx";
import { Metadata } from "next";

export const metadata: Metadata ={
  title: 'Verify - Inspectra',
  description:
    'Verify up your email in the case of forgetting your password and recieve OTP to setup your new password',
  keywords:
    'Inspectra verify, Inspectra, inspectra, inspect, source code scan, scan, code scan, white-box testing Cambodia, secure development platform, source code analysis, cybersecurity tools, secure coding practices',
  authors: { name: 'Inspectra Team' },
  publisher: 'Inspectra',
  openGraph: {
    title: 'Verify - Inspectra',
    description:
      'Verify up your email in the case of forgetting your password and recieve OTP to setup your new password',
    siteName: 'Inspectra',
    locale: 'en_KH',
    type: 'website',
    url: 'https://inspectra.istad.co/'
  },
}

export default function page() {
  return (
    <main className="h-screen w-full my-auto justify-around flex-col  text-center bg-background_light_mode">
      {/* title */}
      <section className="h-full flex flex-col items-center justify-center">
        {/* Header Section */}
        <section className="w-full my-10 text-center">
          <p className="text-[60px] text-text_color_light font-semibold leading-[1.2]">
            Verify Your <br />
            <span className="font-normal">Account</span>
          </p>
          <p className="text-text_body_16 text-ascend_color leading-[1.4] mt-2">
            To gain more access to our features
          </p>
        </section>

        {/* Verify Code Section */}
        <section className="flex flex-col justify-around p-5 h-auto mx-auto w-[350px] md:w-[600px] rounded-[20px] bg-text_color_dark">
          <div className="flex justify-between m-5">
            <p className="text-text_header_34 text-text_color_light">
              Verification
            </p>
            <Link
              href={"/signup"}
              className="text-text_header_34 text-text_color_light items-center"
            >
              <RxCross2 className="h-full" />
            </Link>
          </div>
          <div>
            <p className="text-text_color_desc_light text-text_body_16 py-5">
              Enter your 6 digits code that you received on your email.
            </p>
          </div>
          {/* Form for OTP */}
          <VerifyComponent />
        </section>
      </section>
    </main>
  );
}
