import type { APIResponse } from "@/shared/types/api";
import type { IProfilePayload } from "../types/profile";
import { getUserToken } from "@/shared/lib/utils/server-utils";

export async function getProfile(): Promise<IProfilePayload> {
  const token = await getUserToken();

  const res = await fetch(`${process.env.API}/users/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const json: APIResponse<IProfilePayload> = await res.json();

  if (!json.status) throw new Error(json.message);
  if (!json.payload) throw new Error("Empty profile payload");

  return json.payload;
}
