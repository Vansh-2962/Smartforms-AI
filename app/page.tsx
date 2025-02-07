"use client";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Pricing from "@/components/Pricing";

import BgBlur from "@/components/BgBlur";



export default function Home() {
  return (
    <>
      <div
        className={`min-h-screen w-full bg-gray-200 relative overflow-hidden`}
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
