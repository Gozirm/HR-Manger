import mongoose from "mongoose";
export const connect = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      dbName: "hr-manager",
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
