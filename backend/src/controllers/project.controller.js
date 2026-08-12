import Project from "../models/project.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";


export const createProject = asyncHandler(async (req,res)=>{
    const  {title,prompt,language,code} = req.body;

    if(!title || !prompt || !language || !code){
        throw new ApiError(400,"Please Enter all the details");
    }

    // AI workkkk but what to do fro response language and other part visualization the react code AI will generate and i have to show it in frontend side
    const newProj = await Project.create({title,prompt,language,code,userId:req.user.id});

    return res.status(201).json(new ApiResponse(201,"New Project created Successfully",newProj));

});