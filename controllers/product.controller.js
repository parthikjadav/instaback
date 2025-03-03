import { Product } from "../models/index.js";
import { ProductSchema } from "../validation/zod/schema.js";

const productController = {
  getAllProducts: async(req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  },
  getProductById: async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
  },
  createProduct: async(req, res) => {
    try {
      const validateProduct = ProductSchema.safeParse(req.body);
      if (!validateProduct.success) {
        return res
          .status(400)
          .json({ message: validateProduct.error.issues[0].message });
      }
      const {
        name,
        description,
        price,
        category,
        thumbnail,
        images,
        weight,
        mesurement,
        stock,
        status,
        brand,
      } = req.body;
      const product = await Product.create({
        name,
        description,
        price,
        category,
        thumbnail,
        images,
        weight,
        mesurement,
        stock,
        status,
        brand,
      });
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findByIdAndDelete(id);
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  updateProduct: async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id,req.body,{
            new: true,
            runValidators: true,
        });
        res.status(200).json({product});
    }catch(e){
        res.status(500).json({ message: e.message });
    }
  }
};

export default productController;
