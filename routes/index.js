import express from "express";
import userRoute from './user.route.js';
import productRoute from './product.route.js';
import catagoryRoute from './catagory.route.js';
import orderRoute from './order.route.js';
import cartRoute from './cart.route.js';
const routes = express.Router();

routes.use("/user", userRoute)
routes.use("/catagory", catagoryRoute)
routes.use("/order", orderRoute)
routes.use("/product", productRoute)
routes.use("/cart", cartRoute)

export default routes;