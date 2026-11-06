"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { ChevronRight } from "@/assets/icons/chevron-right";
import { emailStepSchema } from "@/features/auth/schemes/auth.schema";
import type { EmailStepFields } from "@/features/auth/types/auth";
import useChangeEmail from "../hooks/use-change-email";
import { OTP_COOLDOWN_TIME } from "@/shared/constants/auth.constant";
import SubmissionFeedback from "@/features/auth/components/submission-feedback";

type Props = { defaultEmail: string; onEmailSent: (email: string) => void };

export default function NewEmailStep({ defaultEmail, onEmailSent }: Props) {
  const t = useTranslations("auth");
  const { mutate, isPending, error } = useChangeEmail();

  const form = useForm<EmailStepFields>({
    resolver: zodResolver(emailStepSchema(t)),
    defaultValues: { email: defaultEmail },
  });

  const onSubmit = (values: EmailStepFields) => {
    mutate(
      { newEmail: values.email },
      {
        onSuccess: () => {
          localStorage.setItem(
            "otp-cooldown",
            new Date(Date.now() + OTP_COOLDOWN_TIME).toISOString(),
          );
          onEmailSent(values.email);
        },
      },
    );
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <h3 className="text-blue-600 font-semibold text-2xl font-inter">
        Enter your new email
      </h3>

      <FieldGroup>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="new-email">{t("email-label")}</FieldLabel>
              <Input
                {...field}
                id="new-email"
                placeholder="user@example.com"
                autoComplete="email"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      {error && (
        <SubmissionFeedback className="text-sm text-destructive mt-2">
          {error.message}
        </SubmissionFeedback>
      )}

      <Button type="submit" isLoading={isPending} className="w-full">
        {t("next")} <ChevronRight className="size-5" />
      </Button>
    </form>
  );
}
