import Project from "../models/project.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

export const createProject = asyncHandler(async (req, res) => {
  const { title, prompt, language, code } = req.body;

  if (!title || !prompt || !language || !code) {
    throw new ApiError(400, "Please Enter all the details");
  }

  // AI workkkk but what to do fro response language and other part visualization the react code AI will generate and i have to show it in frontend side
  const newProj = await Project.create({
    title,
    prompt,
    language,
    code,
    userId: req.user.id,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, "New Project created Successfully", newProj));
});

export const projects = asyncHandler(async (req, res) => {
  const projects = await Project.find({ userId: req.user.id });
  if (projects.length === 0) {
    return res
      .status(200)
      .json(new ApiResponse(200, "You havent created any project", projects));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "project fetched Successfully", projects));
});

export const specific_project = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const specific_project = await Project.findOne({
    _id: id,
    userId: userId,
  });
  if (!specific_project) {
    throw new ApiError(404, "Project not found.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "specific project fetched", specific_project));
});

export const edit_project = asyncHandler(async (req, res) => {
  const { title, prompt, language, code } = req.body;

  const updatedData = {};
  if (title !== undefined) updatedData.title = title;
  if (prompt !== undefined) updatedData.prompt = prompt;
  if (language !== undefined) updatedData.language = language;
  if (code !== undefined) updatedData.code = code;

  const updateData = await Project.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    { $set: updatedData },
    { returnDocument: "after", runValidators: true },
  );

  if (!updateData) {
    throw new ApiError(404, "Project not found.");
  }

  return res.status(200).json(new ApiResponse(200, "data uptaded", updateData));
});

export const del_project = asyncHandler(async (req, res) => {
  const {id} = req.params;
  const userId = req.user.id;

  const deleted_data = await Project.findOneAndDelete(
    {
      _id: id,
      userId: userId,
    },
    { returnDocument: "after" },
  );

  if(!deleted_data){
    throw new ApiError(404,"nodata deleted");
  }

  return res.status(200).json(new ApiResponse(200,"project deleted",deleted_data));

});