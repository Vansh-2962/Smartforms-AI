"use client";
import React, { useState } from "react";
import Script from "next/script";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { toast } from "react-toastify";
import {
  BadgeIndianRupee,
  ChevronLeft,
  Loader2,
  Mail,
  UserRound,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { pricingDetails } from "@/lib/pricingDetails";
import { motion } from "framer-motion";

const paymentPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("INR");
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  const router = useRouter();

  // Fetching the plan from the url and displaying it on the page
  const { type } = useParams();

  // CREATING ORDER ID
  async function createOrder() {
    try {
      setLoading(true);
      const res = await axios.post("/api/orders", {
        amount: parseFloat(amount) * 100,
        currency: "INR",
        userId: user?.id,
      });
      console.log(res);
      return res?.data.paymentId;
    } catch (error) {
      console.log(error);
      toast.error("There was an error in creating order");
    } finally {
      setLoading(false);
    }
  }
  // PROCESSING THE PAYMENT
  async function processPayment(e: React.FormEvent) {
    e.preventDefault();
    try {
      const orderId = await createOrder();
      const options = {
        key: process.env.RAZORPAY_KEY_ID,
        amount: parseFloat(amount) * 100,
        name: "Payment",
        currency: currency,
        order_id: orderId,
        handler: async (response: any) => {
          const data = {
            orderCreationId: orderId,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };

          const result = await axios.post("/api/verify", data);
          console.log(result);

          if (result?.data?.success) {
            toast.success("Payment successful");
          } else {
            toast.error("Payment failed");
          }
        },
        prefill: {
          name: name,
          email: email,
        },
        theme: {
          color: "#fbbf24",
        },
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.on("payment.failed", function (response: any) {
        toast.error(response.error.description);
      });
      paymentObject.open();
      setAmount("");
      setName("");
      setEmail("");
    } catch (error) {
      console.log("Error in processing payment", error);
      toast.error("Error in processing the payment");
    }
  }

  // Getting the plan details in an array
  const planDetails = pricingDetails.find((plan) => plan.type === type);

  return (
    <>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      <motion.button
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        onClick={() => router.back()}
        className="flex items-center gap-3 cursor-pointer relative z-20 p-5"
      >
        <ChevronLeft size={15} /> Back
      </motion.button>
      <section className="relative z-20 min-h-[95vh] flex flex-col items-center justify-center">
        {/* plan details */}
        <motion.div
          initial={{ opacity: 0, scale: 0.1, rotateY: 180 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="flex md:flex-row flex-col md:my-0 my-10 items-center justify-center border gap-5 bg-white/20 shadow-lg rounded-2xl"
        >
          {planDetails && (
            <div className="flex flex-col items-start justify-between p-5 ">
              <h2 className="text-gray-700 font-medium text-lg px-2 ml-3">
                {planDetails?.type + "🔥"}
              </h2>
              <h1 className="px-1 mt-5 font-bold text-2xl text-gray-800 ml-3">
                {planDetails?.price}
              </h1>
              <div className="h-48">
                {planDetails?.features.map((feature, index) => (
                  <p className="text-sm px-3 space-y-1 mt-5" key={index}>
                    <span className="text-green-500 mr-3">✔</span> {feature}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* payment form */}
          <form
            className="flex flex-col gap-6 w-full sm:w-80 bg-gray-500/10 p-5 rounded-2xl"
            onSubmit={processPayment}
          >
            <h1 className="font-medium text-xl my-4 text-center">
              Proceed for Payment
            </h1>
            <div className="space-y-1">
              <Label className="flex items-center gap-1 text-gray-600">
                <UserRound size={18} /> Full name
              </Label>
              <Input
                type="text"
                required
                placeholder={user?.fullName!}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-white/60"
              />
            </div>
            <div className="space-y-1">
              <Label className="flex items-center gap-1 text-gray-600">
                <Mail size={18} />
                Email
              </Label>
              <Input
                type="email"
                placeholder={user?.emailAddresses[0].emailAddress!}
                required
                value={email}
                className="bg-white/60"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label className="flex items-center gap-1 text-gray-600">
                {" "}
                <BadgeIndianRupee size={18} /> Amount (in INR)
              </Label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  step="1"
                  min={5}
                  placeholder={planDetails?.price}
                  required
                  value={amount}
                  className="bg-white/60"
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>

            <Button type="submit" className="bg-cyan-500 hover:bg-cyan-600">
              {loading ? (
                <Loader2 className="mr-2 animate-spin" />
              ) : (
                <>
                  <BadgeIndianRupee /> Pay
                </>
              )}
            </Button>
          </form>
        </motion.div>
      </section>
    </>
  );
};

export default paymentPage;
