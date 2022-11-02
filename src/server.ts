import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";

dotenv.config();

connectDB();

const app = express();

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`App Running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
