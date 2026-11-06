"use client";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  CreateAccountSteps,
  EmailStepFields,
  LoginFields,
  Translations,
} from "../../types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import useLogin from "../../hooks/use-login";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { Dispatch, SetStateAction } from "react";
import {
  CREATE_ACCOUNT_STEPS,
  OTP_COOLDOWN_TIME,
} from "@/shared/constants/auth.constant";
import { ChevronRight } from "@/assets/icons/chevron-right";
import { emailStepSchema } from "../../schemes/auth.schema";
import useSendOtp from "../../hooks/use-send-otp";
import { toast } from "sonner";
import { useLocalStorage } from "@/shared/hooks/use-local-storage";
import { Link } from "@/i18n/navigation";
import SubmissionFeedback from "../submission-feedback";

interface EmailStepProps {
  setStep: Dispatch<SetStateAction<CreateAccountSteps>>;
  setEmail: Dispatch<SetStateAction<string | null>>;
}
export default function EmailStep({ setStep, setEmail }: EmailStepProps) {

  //translation
  const t = useTranslations("auth");

  //Hooks
  const {
    setValue,
    storedValue: otpCooldown,
    removeValue,
  } = useLocalStorage("otp-cooldown", null);

  //Mutation
  const { mutate: sendOtp, isPending, error } = useSendOtp();

  //Form
  const form = useForm<EmailStepFields>({
    resolver: zodResolver(emailStepSchema(t)),
    defaultValues: {
      email: "",
    },
  });
  
  //Functions
  const onSubmit: SubmitHandler<EmailStepFields> = (values) => {
    if (otpCooldown) {
      const timeRemaining =
        Math.floor(new Date(otpCooldown).getTime() - Date.now()) / 1000;

      if (timeRemaining > 0) {
        // store email in parent state
        setEmail(values.email);

        //move to the next step (if the cooldown hasn't expired)
        setStep(CREATE_ACCOUNT_STEPS.OTP);
        return;
      }

      // remove otp cooldown
      removeValue();
    }
    sendOtp(values, {
      onSuccess: () => {
        // store email in parent state
        setEmail(values.email);

        //SET THE OTP COOLDOWN

        const nextAllowedTime = new Date(Date.now() + OTP_COOLDOWN_TIME);
        setValue(nextAllowedTime.toISOString());

        // move to OTP step only after OTP is successfully sent
        setStep(CREATE_ACCOUNT_STEPS.OTP);

        // show success message
        toast.success(t("otp-sent-successfully"));
      },
    });
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-10"
    >
      {/*user email */}
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
      {/*Support text */}
      <p className="text-sm text-gray-500 font-medium text-center">
        {t.rich("register-page-sub-text", {
          a: (chunk) => (
            <Link href="/login" className="text-blue-500">
              {chunk}
            </Link>
          ),
        })}
      </p>
    </form>
  );
}
