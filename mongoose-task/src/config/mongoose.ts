import mongoose from "mongoose";
import env from "./env";

const connectMongooDb = async () => {
  try {
    await mongoose.connect(env.mongo_uri as string);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  }
};

export { connectMongooDb };
