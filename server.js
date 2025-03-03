import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import coonnectDB from "./db/index.js";
import { Order, Catagory, Product, User } from "./models/index.js";
import Router from "./routes/index.js";
import cookieParser from "cookie-parser";

configDotenv();
const app = express();

// access cookies
app.use(cookieParser());

// parse data to json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// allow crediencials 
app.use(cors({
  credentials: true,
}));


// use router 
app.use("/v1",Router)

coonnectDB();


app.get("/", async (req, res) => {
//   const users = await User.find();
//   const orders = await Order.find();
//   const catagorys = await Catagory.find();
//   const products = await Product.find();
  res.json("success");
});

app.listen(3000, () => {
  console.log("server is running on http://localhost:3000");
});
