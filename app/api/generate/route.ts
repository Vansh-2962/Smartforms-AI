import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { dbConnect } from "@/lib/dbConnect";
import Form from "@/models/form";

const getPrompt = (formType: string) => `
  You are an expert form builder. So your task is to create a form which will be requested by
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

const parseFormResponse = (response: string) => {
  const cleanedResponse = response
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  try {
    return JSON.parse(cleanedResponse);
  } catch {
    throw new Error("Failed to parse form JSON");
  }
};

export async function POST(req: NextRequest) {
  if (!process.env.GEMINI_API_KEY) {
    return NextResponse.json({ err: "API key is missing" }, { status: 400 });
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const { formType, userId } = await req.json();

  if (!formType || !userId) {
    throw new Error("formType and userId are required");
  }

  const prompt = getPrompt(formType);
  const result = await model.generateContent(prompt);
  const formResponse = result.response?.text();

  if (!formResponse) {
    throw new Error("No response from model");
  }

  console.log(formResponse);

  const formJSON = parseFormResponse(formResponse);
  console.log(
    "formJSON.content (expanded):",
    JSON.stringify(formJSON.content, null, 2)
  );

  let newForm;
  try {
    await dbConnect();
    newForm = await Form.create({
      formTitle: formJSON.formTitle,
      content: formJSON.content,
      userId: userId,
    });
    console.log("New form : ", newForm);
  } catch (error) {
    console.log("Error creating a form", error);
  }
  return NextResponse.json(newForm, { status: 200 });
}
