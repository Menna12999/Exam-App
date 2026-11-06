"use server";

import { getUserToken } from "@/shared/lib/utils/server-utils";
import type { APIResponse } from "@/shared/types/api";

type RequestEmailChangeBody = { newEmail: string };
type ConfirmEmailChangeBody = { code: string };

export async function requestEmailChangeAction(body: RequestEmailChangeBody) {
  const token = await getUserToken(); 

  const res = await fetch(`${process.env.API}/users/email/request`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  const json: APIResponse<unknown> = await res.json();
  return json;
}

export async function confirmEmailChangeAction(body: ConfirmEmailChangeBody) {
  const token = await getUserToken(); 

  const res = await fetch(`${process.env.API}/users/email/confirm`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  const json: APIResponse<unknown> = await res.json();
  return json;
}