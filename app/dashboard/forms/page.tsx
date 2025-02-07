"use client";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { AxiosError } from "axios";
import { PackageOpen, Terminal, Trash } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "react-toastify";
import { Bebas_Neue } from "next/font/google";

import Link from "next/link";
import { Button } from "@/components/ui/button";

const bebas_neue = Bebas_Neue({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
});
type ApiErrorResponse = {
  err: string;
  error?: unknown;
};

type FormType = {
  _id: string;
  name: string;
  createdAt: string;
  formTitle: string;
};

const Forms = () => {
  const [loading, setLoading] = useState(false);
  const [forms, setForms] = useState([]);

  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    async function getForms() {
      setLoading(true);
      const res = await axios.get("/api/forms");
      localStorage.setItem("totalforms", res.data.length.toString());
      setForms(res.data);
      setLoading(false);
    }
    getForms();
  }, [isDeleted]);

  if (loading) {
    return (
      <div className="w-full h-screen flex relative z-20 items-center justify-center">
        {[1, 2, 3].map((elm, index) => (
          <motion.div
            key={index}
            className={`w-8 h-8 rounded-full bg-cyan-500/50  `}
            animate={{
              y: [0, 30, 0],
            }}
            transition={{
              ease: "easeInOut",
              duration: 1,
              repeat: Infinity,
              repeatDelay: index * 0.2,
            }}
          />
        ))}
      </div>
    );
  }

  async function handleFormDelete(formId: string) {
    try {
      const res = await axios.delete(`/api/forms/${formId}`);
      toast.success(res.data.msg);
      setIsDeleted(true);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const apiError = error as AxiosError<ApiErrorResponse>;
        toast.error(apiError.response?.data?.err || "Something went wrong");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  }

  return (
    <div className="relative z-20 w-full h-screen  md:p-10 p-8">
      <Link href={"/"} className={`${bebas_neue.className} md:hidden `}>
        SmartForms <span className="text-cyan-600">AI</span>
      </Link>
      <div className="w-full   p-5 flex flex-col items-center justify-center text-xl font-semibold text-black/50">
        {forms?.length} out of 3 forms
        <div className="h-1 w-52 bg-white rounded-full">
          <div
            className={` bg-cyan-500 h-full`}
            style={{
              width: `${(forms?.length / 3) * 100}%`,
            }}
          />
        </div>
      </div>

      <>
        {forms?.length === 3 && (
          <Alert variant="destructive">
            <Terminal className="h-4 w-4" />
            <AlertTitle className="font-bold text-2xl">Alert !</AlertTitle>
            <AlertDescription>
              You have reached the maximum limit of 3 forms. Upgrade your plan
              to create more.
            </AlertDescription>
            <Link href={`/`} className="mt-5 underline">
              Upgrade plan
            </Link>
          </Alert>
        )}
      </>

      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-5 gap-2  place-items-center">
        {forms?.length > 0 ? (
          forms?.map((form: FormType, index: number) => (
            <motion.div
              whileDrag={{ scale: 1.1 }}
              drag
              dragConstraints={{ left: -50, right: 150, top: -50, bottom: 150 }}
              animate={{ scale: [0, 1, 0, 1], opacity: [1, 0.3, 0.6, 1] }}
              transition={{
                ease: "easeInOut",
                duration: 0.5,
                repeatDelay: index * 0.2,
                type: "spring",
                stiffness: 120,
              }}
              className="bg-white/30 backdrop-blur-md ring-1 ring-white realtive z-20 p-4 shadow-lg rounded-xl md:w-96 w-80 h-52  flex flex-col gap-4 justify-between mt-5"
              key={form?._id}
            >
              <div className="flex flex-col gap-3">
                <h1 className="font-semibold text-3xl text-black/50">
                  {form?.formTitle}
                </h1>
                <small>
                  <span className="font-semibold text-black/60">
                    Created on :
                  </span>
                  {form?.createdAt?.split("T")[0]}
                </small>
              </div>
              <div className="flex gap-2 text-xs mt-5">
                <motion.button
                  onClick={() => handleFormDelete(form?._id)}
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.1, type: "spring", stiffness: 300 }}
                  className="flex items-center gap-2 px-3 py-1 text-rose-500 ring-1 ring-rose-500 rounded-md"
                >
                  <Trash size={13} /> Delete
                </motion.button>
                <Link href={`/dashboard/forms/${form?._id}`}>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.1 }}
                    transition={{
                      duration: 0.1,
                      type: "spring",
                      stiffness: 300,
                    }}
                    // onClick={() => handleFormOpen(form?._id)}
                    className="flex items-center gap-2 px-3 py-1 bg-cyan-500 text-white ring-1 ring-cyan-500 rounded-md"
                  >
                    <PackageOpen size={13} /> Open
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))
        ) : (
          <span className="text-center">
            You have not created any forms yet.
          </span>
        )}
      </div>
    </div>
  );
};

export default Forms;
