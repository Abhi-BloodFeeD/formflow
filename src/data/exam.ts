// src/data/exams.ts

import { ExamSchema } from "@/types/exam";

export const UPSC_CSE: ExamSchema = {
  id: "upsc-cse",

  name: "UPSC Civil Services Examination",

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

export const SSC_CGL: ExamSchema = {
  id: "ssc-cgl",

  name: "SSC CGL",

  photo: {
    width: 300,
    height: 300,
    maxSizeKB: 200,
    formats: ["jpg", "jpeg"],
  },

  signature: {
    width: 140,
    height: 60,
    maxSizeKB: 50,
    formats: ["jpg", "jpeg"],
  },

  documents: {},
};

export const IBPS_PO: ExamSchema = {
  id: "ibps-po",

  name: "IBPS Probationary Officer",

  photo: {
    width: 200,
    height: 230,
    maxSizeKB: 50,
    formats: ["jpg", "jpeg"],
  },

  signature: {
    width: 140,
    height: 60,
    maxSizeKB: 20,
    formats: ["jpg", "jpeg"],
  },

  documents: {},
};

export const RRB_NTPC: ExamSchema = {
  id: "rrb-ntpc",

  name: "Railway NTPC",

  photo: {
    width: 300,
    height: 300,
    maxSizeKB: 100,
    formats: ["jpg", "jpeg"],
  },

  signature: {
    width: 250,
    height: 100,
    maxSizeKB: 50,
    formats: ["jpg", "jpeg"],
  },

  documents: {},
};

export const ALL_EXAMS: ExamSchema[] = [
  UPSC_CSE,
  SSC_CGL,
  IBPS_PO,
  RRB_NTPC,
];

export function getExamById(
  id: string
): ExamSchema | undefined {
  return ALL_EXAMS.find(
    (exam) => exam.id === id
  );
}