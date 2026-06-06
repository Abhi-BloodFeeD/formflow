// src/components/UploadBox.tsx

"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { saveFile } from "@/services/indexedDb";

interface UploadBoxProps {
  label: string;
  storageKey: string;
  onFileSelect: (file: File) => void;
}

export default function UploadBox({
  label,
  storageKey,
  onFileSelect,
}: UploadBoxProps) {
  const [preview, setPreview] =
    useState<string | null>(null);

  const [error, setError] =
    useState<string | null>(null);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {

      const file = acceptedFiles[0];

      if (!file) return;

      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
      ];

      if (
        !allowedTypes.includes(
          file.type
        )
      ) {
        setError(
          "Only JPG, PNG and WEBP files are allowed."
        );
        return;
      }

      setError(null);

      const previewUrl =
        URL.createObjectURL(file);

      setPreview(previewUrl);

      await saveFile(
        storageKey,
        file
      );

      onFileSelect(file);
    },
    [
      storageKey,
      onFileSelect,
    ]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
    onDrop,
    multiple: false,
  });

  return (
    <div className="w-full">

      <label className="block mb-2 font-semibold">
        {label}
      </label>

      <div
        {...getRootProps()}
        className={`
          border-2
          border-dashed
          rounded-xl
          p-8
          cursor-pointer
          text-center
          transition-all

          ${
            isDragActive
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300"
          }
        `}
      >
        <input
          {...getInputProps()}
        />

        {preview ? (
          <img
            src={preview}
            alt="preview"
            className="
              mx-auto
              max-h-48
              rounded
            "
          />
        ) : (
          <>
            <p className="font-medium">
              Drag & Drop
            </p>

            <p className="text-sm text-gray-500 mt-2">
              or click to upload
            </p>
          </>
        )}
      </div>

      {error && (
        <p className="text-red-500 mt-2 text-sm">
          {error}
        </p>
      )}
    </div>
  );
}