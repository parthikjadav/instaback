import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  slug:{
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  images: [
    {
      type: String,
    },
  ],
  weight: {
    type: String,
  },
  mesurement: {
    type: String,
  },
  brand: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
});

const Product = mongoose.model("Product", ProductSchema);

export default Product;
