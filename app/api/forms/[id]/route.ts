import { dbConnect } from "@/lib/dbConnect";
import Form from "@/models/form";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  try {
    await dbConnect();
    const form = await Form.findById(id);
    if (!form) {
      return NextResponse.json({ err: "Form not found" }, { status: 400 });
    }
    return NextResponse.json(form, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { err: "Something went wrong", error },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  try {
    await dbConnect();
    const form = await Form.findByIdAndDelete(id);
    if (!form) {
      return NextResponse.json({ err: "Form not found" }, { status: 400 });
    }
    return NextResponse.json(
      { msg: "Form deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { err: "Something went wrong", error },
      { status: 500 }
    );
  }
}
