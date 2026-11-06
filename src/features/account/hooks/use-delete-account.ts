"use client";

import { useMutation } from "@tanstack/react-query";
import { deleteAccountAction } from "../action/delete-accout.action";

export default function useDeleteAccount() {
  return useMutation({
    mutationFn: deleteAccountAction,
  });
}