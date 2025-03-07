import Cart from "../models/cart.model.js";

const cartController = {
  addToCart: async (req, res) => {
    try {
      const { userId, productId, quantity } = req.body;
      if (!userId || !productId || !quantity) {
        return res.status(400).json({ message: "Please provide all fields" });
      }

      let cart = await Cart.findOne({ userId });

      if (!cart) {
        cart = await Cart.create({
          userId,
          items: [{ productId, quantity }],
        });
      } else {
        const existingItem = cart.items.find(
          (item) => item.productId.toString() === productId
        );

        if (existingItem) {
          existingItem.quantity += quantity;
        } else {
          cart.items.push({ productId, quantity });
        }

        await cart.save();
      }

      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getCart: async (req, res) => {
    try {
      const { userId } = req.params;
      const cart = await Cart.findOne({ userId }).populate("items.productId");
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateCartItem: async (req, res) => {
    try {
      const { userId, productId, quantity } = req.body;

      const cart = await Cart.findOne({ userId });

      if (!cart) return res.status(400).json({ message: "Cart not found" });

      const item = cart.items.find(
        (item) => item.productId.toString() === productId
      );

      if (!item) return res.status(400).json({ message: "Item not in cart" });

      if (quantity <= 0) {
        cart.items = cart.items.filter(
          (item) => item.productId.toString() !== productId
        );
      } else {
        item.quantity = quantity;
      }

      await cart.save();
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  removeCartItem: async (req, res) => {
    try {
      const { userId, productId } = req.body;

      const cart = await Cart.findOne({ userId });

      if (!cart) return res.status(400).json({ message: "Cart not found" });

      cart.items = cart.items.filter(
        (item) => item.productId.toString() !== productId
      );

      await cart.save();
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  clearCart: async (req, res) => {
    try {
      const { userId } = req.params;
      await Cart.findOneAndDelete({ userId });
      res.status(200).json({ message: "Cart cleared" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

export default cartController;
