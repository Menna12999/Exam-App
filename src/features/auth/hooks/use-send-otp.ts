import { useMutation } from "@tanstack/react-query";
import React from "react";
import { EmailStepFields } from "../types/auth";
import { sendOtpAction } from "../lib/actions/auth.action";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export default function useSendOtp() {
   //translation
     const t = useTranslations("auth");
  //mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (fields: EmailStepFields) => {
      const payload = await sendOtpAction(fields);

      if (!payload.status) {
        const validationMessage = payload.errors?.find(
          (err) => err.path === "email",
        )?.message;

        throw new Error(validationMessage || payload.message);
      }
      return payload;
    },
   
  });

  return { isPending, error, mutate };
}
