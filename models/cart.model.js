import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [itemSchema],
    totalPrice: {
      type: Number,
      required: true,
    },
    totalQuantity: {
      type: Number,
      required: true,
    }, // sum of all ordered items in the cart
    status: {
      type: String,
      enum: ["active", "ordered"],
      default: "active",
    },
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
