import mongoose, { Schema } from "mongoose";

const CatagorySchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true },
  },
  { timestamps: true }
);

const Catagory = mongoose.model("CatagorySchema", CatagorySchema);

export default Catagory;
