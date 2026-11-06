"use client";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/shared/components/ui/field";
import { Button } from "@/shared/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/shared/components/ui/input-otp";
import { useRouter } from "@/i18n/navigation";
import { otpStepSchema } from "@/features/auth/schemes/auth.schema";
import type { OtpStepFields } from "@/features/auth/types/auth";
import SubmissionFeedback from "@/features/auth/components/submission-feedback";
import { OTP_COOLDOWN_TIME } from "@/shared/constants/auth.constant";
import { useLocalStorage } from "@/shared/hooks/use-local-storage";
import useConfirmEmailChange from "../hooks/use-confirm-email-change";
import useChangeEmail from "../hooks/use-change-email";
import { ResendOTP } from "@/shared/components/resend-otp";
import { useSession } from "next-auth/react";

type VerifyEmailStepProps = {
  email: string;
  onEdit: () => void;
  onSuccess: () => void;
  cooldownKey: string;
};

export default function VerifyEmailStep({
  email,
  onEdit,
  onSuccess,
  cooldownKey,
}: VerifyEmailStepProps) {
  //translation
  const t = useTranslations("auth");
  const PENDING_KEY = "email-change-pending";

  //hooks
  const router = useRouter();
  const { update } = useSession();

  //Mutation
  const { mutate: confirm, isPending, error } = useConfirmEmailChange();
  const { mutate: requestChange, isPending: isResending } = useChangeEmail();

  //Form
  const form = useForm<OtpStepFields>({
    resolver: zodResolver(otpStepSchema(t)),
    defaultValues: { otp: "" },
  });

  //Functions
  const onSubmit: SubmitHandler<OtpStepFields> = (values) => {
    confirm(
      { code: values.otp },
      {
        onSuccess: async () => {
          toast.success("Email updated");
          await update({ email });
          router.refresh();
          localStorage.removeItem(PENDING_KEY);
          onSuccess();
        },
      },
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-blue-600 font-semibold text-2xl font-inter mb-2">
          Verify OTP
        </h3>
        <p className="text-xs">
          Please enter the 6-digits code we have sent to: {email}.{" "}
          <button
            type="button"
            onClick={() => {
              localStorage.removeItem(PENDING_KEY);
              onEdit();
            }}
            className="text-blue-600 underline font-bold"
          >
            Edit
          </button>
        </p>
      </div>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-10"
      >
        {/*otp input */}
        <FieldGroup>
          <Controller
            name="otp"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="sr-only" htmlFor="otp">
                  {t("otp-label")}
                </FieldLabel>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    {Array.from({ length: 6 }).map((_, index) => (
                      <InputOTPSlot key={index} index={index} />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        {/*resend otp*/}

        <ResendOTP
          storageKey={cooldownKey}
          isPending={isResending}
          onResend={(callbacks) =>
            requestChange({ newEmail: email }, callbacks)
          }
        />

        {/*error message*/}
        {error && (
          <SubmissionFeedback className="text-sm text-destructive mt-2">
            {error.message}
          </SubmissionFeedback>
        )}

        <Button
          isLoading={isPending}
          type="submit"
          disabled={!form.formState.isValid && form.formState.isSubmitted}
          className="w-full"
        >
          Verify Code
        </Button>
      </form>
    </div>
  );
}
