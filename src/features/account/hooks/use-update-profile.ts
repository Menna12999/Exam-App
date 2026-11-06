import { useMutation } from "@tanstack/react-query";
import type { UpdateProfilePayload } from "../types/profile";
import { updateProfile } from "../action/profile.action";

export default function useUpdateProfile() {
  return useMutation({
    mutationFn: async (body: UpdateProfilePayload) => {
      const result = await updateProfile(body);
      if (!result.success) throw new Error(result.message);
      return result.user;
    },
  });
}