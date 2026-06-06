// src/app/upload/page.tsx

"use client";

import { useRouter } from "next/navigation";

import UploadBox from "@/components/UploadBox";
import SidebarAds from "@/components/SidebarAds";

import { useFormStore } from "@/store/useFormStore";

import {
  ALL_EXAMS,
  getExamById,
} from "@/data/exams";

export default function UploadPage() {

  const router = useRouter();

  const {
    photo,
    signature,

    setPhoto,
    setSignature,

    selectedExam,
    setSelectedExam,
  } = useFormStore();

  const handleContinue = () => {

    if (!selectedExam) {
      alert("Please select an exam.");
      return;
    }

    if (!photo) {
      alert("Please upload photo.");
      return;
    }

    if (!signature) {
      alert("Please upload signature.");
      return;
    }

    router.push("/processing");
  };

  return (
    <div className="min-h-screen flex">

      {/* Main Content */}

      <div className="flex-1 p-8">

        <h1 className="text-3xl font-bold mb-8">
          Upload Documents
        </h1>

        {/* Exam Selection */}

        <div className="mb-8">

          <label className="block mb-2 font-semibold">
            Select Exam
          </label>

          <select
            className="
              border
              rounded
              p-3
              w-full
              max-w-md
            "
            value={selectedExam?.id || ""}
            onChange={(e) => {

              const exam =
                getExamById(
                  e.target.value
                );

              if (exam) {
                setSelectedExam(exam);
              }

            }}
          >
            <option value="">
              Select Exam
            </option>

            {ALL_EXAMS.map((exam) => (
              <option
                key={exam.id}
                value={exam.id}
              >
                {exam.name}
              </option>
            ))}
          </select>

        </div>

        {/* Upload Photo */}

        <div className="mb-8">

          <UploadBox
            label="Upload Photo"
            storageKey="candidate-photo"
            onFileSelect={
              setPhoto
            }
          />

        </div>

        {/* Upload Signature */}

        <div className="mb-8">

          <UploadBox
            label="Upload Signature"
            storageKey="candidate-signature"
            onFileSelect={
              setSignature
            }
          />

        </div>

        {/* Status */}

        <div className="mb-8">

          <div className="bg-gray-100 p-4 rounded">

            <h3 className="font-semibold mb-2">
              Current Status
            </h3>

            <p>
              Exam:
              {" "}
              {selectedExam
                ? selectedExam.name
                : "Not Selected"}
            </p>

            <p>
              Photo:
              {" "}
              {photo
                ? "Uploaded"
                : "Missing"}
            </p>

            <p>
              Signature:
              {" "}
              {signature
                ? "Uploaded"
                : "Missing"}
            </p>

          </div>

        </div>

        {/* Continue */}

        <button
          onClick={handleContinue}
          className="
            bg-blue-600
            text-white
            px-6
            py-3
            rounded
            hover:bg-blue-700
          "
        >
          Process Files
        </button>

      </div>

      {/* Sidebar Ads */}

      <SidebarAds />

    </div>
  );
}