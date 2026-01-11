import Student from "../models/Student.js";

// Add student
export const addStudent = async (req, res) => {
  const student = await Student.create(req.body);
  res.status(201).json(student);
};

// Get all students
export const getStudents = async (req, res) => {
  const students = await Student.find();
  res.json(students);
};

// Update student
export const updateStudent = async (req, res) => {
  const student = await Student.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(student);
};

// Delete student
export const deleteStudent = async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: "Student deleted" });
};
