import express from "express";
import { orderController } from "../controllers/index.js";
import { validateOrder } from "../validation/zod/index.js";
const router = express.Router();

router.get("/", orderController.getAllOrders);
router.get("/:id", orderController.getOrderById);
router.post("/", validateOrder, orderController.createOrder);
router.delete("/:id", orderController.deleteOrder);
router.post("/razorpay-webhook", orderController.webhookVarifyPayment);

export default router;
