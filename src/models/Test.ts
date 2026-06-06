import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  answer: Number,
});

const TestSchema = new mongoose.Schema(
  {
    examId: String,
    title: String,
    duration: Number,
    questions: [QuestionSchema],
  },
  { timestamps: true }
);

export const Test =
  mongoose.models.Test || mongoose.model("Test", TestSchema);