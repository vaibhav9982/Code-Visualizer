import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";


const authMiddleware = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) {
    throw new ApiError(401, "Not authorized");
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
  req.user = { id: decoded.id };
  next();
});

export default authMiddleware;