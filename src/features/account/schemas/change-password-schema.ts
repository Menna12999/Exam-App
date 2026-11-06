import { passwordFieldSchema } from '@/features/auth/schemes/auth.schema';
import { z } from "zod";
import type { Translations } from "@/features/auth/types/auth";

export const changePasswordSchema = (t: Translations) =>
  z
    .object({
      currentPassword: z.string().nonempty(t("password-is-required")),
      newPassword: passwordFieldSchema(t),
      confirmPassword: z.string().nonempty(t("confirm-password-is-required")),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: t("passwords-do-not-match"),
      path: ["confirmPassword"],
    })
    .refine((data) => data.newPassword !== data.currentPassword, {
      message: t('password-same-as-current'),
      path: ["newPassword"],
    });