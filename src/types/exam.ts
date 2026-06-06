// src/types/exam.ts

export interface DocumentRequirement {
  width: number;
  height: number;
  maxSizeKB: number;
  formats: string[];
}

export interface ExamSchema {
  id: string;
  name: string;

  photo: DocumentRequirement;

  signature: DocumentRequirement;

  documents?: {
    [key: string]: {
      required: boolean;
      formats: string[];
      maxSizeMB?: number;
    };
  };
}

export const UPSC_SCHEMA: ExamSchema = {
  id: "upsc-cse",
  name: "UPSC Civil Services Examination",

  photo: {
    width: 300,
    height: 400,
    maxSizeKB: 300,
    formats: ["jpg", "jpeg"]
  },

  signature: {
    width: 200,
    height: 100,
    maxSizeKB: 100,
    formats: ["jpg", "jpeg"]
  },

  documents: {
    identityProof: {
      required: false,
      formats: ["pdf", "jpg", "jpeg"]
    }
  }
};