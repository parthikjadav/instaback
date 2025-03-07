import mongoose from "mongoose";
import { env } from "../env/index.js";

mongoose.set("strictQuery", false);
mongoose.connection.setMaxListeners(20);

const coonnectDB = async () => {
  try {
    await mongoose
      .connect(env.MONGODB_URI)
      .then(() => console.log("Connected to MongoDB"));
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

export default coonnectDB;
