import Student from "../models/Student.js";
import Attendance from "../models/Attendance.js";

export const getStudentProfile = async (req, res) => {
  const studentId = req.params.id;

  const student = await Student.findById(studentId);
  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  const attendanceRecords = await Attendance.find({ student: studentId });

  const totalDays = attendanceRecords.length;
  const presentDays = attendanceRecords.filter(
    (a) => a.status === "Present"
  ).length;

  const attendancePercentage =
    totalDays === 0 ? 0 : Math.round((presentDays / totalDays) * 100);

  const status = attendancePercentage < 75 ? "Defaulter" : "Regular";

  res.json({
    student,
    attendancePercentage,
    status,
    attendanceRecords
  });
};
