import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { APIError } from "../utils/ApiError.js"; 

const authMiddleware = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) {
    throw new APIError(401, "Not authorized");
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
  req.user = { id: decoded.id };
  next();
});

export default authMiddleware;