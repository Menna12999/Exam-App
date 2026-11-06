import { useMutation } from "@tanstack/react-query";
import React from "react";
import { EmailStepFields, RegisterFields } from "../types/auth";
import { registerAction, sendOtpAction } from "../lib/actions/auth.action";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export default function useRegister() {
   //translation
     const t = useTranslations("auth");
   //Navigation
   const router = useRouter();
  //mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (fields: RegisterFields) => {
      const payload = await registerAction(fields);

       if (!payload.status) {
      throw payload;
    }

        
      
      return payload;
    },
    onSuccess: () => {
        toast.success(t('register-successfull'));
        router.push("/login");
    },
  });

  return { isPending, error, register: mutate };
}
