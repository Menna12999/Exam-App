"use client";
import { useMutation } from "@tanstack/react-query";
import { submitExamAction } from "../actions/submit-exam.action";

export function useSubmitExam() {
  return useMutation({
    mutationFn: submitExamAction,
  });
}