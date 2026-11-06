import "server-only";
import { redirect } from "@/i18n/navigation";
import { HEADERS } from "@/shared/constants/api.constant";
import { APIResponse } from "@/shared/types/api";
import type { IQuestionsPayload } from "../types/question.interface";
import { getUserToken } from "@/shared/lib/utils/server-utils";

export async function getQuestionsByExam(examId: string) {
  const token = await getUserToken();
 if (!token) {
  redirect({ href: "/login", locale: "en" });
  throw new Error("Unauthorized");
}

  const res = await fetch(`${process.env.API}/questions/exam/${examId}`, {
    headers: { ...HEADERS.authorization(token) },
  });
  if (!res.ok) throw new Error("Failed to load questions");

  const data: APIResponse<IQuestionsPayload> = await res.json();
 if (!data.status) throw new Error(data.message);
if (!data.payload) throw new Error("No questions returned");

  return data.payload.questions;
}