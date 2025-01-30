import mongoose from "mongoose";

export async function dbConnect() {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("Connected to db");
  } catch (error) {
    console.log("error connecting to db", error);
  }
}
