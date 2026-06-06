"use client";

import { useExamStore } from "../../store/useExamStore";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();

  const { exams, selectedExam, setSelectedExam } =
    useExamStore();

  const handleExamChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const examId = e.target.value;

    const exam =
      exams.find((ex) => ex.id === examId) || null;

    setSelectedExam(exam);
  };

  const handleGoToTests = () => {
    if (!selectedExam) {
      alert("Please select an exam first");
      return;
    }

    router.push("/admin/tests");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Dashboard</h1>

      <div style={{ marginTop: "20px" }}>
        <label>Select Exam: </label>

        <select
          value={selectedExam?.id || ""}
          onChange={handleExamChange}
          style={{ marginLeft: "10px", padding: "5px" }}
        >
          <option value="">-- Select Exam --</option>

          {exams.map((exam) => (
            <option key={exam.id} value={exam.id}>
              {exam.name}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginTop: "20px" }}>
        <button onClick={handleGoToTests}>
          Go to Test Management
        </button>
      </div>
    </div>
  );
}