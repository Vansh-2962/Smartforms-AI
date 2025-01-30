import { dbConnect } from "@/lib/dbConnect";
import Form from "@/models/form";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const forms = await Form.find({});
    if (!forms) {
      return NextResponse.json({ err: "No forms found" }, { status: 400 });
    }
    return NextResponse.json(forms, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { err: "Something went wrong", error },
      { status: 500 }
    );
  }
}
