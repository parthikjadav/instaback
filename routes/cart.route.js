import express from "express";
import cartController from "../controllers/cart.controller.js";
const router = express.Router();

router.get("/", cartController.getCart);
router.post("/", cartController.addToCart);
router.delete("/:id", cartController.removeCartItem);
router.patch("/:id", cartController.updateCartItem);
router.delete("/", cartController.clearCart);

export default router;
