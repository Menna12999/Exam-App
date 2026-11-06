"use client";
import { useQuery } from "@tanstack/react-query";
import { APIResponse } from "@/shared/types/api";
import { IQuestionsPayload } from "../types/question.interface";


export default function useQuestionList(examId: string) {
  return useQuery({
    queryKey: ["questions", examId],
    queryFn: async () => {
      const response = await fetch(`/api/exams/${examId}`);
      const data: APIResponse<IQuestionsPayload> = await response.json();
      if (!data.status) throw new Error(data.message);
      return data.payload;
    },
    enabled: !!examId,
    staleTime: Infinity,
  });
}