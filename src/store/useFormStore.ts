// src/store/useFormStore.ts

import { create } from "zustand";
import { ExamSchema } from "../types/exam";

interface ExamStore {
  // Selected Exam
  selectedExam: ExamSchema | null;

  // Uploaded Files
  photo: File | null;
  signature: File | null;
  additionalDocuments: File[];

  // Processed Files
  processedPhoto: File | null;
  processedSignature: File | null;

  // Processing State
  isProcessing: boolean;
  processingProgress: number;

  // Premium State
  isPremium: boolean;

  // Actions
  setSelectedExam: (exam: ExamSchema) => void;

  setPhoto: (file: File | null) => void;
  setSignature: (file: File | null) => void;

  addDocument: (file: File) => void;
  removeDocument: (index: number) => void;

  setProcessedPhoto: (file: File | null) => void;
  setProcessedSignature: (file: File | null) => void;

  setIsProcessing: (status: boolean) => void;
  setProcessingProgress: (progress: number) => void;

  setPremium: (status: boolean) => void;

  resetForm: () => void;
}

export const useExamStore = create<ExamStore>((set) => ({
  // Initial State

  selectedExam: null,

  photo: null,
  signature: null,
  additionalDocuments: [],

  processedPhoto: null,
  processedSignature: null,

  isProcessing: false,
  processingProgress: 0,

  isPremium: false,

  // Exam Actions

  setSelectedExam: (exam) =>
    set({
      selectedExam: exam,
    }),

  // Upload Actions

  setPhoto: (file) =>
    set({
      photo: file,
    }),

  setSignature: (file) =>
    set({
      signature: file,
    }),

  addDocument: (file) =>
    set((state) => ({
      additionalDocuments: [
        ...state.additionalDocuments,
        file,
      ],
    })),

  removeDocument: (index) =>
    set((state) => ({
      additionalDocuments:
        state.additionalDocuments.filter(
          (_, i) => i !== index
        ),
    })),

  // Processed Files

  setProcessedPhoto: (file) =>
    set({
      processedPhoto: file,
    }),

  setProcessedSignature: (file) =>
    set({
      processedSignature: file,
    }),

  // Processing Controls

  setIsProcessing: (status) =>
    set({
      isProcessing: status,
    }),

  setProcessingProgress: (progress) =>
    set({
      processingProgress: progress,
    }),

  // Premium Controls

  setPremium: (status) =>
    set({
      isPremium: status,
    }),

  // Reset Everything

  resetForm: () =>
    set({
      selectedExam: null,

      photo: null,
      signature: null,
      additionalDocuments: [],

      processedPhoto: null,
      processedSignature: null,

      isProcessing: false,
      processingProgress: 0,
    }),
}));