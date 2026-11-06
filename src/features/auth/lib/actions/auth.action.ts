"use server";
import { HEADERS } from "@/shared/constants/api.constant";
import { APIResponse } from "@/shared/types/api";
import {
  EmailStepFields,
  LoginResponse,
  RegisterFields,
  ResetPasswordFields,
  VerificationFields,
} from "../../types/auth";
import { Locale } from "@/i18n/routing";

export async function sendOtpAction(fields: EmailStepFields) {
  const response = await fetch(
    `${process.env.API}/auth/send-email-verification`,
    {
      method: "POST",
      body: JSON.stringify(fields),
      headers: { ...HEADERS.jsonBody },
    },
  );
  const payload: APIResponse<null> = await response.json();
  return payload;
}
export async function verifyOtpAction(fields: VerificationFields) {
  const response = await fetch(
    `${process.env.API}/auth/confirm-email-verification`,
    {
      method: "POST",
      body: JSON.stringify({
        email: fields.email,
        code: fields.code,
      }),
      headers: { ...HEADERS.jsonBody },
    },
  );
  const payload: APIResponse<null> = await response.json();
  return payload;
}

export async function registerAction(fields: RegisterFields) {
  const response = await fetch(`${process.env.API}/auth/register`, {
    method: "POST",
    body: JSON.stringify(fields),
    headers: { ...HEADERS.jsonBody },
  });
  const payload: APIResponse<LoginResponse> = await response.json();
  return payload;
}

export async function sendResetLink(fields: EmailStepFields
  ,locale: Locale
) {
  const response = await fetch(`${process.env.API}/auth/forgot-password`, {
    method: "POST",
    body: JSON.stringify({
      email: fields.email,
      redirectUrl: `${process.env.NEXTAUTH_URL}/${locale}/forgot-password?step=reset-password`,
    }),
    headers: { ...HEADERS.jsonBody },
  });
  const payload: APIResponse<null> = await response.json();
  return payload;
}


export async function resetPasswordAction(fields: ResetPasswordFields, token: string) {
  const response = await fetch(`${process.env.API}/auth/reset-password`, {
    method: "POST",
    body: JSON.stringify({
      token,
      newPassword: fields.newPassword,
      confirmPassword: fields.confirmPassword,
    }),
    headers: { ...HEADERS.jsonBody },
  });

  const payload: APIResponse<null> = await response.json();

  return payload;
}




