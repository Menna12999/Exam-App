// features/account/hooks/use-request-email-change.ts
"use client";

import { useMutation } from "@tanstack/react-query";
import { requestEmailChangeAction } from "../action/email.action";

export default function useChangeEmail() {
  return useMutation({
    mutationFn: async (body: { newEmail: string }) => {
      const json = await requestEmailChangeAction(body);
      if (!json.status) throw new Error(json.message);
      return json;
    },
  });
}