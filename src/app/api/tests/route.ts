import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/db";
import { Test } from "../../../models/Test";

export async function GET(req: Request) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const examId = searchParams.get("examId");

  const query = examId ? { examId } : {};

  const tests = await Test.find(query);

  return NextResponse.json(tests);
}

export async function POST(req: Request) {
  await connectDB();

  const body = await req.json();

  const newTest = await Test.create({
    examId: body.examId,
    title: body.title,
    duration: body.duration,
    questions: body.questions,
  });

  return NextResponse.json(newTest);
}