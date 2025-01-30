"use client";
import { Sparkles } from "lucide-react";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Montserrat } from "next/font/google";
import { useUser } from "@clerk/nextjs";
import { toast } from "react-toastify";
import axios from "axios";
import Loader from "./Loader";
import { useRouter } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";

const montserrat = Montserrat({ subsets: ["latin"] });

const Hero = () => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  const router = useRouter();

  async function handleFormGenerate(e: React.FormEvent) {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/generate", {
        formType: value,
        userId: user?.id,
      });
      console.log(response);
      setValue("");
      router.push("/dashboard/forms");
    } catch (error) {
      toast.error("Something went wrong");
      console.log("Error occured : ", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.9 }}
        className={` ${montserrat.className} relative max-w-5xl mx-auto md:mt-16 mt-8 text-gray-800 z-10 text-center`}
      >
        <motion.h1
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ease: "easeInOut", duration: 0.9 }}
          className="md:text-5xl text-3xl font-bold"
        >
          Transform Data Collection with AI: Seamless Forms, Smarter Insights!
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            ease: "easeInOut",
            duration: 0.9,
            delay: 1,
          }}
          className="md:text-lg  mt-5 text-gray-600 font-medium"
        >
          "Effortlessly create and manage intelligent, dynamic forms powered by
          AI, designed to save time and deliver actionable results."
        </motion.p>
        <form
          onSubmit={handleFormGenerate}
          className="mt-10 flex flex-col md:flex-row items-center justify-between gap-3  px-3 md:px-0"
        >
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Write a prompt to generate your form...."
            className="md:p-2 p-1 rounded-full md:px-5 outline-none bg-white/30 text-lg w-full"
          />
          {loading ? (
            <>
              <button
                disabled={loading}
                className={` md:text-md bg-cyan-500 md:p-2 md:px-5 px-3 py-1 rounded-full text-white font-medium hover:bg-white/30 hover:text-cyan-500  transition-colors ease-in-out duration-300 ring-1 ring-cyan-500 flex items-center gap-3 ${
                  !loading ? "" : ""
                } `}
              >
                <Loader width={0} height={0} /> Generating...
              </button>
            </>
          ) : (
            <>
              <button className=" md:text-md bg-cyan-500 md:p-2 md:px-5 px-3 py-1 rounded-full text-white font-medium hover:bg-white/30 hover:text-cyan-500 transition-colors ease-in-out duration-300 ring-1 ring-cyan-500 flex items-center gap-3">
                <Sparkles size={18} /> Generate
              </button>
            </>
          )}
        </form>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ease: "easeInOut", duration: 0.9 }}
          className=" w-full md:mt-5 mt-8 flex md:flex-row flex-col items-center justify-center md:gap-10 gap-2 "
        >
          <span
            onClick={() => setValue("feedback form")}
            className="bg-white/30 backdrop-blur-lg cursor-pointer shadow-lg px-10 py-1 ring-1 ring-white/40 rounded-md text-black hover:bg-white/50 transition duration-300"
          >
            Feedback form
          </span>
          <span
            onClick={() => setValue("registration form")}
            className="bg-white/30 backdrop-blur-lg cursor-pointer shadow-lg px-10 py-1 ring-1 ring-white/40 rounded-md text-black hover:bg-white/50 transition duration-300"
          >
            Registration form
          </span>
          <span
            onClick={() => setValue("job application form")}
            className="bg-white/30 backdrop-blur-lg cursor-pointer shadow-lg px-10 py-1 ring-1 ring-white/40 rounded-md text-black hover:bg-white/50 transition duration-300"
          >
            Job application form
          </span>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Hero;
