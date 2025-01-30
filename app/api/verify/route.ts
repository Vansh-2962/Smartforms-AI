import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const generatedSignature = (
  razorpayOrderId: string,
  razorpayPaymentId: string
) => {
  const key = process.env.RAZORPAY_KEY_SECRET;
  if (!key) {
    throw new Error("Razorpay key is missing");
  }

  const sig = crypto
    .createHmac("sha256", key)
    .update(razorpayOrderId + "|" + razorpayPaymentId)
    .digest("hex");
  return sig;
};

export async function POST(request: NextRequest) {
  const {
    orderCreationId,
    razorpayPaymentId,
    razorpaySignature,
  } = await request.json();

  const signature = generatedSignature(orderCreationId, razorpayPaymentId);
  if (signature !== razorpaySignature) {
    return NextResponse.json(
      { message: "payment verification failed", success: false },
      { status: 400 }
    );
  }
  return NextResponse.json(
    { message: "payment verified successfully", success: true },
    { status: 200 }
  );
}
