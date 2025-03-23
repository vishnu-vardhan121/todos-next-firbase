import mongoose from "mongoose";

export const connectionDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    console.log("db alreay connected");
    return;
  }
  try {
    await mongoose.connect(
      "mongodb+srv://kottevishnuvardhann:SOaHjuxSSR7zjdjR@cluster0.3acxr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
      {
        dbName: "next",
      }
    );
    console.log("DB connected");
  } catch (err) {
    console.error("MongoDB connection error", err);
  }
};
