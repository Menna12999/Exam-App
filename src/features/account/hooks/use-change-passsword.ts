import { useMutation } from "@tanstack/react-query";
import type { ChangePasswordFields } from "../types/change-password";
import { changePassword } from "../action/change-password.action ";

export default function useChangePassword() {
  return useMutation({
    mutationFn: async (body: ChangePasswordFields) => {
      const result = await changePassword(body);
      if (!result.success) throw new Error(result.message);
      return result.message;
    },
  });
}