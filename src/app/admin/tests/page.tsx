"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useExamStore } from "../../../store/useExamStore"
// /store/useExamStore";

type Test = {
  id: string;
  title: string;
  duration: number;
};

export default function AdminTestsPage() {
  const router = useRouter();
  const { selectedExam } = useExamStore();

  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedExam) {
      router.push("/admin");
      return;
    }

    const fetchTests = async () => {
      setLoading(true);

      try {
        const res = await fetch(
          `/api/tests?examId=${selectedExam.id}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch tests");
        }

        const data = await res.json();
        setTests(data);
      } catch (err) {
        console.error("Error fetching tests:", err);
        setTests([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, [selectedExam, router]);

  const handleCreateTest = () => {
    router.push("/admin/tests/create");
  };

  const handleOpenTest = (testId: string) => {
    router.push(`/admin/tests/${testId}`);
  };

  if (!selectedExam) return null;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Test Management</h1>

      <h3>
        Exam:{" "}
        <span style={{ color: "green" }}>
          {selectedExam.name}
        </span>
      </h3>

      <button
        onClick={handleCreateTest}
        style={{
          marginTop: "10px",
          padding: "8px 12px",
          cursor: "pointer",
        }}
      >
        + Create New Test
      </button>

      <hr style={{ margin: "20px 0" }} />

      {loading ? (
        <p>Loading tests...</p>
      ) : tests.length === 0 ? (
        <p>No tests found for this exam.</p>
      ) : (
        tests.map((test) => (
          <div
            key={test.id}
            onClick={() => handleOpenTest(test.id)}
            style={{
              border: "1px solid #ddd",
              padding: "12px",
              marginBottom: "10px",
              borderRadius: "6px",
              cursor: "pointer",
              transition: "0.2s",
            }}
          >
            <h3 style={{ margin: "0 0 5px 0" }}>
              {test.title}
            </h3>

            <p style={{ margin: 0 }}>
              Duration: {test.duration} minutes
            </p>
          </div>
        ))
      )}
    </div>
  );
}