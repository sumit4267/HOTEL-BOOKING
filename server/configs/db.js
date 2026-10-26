
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "HOTEL-BOOKING",
    });

    console.log("Database connected");
    console.log("Database:", mongoose.connection.name);
  } catch (error) {
    console.error("Database connection error:", error.message);
  }
};

export default connectDB;
