"use client";

import { useState } from "react";

import { useTranslations } from "next-intl";

import { ForgotPasswordSteps, StepContent } from "../../types/auth";

import { FORGOT_PASSWORD_STEPS } from "@/shared/constants/auth.constant";

import ForgotPasswordEmailStep from "./forgot-password-email-step";
import PasswordResetSent from "./reset-link-step";
import ResetPassword from "./reset-password-step";
import { useSearchParams } from "next/navigation";
import { Button } from "@/shared/components/ui/button";
import { MoveLeft } from "@/assets/icons/move-left";
import { Link } from "@/i18n/navigation";

export default function ForgotPasswordLayout() {
  //Translations
  const t = useTranslations("auth");

  //Hooks
  const searchParams = useSearchParams();

  //variables
  const stepParam = searchParams.get("step");

  //State
  const [step, setStep] = useState<ForgotPasswordSteps>(
    stepParam === "reset-password"
      ? FORGOT_PASSWORD_STEPS.RESET_PASSWORD
      : FORGOT_PASSWORD_STEPS.EMAIL,
  );

  const [email, setEmail] = useState<string | null>(null);

  //Variables
  const steps: Record<ForgotPasswordSteps, StepContent> = {
    [FORGOT_PASSWORD_STEPS.EMAIL]: {
      title: t("forgot-password-title"),
      description: t("forgot-password-description"),
      form: <ForgotPasswordEmailStep setStep={setStep} setEmail={setEmail} />,
    },

    [FORGOT_PASSWORD_STEPS.RESET_SENT]: {
      title: t("password-reset-sent-title"),
      description: t.rich("password-reset-sent-description", {
        email: email || "",
        span: (chunk) => (
          <span className="font-mono text-blue-500 font-medium">{chunk}</span>
        ),
        button: (chunk) => (
          <Button
            variant="link"
            onClick={() => setStep(FORGOT_PASSWORD_STEPS.EMAIL)}
          >
            {chunk}
          </Button>
        ),
      }),

      form: <PasswordResetSent />,
    },

    [FORGOT_PASSWORD_STEPS.RESET_PASSWORD]: {
      title: t("create-new-password-title"),
      description: t("create-new-password-description"),
      form: <ResetPassword />,
    },
  };

  const currentStep = steps[step];

  return (
    <>
      {/* back button */}
      {FORGOT_PASSWORD_STEPS.RESET_SENT === step && (
        <Button
          className={"absolute -top-12 rtl:rotate-180"}
          variant="outline"
          size={"icon"}
          onClick={() => setStep(FORGOT_PASSWORD_STEPS.EMAIL)}
        >
          <MoveLeft />
        </Button>
      )}
      <h2 className="font-inter text-3xl font-bold text-gray-800 first-letter:capitalize">
        {currentStep.title}
      </h2>
      <p className="font-mono text-[1rem] max-w-md w-full mt-2.5 text-gray-500 font-medium">
        {currentStep.description}
      </p>

      {currentStep.form}
      {/*Support text */}
      <p
        className={`text-sm text-gray-500 font-medium mt-6 ${step === FORGOT_PASSWORD_STEPS.RESET_SENT ? "text-start" : "text-center"}`}
      >
        {t.rich("login-page-sub-text", {
          a: (chunk) => (
            <Link href="/create-account" className="text-blue-500">
              {chunk}
            </Link>
          ),
        })}
      </p>
    </>
  );
}
