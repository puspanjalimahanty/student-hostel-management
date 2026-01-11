import Student from "../models/Student.js";
import Attendance from "../models/Attendance.js";

export const getDashboardStats = async (req, res) => {
  const today = new Date().toISOString().split("T")[0];

  const totalStudents = await Student.countDocuments();

  const todayAttendance = await Attendance.find({ date: today });

  const presentCount = todayAttendance.filter(
    (a) => a.status === "Present"
  ).length;

  const absentCount = todayAttendance.filter(
    (a) => a.status === "Absent"
  ).length;

  const attendancePercentage =
    totalStudents === 0
      ? 0
      : Math.round((presentCount / totalStudents) * 100);

  res.json({
    totalStudents,
    presentCount,
    absentCount,
    attendancePercentage
  });
};
