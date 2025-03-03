import express from "express";
import userRoute from './user.route.js';
import productRoute from './product.route.js';
const routes = express.Router();

routes.use("/user", userRoute)
routes.use("/product", productRoute)

export default routes;