"use server";

import { getUserToken } from "@/shared/lib/utils/server-utils";
import type {
  ISubmitExamBody,
  ISubmitExamResponse,
} from "../types/submission.interface";

export async function submitExamAction(body: ISubmitExamBody) {
  const token = await getUserToken();
  if (!token) throw new Error("Unauthorized");

  const res = await fetch(`${process.env.API}/submissions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message ?? "Failed to submit exam");

  return data as ISubmitExamResponse;
}