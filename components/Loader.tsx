import React from "react";
import { motion } from "framer-motion";

const Loader = ({ width, height }: { width: number; height: number }) => {
  return (
    <motion.div className="flex items-center gap-1 ">
      {[1, 2, 3].map((elm, index) => (
        <motion.div
          key={index}
          className={`${
            width && height && `w-${width} h-${height}`
          }  w-2 h-2 rounded-full bg-white ring-1 ring-cyan-500`}
          animate={{ scale: [0, 1, 0], opacity: [1, 0.3, 1] }}
          transition={{
            ease: "easeInOut",
            duration: 1,
            repeat: Infinity,
            repeatDelay: index * 0.2,
          }}
        />
      ))}
    </motion.div>
  );
};

export default Loader;
