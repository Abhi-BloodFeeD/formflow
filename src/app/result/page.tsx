// src/app/result/page.tsx

"use client";

import { useRouter } from "next/navigation";
import { useExamStore } from "../../store/useExamStore"

export default function ResultPage() {

  const router = useRouter();

  const {
    processedPhoto,
    processedSignature,
    selectedExam,
    isPremium,
    resetForm,
  } = useExamStore();

  const downloadFile = (
    file: File | null,
    fileName: string
  ) => {

    if (!file) return;

    const url =
      URL.createObjectURL(file);

    const link =
      document.createElement("a");

    link.href = url;
    link.download = fileName;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  const handleNewApplication = () => {

    resetForm();

    router.push("/upload");
  };

  return (
    <div className="
      min-h-screen
      max-w-6xl
      mx-auto
      p-8
    ">

      <h1 className="
        text-3xl
        font-bold
        mb-4
      ">
        Files Ready
      </h1>

      <p className="mb-8">
        Your documents have been
        processed successfully.
      </p>

      {/* Exam Info */}

      <div className="
        border
        rounded-lg
        p-4
        mb-8
      ">
        <h2 className="font-semibold">
          Exam
        </h2>

        <p>
          {selectedExam?.name ??
            "Unknown Exam"}
        </p>
      </div>

      {/* Processed Files */}

      <div className="
        grid
        md:grid-cols-2
        gap-6
      ">

        {/* Photo */}

        <div className="
          border
          rounded-lg
          p-6
        ">

          <h2 className="
            font-semibold
            mb-4
          ">
            Processed Photo
          </h2>

          {processedPhoto ? (

            <>
              <p className="mb-4">
                Ready for upload
              </p>

              <button
                onClick={() =>
                  downloadFile(
                    processedPhoto,
                    "photo.jpg"
                  )
                }
                className="
                  bg-blue-600
                  text-white
                  px-4
                  py-2
                  rounded
                "
              >
                Download Photo
              </button>
            </>

          ) : (

            <p>
              No processed photo
            </p>

          )}

        </div>

        {/* Signature */}

        <div className="
          border
          rounded-lg
          p-6
        ">

          <h2 className="
            font-semibold
            mb-4
          ">
            Processed Signature
          </h2>

          {processedSignature ? (

            <>
              <p className="mb-4">
                Ready for upload
              </p>

              <button
                onClick={() =>
                  downloadFile(
                    processedSignature,
                    "signature.jpg"
                  )
                }
                className="
                  bg-blue-600
                  text-white
                  px-4
                  py-2
                  rounded
                "
              >
                Download Signature
              </button>
            </>

          ) : (

            <p>
              No processed signature
            </p>

          )}

        </div>

      </div>

      {/* Premium Upsell */}

      {!isPremium && (

        <div className="
          mt-10
          border
          rounded-lg
          p-6
          bg-yellow-50
        ">

          <h2 className="
            text-xl
            font-semibold
            mb-2
          ">
            Upgrade to Premium
          </h2>

          <ul className="
            list-disc
            pl-5
            mb-4
          ">
            <li>No advertisements</li>
            <li>Faster processing</li>
            <li>Future AI Autofill</li>
            <li>Priority support</li>
          </ul>

          <button
            className="
              bg-green-600
              text-white
              px-5
              py-2
              rounded
            "
          >
            Upgrade Now
          </button>

        </div>

      )}

      {/* Ad Space */}

      {!isPremium && (

        <div className="
          mt-10
          h-48
          rounded-lg
          bg-gray-100
          flex
          items-center
          justify-center
          text-xl
          font-semibold
        ">
          Advertisement
        </div>

      )}

      {/* Actions */}

      <div className="
        mt-10
        flex
        gap-4
      ">

        <button
          onClick={handleNewApplication}
          className="
            bg-gray-800
            text-white
            px-6
            py-3
            rounded
          "
        >
          New Application
        </button>

      </div>

    </div>
  );
}