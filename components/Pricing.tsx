import React from "react";
import { motion } from "framer-motion";
import { Montserrat } from "next/font/google";
import { pricingDetails } from "@/lib/pricingDetails";
import PricingCard from "./PricingCard";

const montserrat = Montserrat({ subsets: ["latin"] });
const Pricing = () => {
  return (
    <>
      <main
        className={`max-w-5xl h-screen mx-auto mt-32 relative text-black ${montserrat.className}`}
      >
        <motion.section className="flex items-center flex-col justify-center text-center font-bold text-3xl">
          <motion.h1
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ease: "easeInOut", duration: 0.75, delay: 0.3 }}
          >
            Plan and Pricing
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ease: "easeInOut", duration: 0.75, delay: 1 }}
            className="text-gray-600 font-medium text-lg mt-3"
          >
            "Choose the plan that fits your needs and unlock the power of
            SmartForms AI today."
          </motion.p>
        </motion.section>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{
            ease: "easeInOut",
            duration: 0.75,
            delay: 0.3,
          }}
          className="grid md:grid-cols-3 mt-10 gap-5 h-full px-10 md:px-0"
        >
          {pricingDetails?.map((price, index) => (
            <div key={index}>
              <PricingCard price={price} />
            </div>
          ))}
        </motion.div>
      </main>
    </>
  );
};

export default Pricing;
