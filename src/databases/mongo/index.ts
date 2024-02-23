import { connect } from "mongoose";

const MONGODB_URI: string = process.env.MONGODB_URI || "mongodb://localhost:27017/mydb";

const connectDB = async () => {
  try {
    await connect(MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
};

export { connectDB };
