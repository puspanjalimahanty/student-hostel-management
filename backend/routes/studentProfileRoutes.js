import express from "express";
import { getStudentProfile } from "../controllers/studentProfileController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/:id", protect, adminOnly, getStudentProfile);

export default router;
