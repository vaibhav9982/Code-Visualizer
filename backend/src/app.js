import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import indexRoutes from "./routes/index.routes.js";
import ApiError from "./utils/ApiError.js";

const app = express();

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

app.use((err,req,res,next)=>{
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong"
  const success = err.success !== undefined?err.success :false;


  res.status(statusCode).json({
    success:success,
    statusCode:statusCode,
    message:message
  })
});

export default app;