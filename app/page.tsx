"use client";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Pricing from "@/components/Pricing";
import { Montserrat } from "next/font/google";
import BgBlur from "@/components/BgBlur";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <div
        className={`min-h-screen w-full bg-gray-200  relative overflow-hidden`}
      >
        <BgBlur />
        <Navbar />
        <Hero />
        <Pricing />
        <Footer />
      </div>
    </>
  );
}
