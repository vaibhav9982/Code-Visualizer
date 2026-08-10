import User from "../models/user";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken";
import { asyncHandler } from "../utils/AsyncHandler";
import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new ApiError(400, "Please provide your name, email, and password.");
  }
  if (password.length < 8) {
    throw new ApiError(400, "Password must be at least 8 characters long.");
  }

  const hashed_password = await bcrypt.hash(password, 10);

  const newUser = await User.create({ name, email, password: hashed_password });

  generateToken(res, newUser._id);

  return res.status(200).json(new ApiResponse(200, "registration Succesfull"));
});
export const login = asyncHandler(async(req ,res) =>
{
  const {  email , password} = req.body;
  if(!email || !password)
    {
       throw new ApiError(400, "Please provide your  email and password.");
    } 
    const user = await User.findOne({email});
    if(!user)
    {
       throw new ApiError(401, "invalid  email or password.");
    }
    const ismatch = await bcrypt.compare(password , user.password);
    if(!ismatch)
    {
       throw new ApiError(401, "invalid  email or password.");
    }
    generateToken(res , user._id);
    return res.status(200).json(new ApiResponse(200, "login Succesfull")); 
 });