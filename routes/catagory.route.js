import express from "express";
import { catagoryController } from "../controllers/index.js";

const route = express.Router();

route.get("/",catagoryController.getAllCatagories);
route.get("/:id",catagoryController.getCatagoryById);
route.post("/",catagoryController.createCatagory);
route.delete("/:id",catagoryController.deleteCatagory);
route.put("/:id",catagoryController.updateCatagory);

export default route;