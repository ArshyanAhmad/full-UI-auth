import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.DATABASE_URI}/${DB_NAME}`
    );
    console.log(
      `Database connected successfully: `,
      connectionInstance.connection.host
    );
  } catch (error) {
    throw new Error("Database connection failed!", error);
  }
};

export { connectDB };
