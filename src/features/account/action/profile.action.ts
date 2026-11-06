"use server";

import { HEADERS } from "@/shared/constants/api.constant";
import { getUserToken } from "@/shared/lib/utils/server-utils";
import type { APIResponse } from "@/shared/types/api";
import type { IProfile, UpdateProfilePayload } from "../types/profile";

export async function updateProfile(body: UpdateProfilePayload) {
  const token = await getUserToken();
  
  if(!token) return { success: false as const, message: "Unauthorized" };

  const res = await fetch(`${process.env.API}/users/profile`, {
    method: "PATCH",
    headers: { ...HEADERS.jsonBody, ...HEADERS.authorization(token) },
    body: JSON.stringify(body),
  });

  const json: APIResponse<{ user: IProfile }> = await res.json();

  if (!json.status || !json.payload) {
    return { success: false as const, message: json.message };
  }
  return { success: true as const, user: json.payload.user };
}