import mongoose from "mongoose";

const attendanceSchema = mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true
    },
    date: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ["Present", "Absent"],
      default: "Present"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Attendance", attendanceSchema);
