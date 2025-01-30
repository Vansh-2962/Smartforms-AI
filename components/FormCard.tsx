import React, { useEffect, useState } from "react";
import axios from "axios";
import { Montserrat } from "next/font/google";
import ReactStars from "react-stars";
import { motion } from "framer-motion";

const montserrat = Montserrat({ subsets: ["latin"] });

type OptionType = {
  value?: string;
  label?: string;
  optionType?: string;
};

type ContentType = {
  inputType?: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  options?: OptionType[];
  value?: string;
};

type FormType = {
  formTitle?: string;
  content?: ContentType[];
  userId?: string;
  _id?: string;
};

type SelectOptionType = {
  value?: string;
  label?: string;
  text?: string;
};

const FormCard = ({ formId }: { formId: string }) => {
  const [form, setForm] = useState<FormType>();
  useEffect(() => {
    async function getForm() {
      const res = await axios.get(`/api/forms/${formId}`);
      console.log(res.data);
      setForm(res.data);
    }
    getForm();
  }, [formId]);

  return (
    <>
      <motion.main
        animate={{ opacity: 1, scale: 1 }}
        initial={{ opacity: 0, scale: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className={`${montserrat.className}   bg-white/60 backdrop-blur-xl relative z-20 p-8 mb-10 rounded-lg`}
      >
        <div>
          <motion.h1
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              type: "spring",
              stiffness: 100,
              delay: 0.5,
            }}
            className="text-3xl font-bold text-black/50 mb-5 "
          >
            {form?.formTitle}
          </motion.h1>
          <div className="">
            {form?.content?.map((item: ContentType, index: number) => (
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 1,
                  type: "spring",
                  stiffness: 300,
                  delay: 0.5,
                }}
                className="py-3"
                key={index}
              >
                {/* text label */}
                {item?.inputType === "text" && (
                  <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 1,
                      type: "spring",
                      stiffness: 300,
                      delay: 0.5,
                    }}
                    className="flex md:flex-row flex-col md:items-center md:gap-3 justify-start "
                  >
                    <label className="font-semibold text-black/70">
                      {item?.label}
                    </label>
                    <input
                      type={item?.inputType}
                      placeholder={item?.placeholder}
                      className="border shadow-md bg-white/60 border-gray-300 rounded-md px-3 py-2"
                    />
                  </motion.div>
                )}
                {/* email label  */}
                {item?.inputType === "email" && (
                  <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 1,
                      type: "spring",
                      stiffness: 300,
                      delay: 0.5,
                    }}
                    className="flex md:flex-row flex-col md:items-center md:gap-3 justify-start "
                  >
                    <label className="font-semibold text-black/70">
                      {item?.label}
                    </label>
                    <input
                      type={item?.inputType}
                      placeholder={item?.placeholder}
                      className="border shadow-md bg-white/60 border-gray-300 rounded-md px-3 py-2"
                    />
                  </motion.div>
                )}
                {/* password */}
                {item?.inputType === "password" && (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 1,
                      type: "spring",
                      stiffness: 300,
                      delay: 0.5,
                    }}
                    className="flex md:flex-row flex-col md:items-center md:gap-3 justify-start"
                  >
                    <label className="font-semibold text-black/70">
                      {item?.label}
                    </label>
                    <input
                      type={item?.inputType}
                      placeholder={item?.placeholder}
                      className="border shadow-md bg-white/60 border-gray-300 rounded-md px-3 py-2"
                    />
                  </motion.div>
                )}
                {/* date */}
                {item?.inputType === "date" && (
                  <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 1,
                      type: "spring",
                      stiffness: 300,
                      delay: 0.5,
                    }}
                    className="flex md:flex-row flex-col md:items-center md:gap-3 justify-start"
                  >
                    <label className="font-semibold text-black/70">
                      {item?.label}
                    </label>
                    <input
                      type={item?.inputType}
                      placeholder={item?.placeholder}
                      className="border shadow-md bg-white/60 border-gray-300 rounded-md px-3 py-2"
                    />
                  </motion.div>
                )}
                {/* telephone */}
                {item?.inputType === "tel" && (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 1,
                      type: "spring",
                      stiffness: 300,
                      delay: 0.5,
                    }}
                    className="flex md:flex-row flex-col md:items-center md:gap-3 justify-start "
                  >
                    <label className="font-semibold text-black/70">
                      {item?.label}
                    </label>
                    <input
                      type={item?.inputType}
                      placeholder={item?.placeholder}
                      className="border shadow-md bg-white/60 border-gray-300 rounded-md px-3 py-2"
                    />
                  </motion.div>
                )}

                {/* radio */}
                {item?.inputType === "radio" && (
                  <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 1,
                      type: "spring",
                      stiffness: 300,
                      delay: 0.5,
                    }}
                    className="flex flex-col items-start gap-3 justify-start "
                  >
                    <label className="font-semibold text-black/70">
                      {item?.label}
                    </label>
                    {item?.options?.map((option: OptionType, index: number) => (
                      <div
                        key={index}
                        className="flex  items-center gap-3 justify-start"
                      >
                        <input
                          type={item?.inputType}
                          name={item?.label}
                          value={option?.value}
                        />
                        <label>{option?.label}</label>
                      </div>
                    ))}
                  </motion.div>
                )}
                {/* Textarea */}
                {item?.inputType === "textarea" && (
                  <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 1,
                      type: "spring",
                      stiffness: 300,
                      delay: 0.5,
                    }}
                    className="flex md:flex-row flex-col md:items-center md:gap-3 justify-start "
                  >
                    <label className="font-semibold text-black/70">
                      {item?.label}
                    </label>
                    <textarea
                      placeholder={item?.placeholder}
                      cols={50}
                      className="border shadow-md bg-white/60 border-gray-300 rounded-md px-3 py-2"
                    ></textarea>
                  </motion.div>
                )}
                {/* ratings */}
                {item?.inputType === "rating" && (
                  <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 1,
                      type: "spring",
                      stiffness: 300,
                      delay: 0.5,
                    }}
                    className="flex md:flex-row flex-col md:items-center md:gap-3 justify-start"
                  >
                    <label className="font-semibold text-black/70">
                      {item?.label}
                    </label>
                    <ReactStars count={5} size={30} />
                  </motion.div>
                )}
                {/* checkbox */}
                {item?.inputType === "checkbox" && (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 1,
                      type: "spring",
                      stiffness: 300,
                      delay: 0.5,
                    }}
                    className="flex  flex-col md:items-start md:gap-3 gap-2 justify-start"
                  >
                    <label className="font-semibold text-black/70">
                      {item?.label}
                    </label>
                    {!item?.options && (
                      <div className="flex  items-center gap-3 justify-start">
                        <input
                          type={item?.inputType}
                          name={item?.label}
                          value={item?.value}
                        />
                        <label htmlFor={item?.label}>{item?.label}</label>
                      </div>
                    )}
                    {item?.options &&
                      item?.options?.map(
                        (option: OptionType, index: number) => (
                          <div
                            key={index}
                            className="flex items-center gap-3 justify-start"
                          >
                            <input
                              type={item?.inputType}
                              name={option?.label}
                              value={option?.value}
                            />

                            <label>{option?.label}</label>
                          </div>
                        )
                      )}
                  </motion.div>
                )}
                {/* select */}
                {item?.inputType === "select" && (
                  <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 1,
                      type: "spring",
                      stiffness: 300,
                      delay: 0.5,
                    }}
                    className="flex md:flex-row flex-col md:items-center md:gap-3 justify-start "
                  >
                    <label className="font-semibold text-black/70">
                      {item?.label}
                    </label>
                    <select className="border shadow-md bg-white/60 border-gray-300 rounded-md px-3 py-2">
                      {item?.options?.map(
                        (option: SelectOptionType, index: number) => (
                          <option key={index} value={option?.value}>
                            {option?.label || option?.text}
                          </option>
                        )
                      )}
                    </select>
                  </motion.div>
                )}
                {/* file */}
                {item?.inputType === "file" && (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 1,
                      type: "spring",
                      stiffness: 300,
                      delay: 0.5,
                    }}
                    className="flex md:flex-row flex-col md:items-center md:gap-3 justify-start"
                  >
                    <label
                      htmlFor="file"
                      className="font-semibold text-black/70"
                    >
                      {item?.label}
                    </label>
                    <input
                      id="file"
                      type={item?.inputType}
                      placeholder={item?.placeholder}
                      className="border  shadow-md bg-white/60 border-gray-300 rounded-md px-3 py-2"
                    />
                  </motion.div>
                )}
              </motion.div>
            ))}
            <motion.button
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                type: "spring",
                stiffness: 300,
                delay: 0.5,
              }}
              className="my-10  bg-cyan-500 px-8 py-2 rounded-lg text-white shadow-lg"
            >
              Submit
            </motion.button>
          </div>
        </div>
      </motion.main>
    </>
  );
};

export default FormCard;
