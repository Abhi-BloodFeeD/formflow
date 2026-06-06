// src/components/ExamUrlParser.tsx

"use client";

import { useState } from "react";
import { parseExamUrl } from "@/services/schemaParser";
import { ExamSchema } from "@/types/exam";

export default function ExamUrlParser() {

  const [url, setUrl] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [schema, setSchema] =
    useState<ExamSchema | null>(
      null
    );

  const [error, setError] =
    useState("");

  async function handleParse() {

    if (!url.trim()) {

      setError(
        "Please enter a URL"
      );

      return;
    }

    setLoading(true);
    setError("");

    try {

      const result =
        await parseExamUrl(url);

      if (
        result.success &&
        result.schema
      ) {

        setSchema(
          result.schema
        );

      } else {

        setError(
          result.error ||
          "Failed to parse URL"
        );

      }

    } catch (err) {

      console.error(err);

      setError(
        "Unexpected error occurred"
      );

    } finally {

      setLoading(false);

    }
  }

  return (

    <div className="
      border
      rounded-lg
      p-6
      bg-white
    ">

      <h2 className="
        text-xl
        font-semibold
        mb-4
      ">
        AI Exam Parser
      </h2>

      <input
        type="text"
        value={url}
        onChange={(e) =>
          setUrl(
            e.target.value
          )
        }
        placeholder="
https://exam-site.com/notification
"
        className="
          w-full
          border
          rounded
          p-3
          mb-4
        "
      />

      <button
        onClick={handleParse}
        disabled={loading}
        className="
          bg-blue-600
          text-white
          px-5
          py-2
          rounded
        "
      >
        {loading
          ? "Parsing..."
          : "Parse URL"}
      </button>

      {error && (

        <div className="
          mt-4
          text-red-500
        ">
          {error}
        </div>

      )}

      {schema && (

        <div className="
          mt-6
          border-t
          pt-6
        ">

          <h3 className="
            font-semibold
            mb-4
          ">
            Generated Schema
          </h3>

          <div className="space-y-2">

            <p>
              <strong>Name:</strong>
              {" "}
              {schema.name}
            </p>

            <p>
              <strong>Photo:</strong>
              {" "}
              {schema.photo.width}
              x
              {schema.photo.height}
            </p>

            <p>
              <strong>Photo Size:</strong>
              {" "}
              {schema.photo.maxSizeKB}
              KB
            </p>

            <p>
              <strong>Signature:</strong>
              {" "}
              {schema.signature.width}
              x
              {schema.signature.height}
            </p>

            <p>
              <strong>Signature Size:</strong>
              {" "}
              {schema.signature.maxSizeKB}
              KB
            </p>

          </div>

        </div>

      )}

    </div>

  );
}