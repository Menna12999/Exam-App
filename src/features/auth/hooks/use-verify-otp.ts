import { useMutation } from "@tanstack/react-query";
import React from "react";
import { EmailStepFields, OtpStepFields } from "../types/auth";
import { verifyOtpAction } from "../lib/actions/auth.action";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export default function useVerifyOtp() {

  //translation
  const t = useTranslations("auth");
  
  //mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (fields: OtpStepFields) => {
      const payload = await verifyOtpAction(fields);

      if (!payload.status) {
        const validationMessage = payload.errors?.find(
          (err) => err.path === "code",
        )?.message;

        throw new Error(validationMessage || payload.message);
      }
      return payload;
    },
    onSuccess: () => {
      toast.success(t("otp-verified-successfully"));
    },
  });

  return { isPending, error, mutate };
}
