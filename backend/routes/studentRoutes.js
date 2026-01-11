import express from "express";
import {
  addStudent,
  getStudents,
  updateStudent,
  deleteStudent
} from "../controllers/studentController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect, adminOnly);

router.route("/")
  .post(addStudent)
  .get(getStudents);

router.route("/:id")
  .put(updateStudent)
  .delete(deleteStudent);

export default router;
