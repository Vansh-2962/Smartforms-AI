"use client";
import React from "react";
import { motion } from "framer-motion";
const BgBlur = () => {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.75 }}
        className="absolute w-[1600px] h-[200px] mt-10 bg-gradient-to-r rotate-45 from-cyan-500 via-pink-300 to-violet-600 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg blur-[130px] z-0 "
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.75 }}
        className="absolute w-[1600px] h-[200px] mt-10 bg-gradient-to-r rotate-[100deg] from-yellow-200  top-1/2 left-1/2 -translate-x-1/4 -translate-y-1/2 rounded-lg blur-[130px] z-0 "
      />
    </div>
  );
};

export default BgBlur;
