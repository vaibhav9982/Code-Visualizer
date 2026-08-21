import { Router } from "express";
import { login, logout, registerUser } from "../controllers/auth.controller.js";

const router = Router();

router.post("/login", login);
router.post("/register", registerUser);
router.post("/logout",logout);

export default router;
