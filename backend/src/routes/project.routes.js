import { Router } from "express";
import { createProject, projects } from "../controllers/project.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

router.post("/Projects",authMiddleware,createProject);
router.get("/MyProjects",authMiddleware,projects);
export default router;