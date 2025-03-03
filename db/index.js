import mongoose from "mongoose";

mongoose.set("strictQuery", false);
mongoose.connection.setMaxListeners(20);

const coonnectDB = async () => {
  try {
    await mongoose
      .connect(process.env.MONGODB_URI)
      .then(() => console.log("Connected to MongoDB"));
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

export default coonnectDB;
