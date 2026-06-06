"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Question = {
  question: string;
  options: string[];
  answer: number;
};

type Test = {
  id: string;
  title: string;
  duration: number;
  questions: Question[];
};

export default function TestDetailPage({
  params,
}: {
  params: { testId: string };
}) {
  const router = useRouter();

  const [test, setTest] = useState<Test | null>(null);

  // MOCK FETCH (replace with API later)
  useEffect(() => {
    const mockTest: Test = {
      id: params.testId,
      title: "Sample Test " + params.testId,
      duration: 60,
      questions: [
        {
          question: "What is 2 + 2?",
          options: ["1", "2", "3", "4"],
          answer: 3,
        },
        {
          question: "Capital of India?",
          options: ["Mumbai", "Delhi", "Kolkata", "Chennai"],
          answer: 1,
        },
      ],
    };

    setTest(mockTest);
  }, [params.testId]);

  const handleDeleteQuestion = (index: number) => {
    if (!test) return;

    const updated = {
      ...test,
      questions: test.questions.filter((_, i) => i !== index),
    };

    setTest(updated);
  };

  const handleEditQuestion = (index: number) => {
    alert("Edit UI coming next (we will build modal editor)");
  };

  if (!test) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Test Details</h1>

      <h2>{test.title}</h2>
      <p>Duration: {test.duration} minutes</p>

      <button onClick={() => router.push("/admin/tests")}>
        Back
      </button>

      <hr style={{ margin: "20px 0" }} />

      <h3>Questions</h3>

      {test.questions.map((q, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <p>
            <b>Q{index + 1}:</b> {q.question}
          </p>

          <ul>
            {q.options.map((opt, i) => (
              <li
                key={i}
                style={{
                  color: i === q.answer ? "green" : "black",
                  fontWeight: i === q.answer ? "bold" : "normal",
                }}
              >
                {opt}
              </li>
            ))}
          </ul>

          <button onClick={() => handleEditQuestion(index)}>
            Edit
          </button>

          <button
            onClick={() => handleDeleteQuestion(index)}
            style={{ marginLeft: "10px", color: "red" }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}