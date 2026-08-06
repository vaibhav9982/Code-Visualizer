import { Router } from "express";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).json(new ApiResponse(200, "welcome to code visualization"));
});

// testing the APIErorr working flow (ALL OK!)
router.get(
  "/user",
  asyncHandler(async (req, res, next) => {
    const d = false;
    if (!d) {
      throw new ApiError(401, "please login");
    }
  }),
);

export default router;
