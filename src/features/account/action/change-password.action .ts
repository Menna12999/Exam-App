"use server";

import { HEADERS } from "@/shared/constants/api.constant";
import { getUserToken } from "@/shared/lib/utils/server-utils";
import type { ChangePasswordFields } from "../types/change-password";

export async function changePassword(body: ChangePasswordFields) {
  const token = await getUserToken();
  if (!token) return { success: false as const, message: "Unauthorized" };

  const res = await fetch(`${process.env.API}/users/change-password`, {
    method: "POST",
    headers: { ...HEADERS.jsonBody, ...HEADERS.authorization(token) },
    body: JSON.stringify(body),
  });

  const json = await res.json();

  if (!res.ok || json.status === false) {
    return { success: false as const, message: json.message as string };
  }
  return { success: true as const, message: json.message as string };
}
