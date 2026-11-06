"use client";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { signOut } from "next-auth/react";
import { toast } from "sonner";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import SubmissionFeedback from "@/features/auth/components/submission-feedback";
import { useRouter } from "@/i18n/navigation";
import { changePasswordSchema } from "../schemas/change-password-schema";
import type { ChangePasswordFields } from "../types/change-password";
import useChangePassword from "../hooks/use-change-passsword";
import useDeleteAccount from "../hooks/use-delete-account";
import { DeleteAccountModal } from "./delete-account-button";

const FIELDS = [
  {
    name: "currentPassword",
    label: "current-password",
    autoComplete: "current-password",
  },
  { name: "newPassword", label: "new-password", autoComplete: "new-password" },
  {
    name: "confirmPassword",
    label: "confirm-password",
    autoComplete: "new-password",
  },
] as const;

export default function ChangePasswordForm() {
  // Translation
  const t = useTranslations("auth");

  // Navigation
  const router = useRouter();

  // Mutation
  const { mutate, isPending, error } = useChangePassword();
  const { mutate: deleteMutate, isPending: isDeleting } = useDeleteAccount();

  // Form & validation
  const form = useForm<ChangePasswordFields>({
    resolver: zodResolver(changePasswordSchema(t)),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Functions
  const onSubmit: SubmitHandler<ChangePasswordFields> = (values) => {
    mutate(values, {
      onSuccess: () => {
        toast.success(t("password-changed"));
        form.reset();
      },
    });
  };

  const handleDeleteAccount = () => {
    deleteMutate(undefined, {
      onSuccess: async () => {
        toast.success(t("account-deleted"));
        await signOut({ redirect: false });
        router.replace("/login");
      },
      onError: (err) => {
        toast.error(
          err.message === "403"
            ? t("delete-account-forbidden")
            : t("something-went-wrong"),
        );
      },
    });
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-4 w-full my-9 p-6"
    >
      {FIELDS.map(({ name, label, autoComplete }) => (
        <FieldGroup key={name}>
          <Controller
            name={name}
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={name}>{t(label)}</FieldLabel>
                <Input
                  {...field}
                  id={name}
                  type="password"
                  aria-invalid={fieldState.invalid}
                  autoComplete={autoComplete}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      ))}

      {error && (
        <SubmissionFeedback className="text-sm text-destructive">
          {error.message}
        </SubmissionFeedback>
      )}

      {/* Actions */}
      <div className="grid grid-cols-2 gap-4">
        <DeleteAccountModal
          onDelete={handleDeleteAccount}
          isPending={isDeleting}
        />
        <Button
          type="submit"
          isLoading={isPending}
          disabled={!form.formState.isDirty || isPending}
          className="w-full"
        >
          {t("update-password")}
        </Button>
      </div>
    </form>
  );
}
