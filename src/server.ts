import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import employeeRoutes from "./routes/employeeRoutes";
import { errorHandler, notFound } from "./middleware/errorMiddleware";
import cors from "cors";

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

dotenv.config();

connectDB();

const app = express();

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/employee", employeeRoutes);

app.use(errorHandler);

app.use(notFound);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`App Running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
