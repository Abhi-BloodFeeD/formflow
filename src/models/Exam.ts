import mongoose from "mongoose";

const ExamSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    subjects: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export const Exam =
  mongoose.models.Exam || mongoose.model("Exam", ExamSchema);