"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { useUser } from "@clerk/nextjs";

type Props = {
  type: string;
  price: string;
  features: string[];
};

const PricingCard = ({ price }: { price: Props }) => {
  const [plan, setPlan] = useState("");
  const { user } = useUser();

  return (
    <div
      className={`transform bg-white/30 ring-1 ring-white/70 rounded-md p-4 transition-transform duration-300 ease-in-out hover:scale-105`}
    >
      <h2 className="text-gray-700 font-medium px-2">
        {price?.type === "Pro" ? `${price?.type} 🔥` : price?.type}
      </h2>

      <h1 className="px-1 mt-5 font-bold text-2xl text-gray-800">
        {price?.price}
      </h1>
      <div className="h-48">
        {price?.features.map((feature, index) => (
          <p className="text-sm px-3 space-y-1 mt-5" key={index}>
            <span className="text-green-500 mr-3">✔</span> {feature}
          </p>
        ))}
      </div>
      <Dialog>
        <DialogTrigger className="mt-10 bg-gradient-to-r from-white/30 via-cyan-100 to-white/30 text-gray-800 font-medium w-full py-2 rounded-lg mb-3 shadow-sm hover:scale-y-105 transition-transform ease-in-out duration-200">
          {price?.type === "Free" ? (
            <>
              <Link href={`/dashboard/forms`}>Get Started</Link>
            </>
          ) : (
            <>
              <Link href={`/dashboard/payment/${price?.type}`}>
                Get Started
              </Link>
            </>
          )}
        </DialogTrigger>
        {/* <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {plan === "Free"
                ? "This is a free plan"
                : plan === "Basic"
                ? "This is a basic plan"
                : "This is a pro plan"}
            </DialogTitle>
            <DialogDescription>
              {plan === "Free"
                ? "You can create upto 3 forms per month, upgrade to a paid plan to create unlimited forms. Want to continue ?"
                : plan === "Basic"
                ? "You can create upto 10 forms per month, upgrade to pro plan to create unlimited forms. Want to continue ?"
                : "You can create unlimited forms, Want to continue ?"}
            </DialogDescription>
          </DialogHeader>
          <Link href={""}>
            <button className="bg-cyan-500 px-5 py-2 rounded-md mt-3 text-white">
              Continue
            </button>
          </Link>
        </DialogContent> */}
      </Dialog>
    </div>
  );
};

export default PricingCard;
