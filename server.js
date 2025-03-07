import express from "express";
import cors from "cors";
import http from "http"; // Import only http
import { Server } from "socket.io"; // Import Server from socket.io
import { configDotenv } from "dotenv";
import coonnectDB from "./db/index.js";
import Router from "./routes/index.js";
import cookieParser from "cookie-parser";

configDotenv();

const app = express();
const server = http.createServer(app);

// Access cookies
app.use(cookieParser());

// Parse JSON data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Allow credentials
app.use(cors({
  credentials: true,
}));

// Use router 
app.use("/v1", Router);

coonnectDB();

app.get("/", async (req, res) => {
  res.json("success");
});

server.listen(3000, () => {
  console.log("server is running on http://localhost:3000");
});
