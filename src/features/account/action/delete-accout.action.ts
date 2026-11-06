'use server';

import { getUserToken } from "@/shared/lib/utils/server-utils";

export async function deleteAccountAction() {
  const token = await getUserToken();
    if (!token) return { success: false as const, message: "Unauthorized" };
  const res = await fetch(`${process.env.API}/users/account`, { method: "DELETE",
     headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
   });

  if (!res.ok) {
    throw new Error(String(res.status));
  }

  return res.json() as Promise<{ message: string }>;
}