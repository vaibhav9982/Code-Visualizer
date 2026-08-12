import { Router } from "express";
import { createProject, edit_project, projects, specific_project } from "../controllers/project.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

router.post("/Projects",authMiddleware,createProject);
router.get("/MyProjects",authMiddleware,projects);
router.get("/MyProjects/:id",authMiddleware,specific_project);
router.patch("/MyProjects/:id",authMiddleware,edit_project);
export default router;