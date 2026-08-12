import ApiResponse from "../utils/ApiResponse.js";

export const errorHandler = (err, req, res, next) => {
  if (err.name === "TokenExpiredError") {
    const statusCode = 401;
    return res
      .status(statusCode)
      .json(new ApiResponse(statusCode, "Your login session has expired."));
  }

  if (err.name === "JsonWebTokenError") {
    const statusCode = 401;
    return res
      .status(statusCode)
      .json(new ApiResponse(statusCode, "Authentication failed."));
  }

  if (err.name === "CastError") {
    const statusCode = 400;
    return res
      .status(statusCode)
      .json(new ApiResponse(statusCode, "Invalid ID structural format."));
  }

  if (err.code === 11000) {
    const statusCode = 409;
    return res
      .status(statusCode)
      .json(
        new ApiResponse(
          statusCode,
          "An account with this email already exists.",
        ),
      );
  }
  if (err.code === 11000) {
    const statusCode = 409;
    return res
      .status(statusCode)
      .json(
        new ApiResponse(
          statusCode,
          "An account with this email already exists.",
        ),
      );
  }

  const statusCode = err.statusCode || 500;
  const message =
    statusCode < 500
      ? err.message || "Something went wrong"
      : "Something went wrong.";

  return res.status(statusCode).json(new ApiResponse(statusCode, message));
};
