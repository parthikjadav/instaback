import { Catagory } from "../models/index.js";

const catagoryController = {
  getAllCatagories: async (req, res) => {
    try {
      const catagories = await Catagory.find();
      res.status(200).json(catagories);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getCatagoryById: async (req, res) => {
    try {
      const catagory = await Catagory.findById(req.params.id);
      res.status(200).json(catagory);
    } catch (error) {
      res
        .status(500)
        .json({ message: "cannot find catagory : " + error.message });
    }
  },
  createCatagory: async (req, res) => {
    try {
      const { name, slug } = req.body;
      if (!name || !slug) {
        return res.status(400).json({ message: "name and slug are required" });
      }
      const catagory = await Catagory.create({ name, slug });
      res.status(200).json(catagory);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  deleteCatagory: async (req, res) => {
    try {
      const { id } = req.params;
      const catagory = await Catagory.findByIdAndDelete(id);
      res.status(200).json(catagory);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  updateCatagory: async (req, res) => {
    try {
      const { id } = req.params;
      
      const catagory = await Catagory.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
      
      res.status(200).json({ catagory })
    } catch (error) {
      res.status(500)
        .json({ message: "cannot find catagory : " + error.message });
    }
  }
};

export default catagoryController;
