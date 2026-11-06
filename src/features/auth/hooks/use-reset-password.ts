import { useMutation } from "@tanstack/react-query";

import { ResetPasswordFields } from "../types/auth";
import { resetPasswordAction } from "../lib/actions/auth.action";

type ResetPasswordMutation = ResetPasswordFields & {
  token: string;
};

export default function useResetPassword() {
  const { isPending, error, mutate } = useMutation({
    mutationFn: async ({
      token,
      ...fields
    }: ResetPasswordMutation) => {
      const payload = await resetPasswordAction(fields, token);

      if (!payload.status) {
        throw new Error(payload.message);
      }

      return payload;
    },
  });

  return { isPending, error, mutate };
}