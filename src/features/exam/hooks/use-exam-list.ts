"use client";
import { APIResponse, IPaginatedResponse } from "@/shared/types/api";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { PAGINATION_LIMIT } from "@/shared/constants/api.constant";
import { EXAM_KEYS } from "../api/exam.option";
import { IExam } from "../types/exam.interface";

export default function useExamList() {
  //Navigation
  const searchParams = useSearchParams();

  //Variables
  const page = searchParams.get("page") || 1;
  const limit = searchParams.get("limit") || PAGINATION_LIMIT;
  const diplomaId = searchParams.get("diplomaId") || "";

  //Query
  return useInfiniteQuery({
    queryKey: EXAM_KEYS.List(Number(page || 1), Number(limit || 12), diplomaId),

    queryFn: async ({ pageParam }) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const url = new URL(`/api/exams`, window.location.origin);
      if (pageParam) url.searchParams.set("page", pageParam.toString());
      if (limit) url.searchParams.set("limit", limit.toString());
      if (diplomaId) url.searchParams.set("diplomaId", diplomaId.toString());
      const response = await fetch(url);
      const data: APIResponse<IPaginatedResponse<IExam>> =
        await response.json();
      if (!data.status || !data.payload) throw new Error(data.message);
      return data.payload;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      console.log("lastPage metadata:", lastPage.metadata);

      if (lastPage.metadata.page === lastPage.metadata.totalPages) {
        return undefined;
      }

      return lastPage.metadata.page + 1;
    },
  });
}
