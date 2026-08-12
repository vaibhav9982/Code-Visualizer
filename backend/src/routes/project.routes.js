import { Router } from "express";
import { createProject } from "../controllers/project.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

router.post("/Projects",authMiddleware,createProject);
export default router;