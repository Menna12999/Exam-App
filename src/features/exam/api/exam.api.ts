import { RESPONSES } from "@/features/auth/constants/response.constant";
import { IDiploma } from "@/features/diploma/types/diploma";
import { HEADERS } from "@/shared/constants/api.constant";
import { APIResponse, IPaginatedResponse } from "@/shared/types/api";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";
import { IExam } from "../types/exam.interface";
import { getUserToken } from "@/shared/lib/utils/server-utils";
import { redirect } from "@/i18n/navigation";
import type { IExamPayload } from "../types/exam.interface";


export async function getExams(req: NextRequest, id: string) {
  const token = await getToken({ req });

  if (!token) return RESPONSES.unauthorized;
  const response = await fetch(`${process.env.API}/exams?diplomaId=${id}`, {
    method: "GET",
    headers: { ...HEADERS.authorization(token.token) },
  });
  const payload: APIResponse<IPaginatedResponse<IExam>> =
    await response.json();
  return payload;
}



export async function getExamById(examId: string) {
  const token = await getUserToken();
  if (!token) {
    redirect({ href: "/login", locale: "en" });
    throw new Error("Unauthorized");
  }

  const res = await fetch(`${process.env.API}/exams/${examId}`, {
    headers: { ...HEADERS.authorization(token) },
  });
  if (!res.ok) throw new Error("Failed to load exam");

  const data: APIResponse<IExamPayload> = await res.json();
  if (!data.status) throw new Error(data.message);
  if (!data.payload) throw new Error("Exam not found");

  return data.payload.exam;
}