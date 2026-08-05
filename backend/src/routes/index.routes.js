import { Router } from "express";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).json(new ApiResponse(200, "welcome to code visualization"));
});


// testing the APIErorr working flow (ALL OK!)
router.get("/user", (req, res, next) => {
  try {
    const d = false;
    if (!d) {
      throw new ApiError(401, "please login");
    }
  } catch (err) {
    next(err);
  }
});

export default router;
