"use client";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  AccountInfoFields,
  CreatePasswordFields,
  RegisterFields,
  ResetPasswordFields,
} from "../../types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createPasswordSchema,
  resetPasswordSchema,
} from "../../schemes/auth.schema";
import { useTranslations } from "next-intl";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import Link from "next/link";
import { Button } from "@/shared/components/ui/button";
import useResetPassword from "../../hooks/use-reset-password";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useRouter } from "@/i18n/navigation";
import SubmissionFeedback from "../submission-feedback";

export default function CreatePassword() {
  //translation
  const t = useTranslations("auth");

  //Mutation
  const { mutate: resetPassword, isPending, error } = useResetPassword();

  //hooks
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  //Form
  const form = useForm<ResetPasswordFields>({
    resolver: zodResolver(resetPasswordSchema(t)),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  //Functions
  const onSubmit: SubmitHandler<ResetPasswordFields> = (values) => {
    console.log(values);
    if (!token) {
      return;
    }

    resetPassword(
      {
        ...values,
        token,
      },
      {
        onSuccess: () => {
          toast.success(t("reset-password-successfully"));
          router.push("/login");
        },
      },
    );
  };
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      {/*password */}
      <FieldGroup>
        <Controller
          name="newPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              {/*label*/}
              <FieldLabel htmlFor="password">{t("new-password")}</FieldLabel>
              {/*input*/}
              <Input
                {...field}
                id="password"
                type="password"
                aria-invalid={fieldState.invalid}
                placeholder="*************"
                autoComplete="current-password"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      {/*confirm password */}
      <FieldGroup>
        <Controller
          name="confirmPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              {/*label*/}
              <FieldLabel htmlFor="confirmPassword">
                {t("confirm-new-password")}
              </FieldLabel>
              {/*input*/}
              <Input
                {...field}
                id="confirmPassword"
                type="password"
                aria-invalid={fieldState.invalid}
                placeholder="*************"
                autoComplete="current-password"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      {/*submit feedback */}
      {error && (
        <SubmissionFeedback className="mt-6">
          {error?.message}
        </SubmissionFeedback>
      )}
      <Button
        isLoading={isPending}
        type="submit"
        disabled={!form.formState.isValid && form.formState.isSubmitted}
        className={"w-full mb-9 mt-6"}
      >
        {t("reset-password")}
      </Button>
    </form>
  );
}
