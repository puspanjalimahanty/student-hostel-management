import express from "express";
import {
  markAttendance,
  getAttendanceByDate
} from "../controllers/attendanceController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect, adminOnly);

router.post("/", markAttendance);
router.get("/:date", getAttendanceByDate);

export default router;
