import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";

const prisma = new PrismaClient();
const signing_secret = process.env.SIGNINNG_SECRET;

export async function POST(req: NextRequest) {
  if (!signing_secret) {
    return NextResponse.json(
      { error: "Missing signing secret" },
      { status: 400 }
    );
  }

  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return NextResponse.json(
      { error: "Missing svix headers" },
      { status: 400 }
    );
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(signing_secret);

  let event: WebhookEvent;

  try {
    event = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (error) {
    console.log("Error verifying webhook : ", error);
    return NextResponse.json(
      { error: "Error verifying webhook" },
      { status: 400 }
    );
  }

  const { id } = event.data;
  const eventType = event.type;

  if (eventType === "user.created") {
    try {
      const { first_name, last_name, email_addresses, image_url } = event.data;
      const fullname = `${first_name} ${last_name}`.trim();
      const primaryEmail = email_addresses[0].email_address;

      const newUser = await prisma.user.create({
        data: {
          clerkId: id!,
          name: fullname,
          email: primaryEmail,
          profilePic: image_url,
        },
      });

      return NextResponse.json(
        { msg: "Webhook processed successfully", newUser },
        { status: 200 }
      );
    } catch (error) {
      console.log("Error creating user : ", error);
      return NextResponse.json(
        { error: "Error creating user" },
        { status: 400 }
      );
    }
  }
}
