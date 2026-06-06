// src/services/schemaParser.ts

import { ExamSchema } from "@/types/exam";

interface ParsedSchemaResult {
  success: boolean;
  schema?: ExamSchema;
  error?: string;
}

/**
 * Mock AI Parser
 *
 * Future:
 * URL -> AI -> ExamSchema
 */
export async function parseExamUrl(
  url: string
): Promise<ParsedSchemaResult> {

  try {

    // Simulate AI processing delay
    await sleep(2000);

    const generatedSchema: ExamSchema = {

      id: "generated-exam",

      name: "AI Parsed Exam",

      photo: {
        width: 300,
        height: 400,
        maxSizeKB: 300,
        formats: ["jpg", "jpeg"],
      },

      signature: {
        width: 200,
        height: 100,
        maxSizeKB: 100,
        formats: ["jpg", "jpeg"],
      },

      documents: {
        identityProof: {
          required: false,
          formats: ["pdf", "jpg", "jpeg"],
        },
      },
    };

    return {
      success: true,
      schema: generatedSchema,
    };

  } catch (error) {

    console.error(error);

    return {
      success: false,
      error: "Failed to parse exam URL",
    };
  }
}

function sleep(
  ms: number
): Promise<void> {

  return new Promise(
    (resolve) =>
      setTimeout(resolve, ms)
  );
}