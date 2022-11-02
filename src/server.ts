import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import userRoutes from "./routes/userRoutes";
import { errorHandler, notFound } from "./middleware/errorMiddleware";

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use("/api/users", userRoutes);

app.use(errorHandler);

app.use(notFound);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`App Running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
