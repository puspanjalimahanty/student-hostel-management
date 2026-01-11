import express from "express";
import { registerAdmin, loginUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginUser);

export default router;
