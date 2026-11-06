import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import React from "react";
import { LoginFields } from "../types/auth";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export default function useLogin() {
   //Translation
  const t = useTranslations("auth");

  //Mutation
  return useMutation({
    mutationFn: async (fields: LoginFields) => {
      const response = await signIn("credentials", {
        username: fields.username,
        password: fields.password,
        redirect: false,
      });

      if (response?.error) {
        throw new Error(response.error || "Something went wrong");
      }
      return response;
    },

    onSuccess: () => {
      toast.success(t("login-success"), {
        onAutoClose: () => {
          //get callBackUrl
          const callBackUrl =
            new URLSearchParams(location.search).get("callbackUrl") || "/";

          //redirect to callBackUrl
          window.location.href = callBackUrl;
          
        },
        duration: 2000,
      });
    },
  });
}
