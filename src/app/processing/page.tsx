// src/app/processing/page.tsx

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { processImage } from "../../services/imageProcessor"

import { useExamStore } from "../../store/useExamStore"

export default function ProcessingPage() {

  const router = useRouter();

  const {
    photo,
    signature,
    selectedExam,

    setProcessedPhoto,
    setProcessedSignature,

    processingProgress,
    setProcessingProgress,

    isPremium,
    setIsProcessing,
  } = useExamStore();

  useEffect(() => {

    async function startProcessing() {

      try {

        if (
          !photo ||
          !signature ||
          !selectedExam
        ) {
          router.push("/upload");
          return;
        }

        setIsProcessing(true);

        // Step 1
        setProcessingProgress(10);

        await sleep(
          isPremium ? 200 : 1500
        );

        // Step 2
        setProcessingProgress(30);

        const processedPhoto =
          await processImage(
            photo,
            selectedExam.photo
          );

        setProcessedPhoto(
          processedPhoto
        );

        await sleep(
          isPremium ? 100 : 1500
        );

        // Step 3
        setProcessingProgress(60);

        const processedSignature =
          await processImage(
            signature,
            selectedExam.signature
          );

        setProcessedSignature(
          processedSignature
        );

        await sleep(
          isPremium ? 100 : 1500
        );

        // Step 4
        setProcessingProgress(90);

        await sleep(
          isPremium ? 100 : 1500
        );

        // Complete
        setProcessingProgress(100);

        setIsProcessing(false);

        setTimeout(() => {
          router.push("/result");
        }, 1000);

      } catch (error) {

        console.error(error);

        alert(
          "Processing failed."
        );

        setIsProcessing(false);
      }
    }

    startProcessing();

  }, []);

  return (
    <div className="
      min-h-screen
      p-8
      max-w-5xl
      mx-auto
    ">

      <h1 className="
        text-3xl
        font-bold
        mb-6
      ">
        Processing Documents
      </h1>

      <p className="mb-6">
        Please wait while we prepare
        your files.
      </p>

      {/* Progress Bar */}

      <div className="
        w-full
        h-6
        bg-gray-200
        rounded-full
        overflow-hidden
      ">
        <div
          className="
            h-full
            bg-green-500
            transition-all
            duration-500
          "
          style={{
            width:
              `${processingProgress}%`
          }}
        />
      </div>

      <p className="
        mt-3
        font-semibold
      ">
        {processingProgress}%
      </p>

      {/* Free User Ads */}

      {!isPremium && (

        <div className="
          mt-10
          grid
          md:grid-cols-2
          gap-6
        ">

          <div className="
            h-48
            bg-gray-100
            rounded-lg
            flex
            items-center
            justify-center
            text-lg
            font-semibold
          ">
            Advertisement Slot #1
          </div>

          <div className="
            h-48
            bg-gray-100
            rounded-lg
            flex
            items-center
            justify-center
            text-lg
            font-semibold
          ">
            Advertisement Slot #2
          </div>

        </div>

      )}

      {/* Premium Message */}

      {isPremium && (

        <div className="
          mt-10
          p-4
          rounded-lg
          bg-green-50
          border
          border-green-200
        ">
          Premium Mode Enabled
          <br />
          Ads removed and
          processing accelerated.
        </div>

      )}

      {/* Status Steps */}

      <div className="
        mt-10
        bg-white
        border
        rounded-lg
        p-6
      ">

        <h2 className="
          font-semibold
          mb-4
        ">
          Processing Steps
        </h2>

        <ul className="
          space-y-2
          text-gray-700
        ">
          <li>
            ✓ Validate Uploads
          </li>

          <li>
            ✓ Resize Images
          </li>

          <li>
            ✓ Compress Files
          </li>

          <li>
            ✓ Generate Upload Package
          </li>
        </ul>

      </div>

    </div>
  );
}

function sleep(
  ms: number
): Promise<void> {
  return new Promise(
    (resolve) =>
      setTimeout(resolve, ms)
  );
}