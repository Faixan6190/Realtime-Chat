import mongoose from "mongoose";

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("Connected to DB");
    });
    connection.on("error", () => {
      console.log("Something is wrong in mongodb", error.message);
    });
  } catch (error) {
    console.log("something is wrong", error.message);
  }
}

export default connectDB;
