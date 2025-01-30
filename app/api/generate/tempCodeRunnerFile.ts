import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { PrismaClient } from "@prisma/client";
import { currentUser } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  if (!process.env.GEMINI_API_KEY) {
    return NextResponse.json({ err: "API key is missing" }, { status: 400 });
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  try {
    const receivedForm = await req.json();
    const { formType, userId } = receivedForm;

    if (!formType || !userId) {
      throw new Error("formType and userId are required");
    }

    const prompt = `You are an expert form builder. So your task is to create a form which will be requested by
      the user to create. You are given a ${formType}. Generate a form in a json format which will look like this. 
     {
         "formTitle": "title of the form",
          "content": [
              {
                "inputType":"",
                "label":"",
                "placeholder":"",
                "required":"",
                "options":[]
              }
          ]
    }
      Remember options is an optional property.
      Content will store the input types and its label, so that i could display it in the UI.
   Make sure to generate the form with the same format for every form type.
      Do not generate any other content than the form.    
    `;

    const result = await model.generateContent(prompt);
    let form = result.response?.text();
    if (!form) {
      throw new Error("No response from model");
    }
    form = form
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
    let formJSON;
    try {
      formJSON = JSON.parse(form);
    } catch (err) {
      throw new Error("Failed to parse form JSON");
    }

    const newForm = await prisma.form.create({
      data: {
        form: formJSON!,
        userId: userId!,
      },
    });

    return NextResponse.json(newForm, {
      status: 200,
    });
  } catch (error) {
    console.log("Error generating content...", error);
    return NextResponse.json(
      { err: "Error generating the response..." },
      { status: 500 }
    );
  }
}
