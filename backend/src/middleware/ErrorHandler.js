import ApiError from "../utils/ApiError.js";

export const errorHandler = ((err,req,res,next)=>{
  if (err.code === 11000) {
    return res.status(409).json({
      success: false,
      statusCode: 409,
      message: "An account with this email already exists.",
    });
  }
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong"
  const success = err.success !== undefined?err.success :false;

  res.status(statusCode).json({
    success:success,
    statusCode:statusCode,
    message:(statusCode<500)?message:"something went wrong"
  })
});