"use client";
import BgBlur from "@/components/BgBlur";
import Link from "next/link";
import { Bebas_Neue } from "next/font/google";
import { ArrowLeftToLine, ArrowRightToLine, ClipboardType } from "lucide-react";
import {  useState } from "react";

import { SignedIn,  SignOutButton } from "@clerk/nextjs";

const bebas_neue = Bebas_Neue({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
});

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [collapse, setCollapse] = useState(false);

  return (
    <div className="min-h-screen w-full flex bg-gray-200 text-black relative overflow-hidden">
      <BgBlur />

      <div
        className={`transition-all ease-in-out duration-500 hidden md:block ${
          collapse ? "w-16" : "w-64"
        }  h-screen bg-white/70 shadow-lg border-r-2 border-white p-5`}
      >
        <div className="flex items-center justify-between">
          <Link
            href={"/"}
            className={`${bebas_neue.className} font-bold md:text-3xl text-xl ${
              collapse ? "hidden" : ""
            }`}
          >
            SmartForms <span className="text-cyan-600">AI</span>
          </Link>
          {collapse ? (
            <ArrowRightToLine
              size={20}
              className="cursor-pointer"
              onClick={() => setCollapse(false)}
            />
          ) : (
            <ArrowLeftToLine
              size={20}
              className="cursor-pointer"
              onClick={() => setCollapse(true)}
            />
          )}
        </div>

        <div
          className={` py-5 mt-10 w-full flex flex-col items-center gap-2 justify-center`}
        >
          <Link
            href={"/dashboard/forms"}
            className={`${
              collapse ? "hidden" : ""
            } bg-white px-5  py-1 w-full border border-gray-200/90 flex items-center justify-center gap-2`}
          >
            <ClipboardType size={16} />
            <span>My Forms</span>
          </Link>
          <div className="mt-10 shadow-lg rounded-lg">
            <span
              className={`${
                collapse ? "hidden" : ""
              } bg-white px-5 text-sm py-1 w-full border border-gray-200/90 flex items-center justify-center gap-2`}
            >
              Your free plan is active now. You can create upto 3 forms only.
              Upgrade to a Pro🔥 plan.
            </span>
            <button
              className={`${
                collapse ? "hidden" : ""
              } bg-cyan-500/30 px-5 text-sm py-1 w-full border flex items-center justify-center gap-2`}
            >
              Upgrade plan
            </button>
          </div>
          {collapse && (
            <Link href={"/dashboard/forms"}>
              <ClipboardType size={16} />
            </Link>
          )}
        </div>
        <div className="absolute bottom-5 bg-cyan-500 w-52 text-center py-1 rounded-md text-white">
          <SignedIn>
            <SignOutButton />
          </SignedIn>
        </div>
      </div>
      <div className="flex-1 w-full  max-h-screen overflow-y-scroll">
        {children}
      </div>
    </div>
  );
};

export default Layout;
