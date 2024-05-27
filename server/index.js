import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/connectDB.js";
import router from "./routes/index.js";
import cookieParser from "cookie-parser";
import { app, server } from "./socket/index.js";

// const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 8080;

app.get("/", (request, response) => {
  response.json({
    message: `Server Running at ${PORT}`,
  });
});

//api endpoints
app.use("/api", router);

connectDB().then(() => {
  server.listen(PORT, () => console.log(`server running at ${PORT}`));
});
