"use client";

import { useMutation } from "@tanstack/react-query";
import { confirmEmailChangeAction } from "../action/email.action";

export default function useConfirmEmailChange() {
  return useMutation({
    mutationFn: async (body: { code: string }) => {
      const json = await confirmEmailChangeAction(body);
      if (!json.status) throw new Error(json.message);
      return json;
    },
  });
}