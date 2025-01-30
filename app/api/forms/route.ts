import { dbConnect } from "@/lib/dbConnect";
import Form from "@/models/form";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const forms = await Form.find({});
    if (!forms) {
      return NextResponse.json({ err: "No forms found" }, { status: 400 });
    }
    return NextResponse.json(forms, { status: 200 });
  } catch (error) {}
}
