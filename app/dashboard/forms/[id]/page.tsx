"use client";
import FormCard from "@/components/FormCard";
import axios from "axios";
import { ChevronLeft, Code, ShareIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "react-toastify";

const SingleForm = () => {
  const formId = useParams().id;
  const router = useRouter();

  useEffect(() => {
    async function getForm() {
      const res = await axios.get(`/api/forms/${formId}`);
      console.log(res.data);
    }
    getForm();
  }, [formId]);

  const handleCopyEmbedCode = () => {
    const embedCode = `<iframe src="${window.location.origin}/form/${formId}" width="600" height="400" style="border: none;"></iframe>`;
    navigator.clipboard.writeText(embedCode);
    toast.success("Embed code copied to clipboard");
  };

  return (
    <>
      <main className="w-full px-5 flex flex-col gap-5 relative z-20">
        <div className="flex sticky z-30 top-0 backdrop-blur-md p-3 w-full items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-3 cursor-pointer"
          >
            <ChevronLeft size={15} /> Back
          </button>
          <div className="flex items-center gap-3">
            {/* Get embed form */}
            <motion.div className="bg-cyan-500 text-white md:px-5 md:py-2 px-2 py-1 rounded hover:bg-transparent hover:text-cyan-500 border border-cyan-500 transition-all ease-in-out duration-300 flex items-center gap-2 text-sm md:text-normal">
              <Dialog>
                <DialogTrigger className="flex items-center gap-2">
                  <ShareIcon size={15} /> Share
                </DialogTrigger>
                <DialogContent className="max-w-lg w-full p-6">
                  <DialogHeader>
                    <DialogTitle>Copy link</DialogTitle>
                    <DialogDescription>
                      Copy the link down below to embed the form in your
                      website.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="bg-gray-100 mt-5 p-2 rounded overflow-auto">
                    <code className="text-sm break-all">
                      {`<iframe src="${window.location.origin}/form/${formId}" width="600" height="400" style="border: none;"></iframe>`}
                    </code>
                  </div>
                  <div className="w-full flex items-center justify-end">
                    <button
                      onClick={handleCopyEmbedCode}
                      className="bg-cyan-500 text-white px-3 py-1 text-sm rounded mt-4"
                    >
                      Copy
                    </button>
                  </div>
                </DialogContent>
              </Dialog>
            </motion.div>

            {/* Get code */}
            <motion.div className="bg-cyan-500 text-white md:px-5 md:py-2 px-2 py-1 rounded hover:bg-transparent hover:text-cyan-500 border border-cyan-500 transition-all ease-in-out duration-300 flex items-center gap-2 text-sm md:text-normal">
              <Dialog>
                <DialogTrigger className="flex items-center gap-2">
                  <Code size={15} /> Get Code
                </DialogTrigger>
                <DialogContent className="max-w-lg w-full p-6">
                  <DialogHeader>
                    <DialogTitle>Get code</DialogTitle>
                    <DialogDescription>
                      Copy the code down below to embed the form in your
                      website.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="bg-gray-100 mt-5 p-2 rounded overflow-auto">
                    <code className="text-sm break-all">
                      {`<iframe src="${window.location.origin}/form/${formId}" width="600" height="400" style="border: none;"></iframe>`}
                    </code>
                  </div>
                  <div className="w-full flex items-center justify-end">
                    <button
                      onClick={handleCopyEmbedCode}
                      className="bg-cyan-500 text-white px-3 py-1 text-sm rounded mt-4"
                    >
                      Copy
                    </button>
                  </div>
                </DialogContent>
              </Dialog>
            </motion.div>
          </div>
        </div>
        <FormCard formId={formId} />
      </main>
    </>
  );
};

export default SingleForm;
