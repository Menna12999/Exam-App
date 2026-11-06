"use client";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { EmailStepFields, ForgotPasswordSteps } from "../../types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import Link from "next/link";
import { Button } from "@/shared/components/ui/button";
import { useTranslations } from "next-intl";
import { Dispatch, SetStateAction } from "react";
import { ChevronRight } from "@/assets/icons/chevron-right";
import { toast } from "sonner";
import useSendResetLink from "../../hooks/use-send-reset-link";
import { emailStepSchema } from "../../schemes/auth.schema";
import { FORGOT_PASSWORD_STEPS } from "@/shared/constants/auth.constant";
import SubmissionFeedback from "../submission-feedback";

interface EmailStepProps {
  setStep: Dispatch<SetStateAction<ForgotPasswordSteps>>;
  setEmail: Dispatch<SetStateAction<string | null>>;
}
export default function ForgetPasswordEmailStep({
  setStep,
  setEmail,
}: EmailStepProps) {
  //translation
  const t = useTranslations("auth");

  //Mutation
  const { mutate: sendResetLink, isPending, error } = useSendResetLink();
  //Form
  const form = useForm<EmailStepFields>({
    resolver: zodResolver(emailStepSchema(t)),
    defaultValues: {
      email: "",
    },
  });
  //Functions
  const onSubmit: SubmitHandler<EmailStepFields> = (values) => {
    sendResetLink(values, {
      onSuccess: () => {
        // store email in parent state
        setEmail(values.email);

        // move to the next step
        setStep(FORGOT_PASSWORD_STEPS.RESET_SENT);

        // show success message
        toast.success(t("reset-link-sent-successfully"));
      },
    });
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-10"
    >
      {/*email*/}
      <FieldGroup>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              {/*label*/}
              <FieldLabel htmlFor="email">{t("email-label")}</FieldLabel>
              {/*input*/}
              <Input
                {...field}
                id="email"
                aria-invalid={fieldState.invalid}
                placeholder="user@example.com"
                autoComplete="email"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      {/*error message*/}
      {error && (
        <SubmissionFeedback className="text-sm text-destructive">
          {error.message}
        </SubmissionFeedback>
      )}
      <Button
        isLoading={isPending}
        type="submit"
        disabled={!form.formState.isValid && form.formState.isSubmitted}
        className={"w-full"}
      >
        {t("next")}
        <ChevronRight className="size-5" />
      </Button>
    </form>
  );
}
