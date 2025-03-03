import mongoose, { Schema } from "mongoose";

const OrderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "UserSchema",
      required: true,
    },
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "ProductSchema",
        },
        quantity: Number,
      },
    ],
    totalPrice: { type: Number, required: true },
    razorpayPaymentId: String,
    razorpayOrderId: String,
    address: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "completed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("OrderSchema", OrderSchema);

export default Order;