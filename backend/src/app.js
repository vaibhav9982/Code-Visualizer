
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import indexRoutes from "./routes/index.routes.js";
import ApiError from "./utils/ApiError.js";
import { errorHandler } from "./middleware/ErrorHandler.js";
import { connectDb } from "./config/db.js";


const app = express();
await connectDb();
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/v1",indexRoutes);


app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Code Visualizer Backend API is running ",
  });
});

app.use(errorHandler);

export default app;