import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import { Admin } from "@/models/Admin";

export async function GET() {
  await connectDB();

  const existing = await Admin.findOne({
    email: "admin@aim.com",
  });

  if (existing) {
    return NextResponse.json({ message: "Admin already exists" });
  }

  const hashedPassword = await bcrypt.hash("admin123", 10);

  await Admin.create({
    email: "admin@aim.com",
    password: hashedPassword,
  });

  return NextResponse.json({
    message: "Admin created",
    email: "admin@aim.com",
    password: "admin123",
  });
}