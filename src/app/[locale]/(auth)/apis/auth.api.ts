import { LoginFields } from "../../../../features/auth/types/auth";
import "server-only";

import { LoginResponse } from "@/features/auth/types/auth";
import { APIResponse } from "@/shared/types/api";
import { HEADERS } from "@/shared/constants/api.constant";

export const login = async (LoginFields: LoginFields) => {
  const res = await fetch(`${process.env.API}/auth/login`, {
    method: "POST",
    body: JSON.stringify(LoginFields),
    headers: { ...HEADERS.jsonBody },
  });

  const payload: APIResponse<LoginResponse> = await res.json();
  return payload;
};
