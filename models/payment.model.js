import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
    razorpayOrderId: { type: String, required: true }, // Razorpay-generated order ID
    razorpayPaymentId: { type: String }, // Assigned after successful payment
    razorpaySignature: { type: String }, // Used for verification
    amount: { type: Number, required: true }, // Payment amount
    currency: { type: String, default: "INR" }, // Currency type
    status: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    paymentMethod: { type: String }, // UPI, Card, Net Banking, etc.
    transactionId: { type: String }, // Bank/UPI transaction ID
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;