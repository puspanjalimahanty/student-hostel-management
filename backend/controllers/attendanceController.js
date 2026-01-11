import Attendance from "../models/Attendance.js";

export const markAttendance = async (req, res) => {
  const { student, date, status } = req.body;

  // check if already marked
  const existing = await Attendance.findOne({ student, date });

  if (existing) {
    existing.status = status;
    await existing.save();
    return res.json(existing);
  }

  const attendance = await Attendance.create({
    student,
    date,
    status
  });

  res.status(201).json(attendance);
};

export const getAttendanceByDate = async (req, res) => {
  const attendance = await Attendance.find({ date: req.params.date })
    .populate("student");
  res.json(attendance);
};
