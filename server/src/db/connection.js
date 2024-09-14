import mongoose from "mongoose";

async function connection() {
  try {
    const connectionInstance = await mongoose.connect(
      "mongodb://localhost:27017",
    );
    console.log("Mongodb is connected successfully...");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    throw error;
  }
}


export default connection;
