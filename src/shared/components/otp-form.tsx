"use client";

import SubmissionFeedback from "@/features/auth/components/submission-feedback";
import { otpStepSchema } from "@/features/auth/schemes/auth.schema";
import { OtpStepFields } from "@/features/auth/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Controller, useForm } from "react-hook-form";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/shared/components/ui/field";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/input-otp";
import { Button } from "./ui/button";
import { ResendOTP } from "./resend-otp";

type OtpFormProps = {
  onVerify: (code: string) => void;
  isVerifying: boolean;
  error?: string;
  onResend: (callbacks: {
    onSuccess: () => void;
    onError: (e: Error) => void;
  }) => void;
  isResending: boolean;
  cooldownKey: string;
  submitLabel: string;
};

export default function OtpForm({
  onVerify,
  isVerifying,
  error,
  onResend,
  isResending,
  cooldownKey,
  submitLabel,
}: OtpFormProps) {
  //translation
  const t = useTranslations("auth");

  //form
  const form = useForm<OtpStepFields>({
    resolver: zodResolver(otpStepSchema(t)),
    defaultValues: { otp: "" },
  });

  return (
    <form
      onSubmit={(e) => {
        e.stopPropagation();
        form.handleSubmit((values) => onVerify(values.otp))(e);
      }}
      className="flex flex-col gap-10"
    >
      {/*otp input */}
      <FieldGroup>
        <Controller
          name="otp"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              {/*label*/}
              <FieldLabel className="sr-only" htmlFor="otp">
                {t("otp-label")}
              </FieldLabel>
              {/*input*/}
              <InputOTP maxLength={6} {...field}>
                <InputOTPGroup>
                  {Array.from({ length: 6 }).map((_, index) => (
                    <InputOTPSlot key={index} index={index} />
                  ))}
                </InputOTPGroup>
              </InputOTP>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <ResendOTP
        onResend={onResend}
        isPending={isResending}
        storageKey={cooldownKey}
      />

      {error && (
        <SubmissionFeedback className="text-sm text-destructive mt-2">
          {error}
        </SubmissionFeedback>
      )}

      <Button type="submit" isLoading={isVerifying} className="w-full">
        {submitLabel}
      </Button>
    </form>
  );
}
