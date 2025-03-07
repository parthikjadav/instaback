import { Cart, Order } from "../models/index.js";
import { instance } from "../lib/razorpay.js";
import crypto from "crypto";
import { env } from "../env/index.js";

const orderController = {
  getAllOrders: async (req, res) => {
    try {
      const orders = await Order.find().populate("userId").populate("products.productId")
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
  getOrderById: async (req, res) => {
    try {
      const order = await Order.findById(req.params.id).populate("userId").populate("products.productId");
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
  createOrder: async (req, res) => {
    try {
      const { userId, products, totalPrice, shippingAddress } =
        req.body;
      if (!userId || !products || !totalPrice || !shippingAddress) {
        return res.status(400).json({
          message: "Please provide all required fields",
        });
      }
      const order = await Order.create({
        userId,
        products,
        totalPrice,
        shippingAddress,
      });

      const razorpayOrder = await instance.orders.create({
        amount: totalPrice * 100,
        currency: "INR",
        receipt: order._id.toString(),
        payment_capture: 1,
      });

      order.razorpayOrderId = razorpayOrder.id;
      await order.save();

      res.status(201).json({ success: true, order, razorpayOrder });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
  webhookVarifyPayment: async (req, res) => {
    try {
      const secret = env.RAZORPAY_WEBHOOK_SECRET;
      const signature = req.headers["x-razorpay-signature"];
      const body = JSON.stringify(req.body);
      
      // 🔐 Step 1: Verify Razorpay Signature
      const expectedSignature = crypto
        .createHmac("sha256", secret)
        .update(body)
        .digest("hex");
       
      if (expectedSignature !== signature) {
        return res.status(400).json({ message: "Invalid Webhook Signature" });
      }

      const event = req.body;

      // ✅ Step 2: Update Order Status on Payment Success
      if (event.event === "payment.captured") {
        const payment = event.payload.payment.entity;
        const order = await Order.findOne({
          razorpayOrderId: payment.order_id,
        });
        
        if (order) {
          order.razorpayPaymentId = payment.id;
          order.razorpaySignature = signature;
          order.status = "completed"; // ✅ Mark order as completed
          await order.save();
        }
        return res.status(200).json({ message: "Webhook Received",order });
      }

      if (event.event === "payment.failed") {
        const payment = event.payload.payment.entity;
        const order = await Order.findOne({
          razorpayOrderId: payment.order_id,
        });

        if (order) {
          order.razorpayPaymentId = payment.id;
          order.razorpaySignature = signature;
          order.status = "failed"; // ✅ Mark order as failed
          await order.save();
        }
      }

      res.status(200).json({ success: true });
    } catch (error) {
      console.log("called webhook eerror",error.message);
      
      res.status(500).json({
        message: error.message,
      });
    }
  },
  deleteOrder: async (req, res) => {
    try {
      const { id } = req.params;
      const order = await Order.findByIdAndDelete(id);
      res.status(200).json({ success: true, order });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
};

export default orderController;
