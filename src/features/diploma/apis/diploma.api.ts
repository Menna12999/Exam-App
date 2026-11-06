import {
  APIResponse,
  ErrorResponse,
  IPaginatedResponse,
} from "@/shared/types/api";
import { Divide } from "lucide-react";
import { IDiploma, IDiplomaDetails } from "../types/diploma";
import { HEADERS, PAGINATION_LIMIT } from "@/shared/constants/api.constant";
import { NextRequest, userAgent } from "next/server";
import { getToken } from "next-auth/jwt";
import { RESPONSES } from "@/features/auth/constants/response.constant";
import { getUserToken } from "@/shared/lib/utils/server-utils";

export async function getDiplomas(req: NextRequest) {
  const { device } = userAgent(req);
  const viewport = device.type || "desktop";
  const defaultLimit = viewport === "desktop" ? 12 : 6;
  const token = await getToken({ req });

  const page = Number(req.nextUrl.searchParams.get("page") || 1);
  const limit = Number(req.nextUrl.searchParams.get("limit") || defaultLimit);

  if (!token) return RESPONSES.unauthorized;
  const response = await fetch(
    `${process.env.API}/diplomas?page=${page}&limit=${limit}`,
    {
      method: "GET",
      headers: { ...HEADERS.authorization(token.token) },
    },
  );
  const payload: APIResponse<IPaginatedResponse<IDiploma>> =
    await response.json();
  return payload;
}

export async function getDiploma( id: string) {
 const token = await getUserToken();

  if (!token) return null;

  const response = await fetch(`${process.env.API}/diplomas/${id}`, {
    method: "GET",
    headers: { ...HEADERS.authorization(token) },
  });

  const payload: APIResponse<IDiplomaDetails> = await response.json();
  return payload;
}
