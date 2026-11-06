import { OTP_COOLDOWN_TIME } from "@/shared/constants/auth.constant";

export function startOtpCooldown(key: string) {
  const endAt = new Date(Date.now() + OTP_COOLDOWN_TIME).toISOString();
  localStorage.setItem(key, endAt);
}