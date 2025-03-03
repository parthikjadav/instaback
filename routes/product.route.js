import express from "express";
import { productController } from "../controllers/index.js";
import { validateProduct } from "../validation/zod/index.js";
const router = express.Router();

router.get("/",productController.getAllProducts);
router.get("/:id",productController.getProductById);
router.post("/add",validateProduct,productController.createProduct);
router.post("/update/:id",productController.updateProduct);
router.delete("/delete/:id",productController.deleteProduct);

export default router;