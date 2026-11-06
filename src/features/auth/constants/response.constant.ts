import { ErrorResponse } from "@/shared/types/api";

export const RESPONSES = {
  unauthorized: {
    status: false,
    message: "No token provided",
    code: 401,
  } as ErrorResponse,
  badRequest: {
    status: false,
    message: "Bad request",
    code: 400,
  } as ErrorResponse,

} as const;
