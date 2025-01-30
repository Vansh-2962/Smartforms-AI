"use client";
import { motion } from "framer-motion";
import { Bebas_Neue } from "next/font/google";
import { LogIn } from "lucide-react";
import Link from "next/link";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";

const bebas_neue = Bebas_Neue({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
});

const Navbar = () => {
  const { isSignedIn } = useUser();

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0, rotateX: 180 }}
      animate={{ y: 0, opacity: 1, rotateX: 0 }}
      transition={{ ease: "easeInOut", duration: 0.75 }}
      className="relative max-w-5xl mx-auto z-20 md:mt-10 flex items-center md:justify-center justify-between px-10 "
    >
      <div className="flex items-center justify-between  md:w-3/5 p-5 md:px-10  text-black backdrop-blur-lg w-full">
        <Link
          href={"/"}
          className={`${bebas_neue.className} font-bold md:text-3xl text-xl `}
        >
          SmartForms <span className="text-cyan-600">AI</span>
        </Link>
        {isSignedIn && (
          <div className="flex items-center gap-2 border ring-1 ring-cyan-500 rounded-full pl-4 hover:bg-cyan-500/10 hover:text-white transition-colors ease-in-out duration-300">
            <Link href="/dashboard/forms" className="text-cyan-600 text-sm ">
              Dashboard
            </Link>

            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        )}

        <SignedOut>
          <SignInButton>
            <button className="md:px-5 px-3 md:py-1 bg-white/20 rounded-full hover:bg-cyan-500 hover:text-white transition-colors ease-in-out duration-300 ring-1 ring-cyan-500 text-cyan-500 flex items-center gap-3">
              <LogIn size={16} /> Sign in
            </button>
          </SignInButton>
        </SignedOut>
      </div>
    </motion.nav>
  );
};

export default Navbar;
