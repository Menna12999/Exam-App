import * as z from "zod";
import { accountInfoSchema, emailStepSchema } from "@/features/auth/schemes/auth.schema";
import { Translations } from "@/features/auth/types/auth";

export const profileSchema = (t: Translations) =>
  accountInfoSchema(t)
    .merge(emailStepSchema(t))
    .extend({
      profilePhoto: z.string().optional(),
    });