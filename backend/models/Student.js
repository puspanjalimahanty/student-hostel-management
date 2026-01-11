import mongoose from "mongoose";

const studentSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rollNo: { type: String, required: true, unique: true },
    department: { type: String, required: true },
    year: { type: Number, required: true }
  },
  { timestamps: true }
);

export default mongoose.model("Student", studentSchema);
