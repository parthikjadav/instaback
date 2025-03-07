import mongoose, { Schema } from "mongoose";

const OrderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },
        name: String,
        price: Number,
        quantity: Number,
      },
    ],
    totalPrice: { type: Number, required: true },
    razorpayPaymentId: String,
    razorpayOrderId: String,
    razorpaySignature: String,
    shippingAddress:  {
      street: { type: String, required: true },
      city: { type: String, required: true },
      zip: { type: Number, required: true },
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);

export default Order;