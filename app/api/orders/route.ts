import Razorpay from "razorpay";
import { NextResponse, NextRequest } from "next/server";
import Payment from "@/models/payment";
import { dbConnect } from "@/lib/dbConnect";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID as string,
  key_secret: process.env.RAZORPAY_KEY_SECRET as string,
});

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    if (!razorpay) {
      return NextResponse.json(
        {
          err: "Razorpay is not initialized | Check your razorpay id and secret",
        },
        { status: 400 }
      );
    }

    const {
      amount,
      currency,
      userId,
    }: { amount: string; currency: string; userId: string } = await req.json();

    if (!amount || !currency || !userId) {
      return NextResponse.json(
        { msg: "All fields are required" },
        { status: 400 }
      );
    }

    const options = {
      amount: amount,
      currency: currency,
      receipt: `${Date.now()}-receipt`,
    };

    const orders = await razorpay.orders.create(options);
    if (!orders) {
      return NextResponse.json({ msg: "Order not created" }, { status: 400 });
    }
    console.log(orders);
    const order = new Payment({
      userId: userId,
      amount: orders.amount,
      paymentId: orders.id,
      status: orders.status,
      currency: orders.currency,
    });
    await order.save();
    if (!order) {
      return NextResponse.json(
        { msg: "Order not stored in DB" },
        { status: 200 }
      );
    }
    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { err: "Something went wrong", error },
      { status: 500 }
    );
  }
}
