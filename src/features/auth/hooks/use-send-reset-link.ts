import { useMutation } from "@tanstack/react-query";
import React from "react";
import { EmailStepFields } from "../types/auth";
import { sendResetLink } from "../lib/actions/auth.action";

import { useLocale, useTranslations } from "next-intl";
import  { Locale } from "@/i18n/routing";

export default function useSendResetLink() {
  //hooks
  const locale = useLocale() as Locale;

  //mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (fields: EmailStepFields) => {
      const payload = await sendResetLink(fields,locale);

      if (!payload.status) {
        throw payload;
      }

      return payload;
    },
  });

  return { isPending, error, mutate };
}
