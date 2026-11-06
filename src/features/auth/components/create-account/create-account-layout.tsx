"use client";

import { useState } from "react";
import { CREATE_ACCOUNT_STEPS } from "@/shared/constants/auth.constant";
import {
  AccountInfoFields,
  CreateAccountSteps,
  StepContent,
} from "../../types/auth";
import { useTranslations } from "next-intl";
import { Button } from "@/shared/components/ui/button";
import EmailStep from "./email-step";
import OtpStep from "./otp-step";
import AccountInfoStep from "./account-info-step";
import CreatePassword from "./create-password";
import { MoveLeft } from "lucide-react";
import { Progress } from "@/shared/components/ui/progress";

export default function CreateAccountLayout() {
  //translation
  const t = useTranslations("auth");

  //state
  const [step, setStep] = useState<CreateAccountSteps>(
    CREATE_ACCOUNT_STEPS.EMAIL,
  );
  const [email, setEmail] = useState<string | null>(null);
  const [accountInfo, setAccountInfo] = useState<AccountInfoFields | null>(
    null,
  );

  //Varriables
  const steps: Record<CreateAccountSteps, StepContent> = {
    [CREATE_ACCOUNT_STEPS.EMAIL]: {
      form: <EmailStep setStep={setStep} setEmail={setEmail} />,
    },
    [CREATE_ACCOUNT_STEPS.OTP]: {
      subTitle: t("create-account-step-two-sub-title"),
      description: t.rich("create-account-step-two-description", {
        email: email || "",
        span: (chunk) => (
          <span className="font-mono text-gray-800 font-medium">{chunk}</span>
        ),
        button: (chunk) => (
          <Button
            variant="link"
            onClick={() => setStep(CREATE_ACCOUNT_STEPS.EMAIL)}
          >
            {chunk}
          </Button>
        ),
      }),

      form: <OtpStep setStep={setStep} email={email} />,
    },
    [CREATE_ACCOUNT_STEPS.ACCOUNT_INFO]: {
      subTitle: t("create-account-step-three-sub-title"),
      form: (
        <AccountInfoStep setStep={setStep} setAccountInfo={setAccountInfo} />
      ),
    },
    [CREATE_ACCOUNT_STEPS.CREATE_PASSWORD]: {
      subTitle: t("create-account-step-four-sub-title"),
      form: <CreatePassword email={email} accountInfo={accountInfo} />,
    },
  };

  return (
    <>
      {/* back button */}
      {CREATE_ACCOUNT_STEPS.OTP === step && (
        <Button
          className={"absolute -top-20 rtl:rotate-180"}
          variant="outline"
          size={"icon"}
          onClick={() => setStep(CREATE_ACCOUNT_STEPS.EMAIL)}
        >
          <MoveLeft />
        </Button>
      )}

      {/* progress bar */}
      {step !== CREATE_ACCOUNT_STEPS.EMAIL && (
        <Progress
          value={
            step === CREATE_ACCOUNT_STEPS.OTP
              ? 2
              : step === CREATE_ACCOUNT_STEPS.ACCOUNT_INFO
                ? 3
                : 4
          }
          variant="steps"
          className="mb-8"
          max={4}
        />
      )}

      {/*Heading */}
      <h1 className="font-inter text-2xl font-bold text-gray-800 capitalize">
        {t("create-account-title")}
      </h1>

      {steps[step].subTitle && (
        <h2 className="font-inter text-2xl font-bold text-blue-600 first-letter:capitalize">
          {steps[step].subTitle}
        </h2>
      )}
      {steps[step].description && (
        <p className="font-mono text-sm max-w-md w-full mt-2.5 text-gray-500 font-medium">
          {steps[step].description}
        </p>
      )}
      {steps[step].form}
    </>
  );
}
