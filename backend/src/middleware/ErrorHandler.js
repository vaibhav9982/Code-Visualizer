import ApiError from "../utils/ApiError.js";

export const errorHandler = ((err,req,res,next)=>{
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong"
  const success = err.success !== undefined?err.success :false;


  res.status(statusCode).json({
    success:success,
    statusCode:statusCode,
    message:message
  })
});