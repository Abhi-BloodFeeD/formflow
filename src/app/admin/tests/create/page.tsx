"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useExamStore } from "../../../../store/useFormStore";

type Question = {
  question: string;
  options: string[];
  answer: number;
};

export default function CreateTestPage() {
  const router = useRouter();
  const { selectedExam } = useExamStore();

  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState(60);

  const [jsonInput, setJsonInput] = useState("");
  const [error, setError] = useState("");

  if (!selectedExam) {
    router.push("/admin");
    return null;
  }

  const handleSubmit = async () => {
  setError("");

  try {
    const questions = JSON.parse(jsonInput);

    const payload = {
      examId: selectedExam.id,
      title,
      duration,
      questions,
    };

    const res = await fetch("/api/tests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error("Failed to create test");

    alert("Test created successfully");

    router.push("/admin/tests");
  } catch (err: any) {
    setError(err.message);
  }
};

  return (
    <div style={{ padding: "20px" }}>
      <h1>Create Test</h1>

      <h3>Exam: {selectedExam.name}</h3>

      <div style={{ marginTop: "20px" }}>
        <input
          placeholder="Test Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ display: "block", marginBottom: "10px", padding: "8px" }}
        />

        <input
          type="number"
          placeholder="Duration (minutes)"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          style={{ display: "block", marginBottom: "10px", padding: "8px" }}
        />

        <textarea
          placeholder='Enter questions JSON e.g. [{"question":"2+2?","options":["2","3","4","5"],"answer":2}]'
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          rows={10}
          style={{ width: "100%", padding: "10px" }}
        />

        {error && (
          <p style={{ color: "red" }}>
            {error}
          </p>
        )}

        <button onClick={handleSubmit} style={{ marginTop: "10px" }}>
          Create Test
        </button>
      </div>
    </div>
  );
}