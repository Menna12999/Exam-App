"use client";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  CreateAccountSteps,
  LoginFields,
  OtpStepFields,
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
import Link from "next/link";
import { Button } from "@/shared/components/ui/button";
import useLogin from "../../hooks/use-login";
import { z } from "zod";
import { useTranslations } from "next-intl";
import {
  Dispatch,
  SetStateAction,
  use,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  CREATE_ACCOUNT_STEPS,
  OTP_COOLDOWN_TIME,
} from "@/shared/constants/auth.constant";
import { ChevronRight } from "@/assets/icons/chevron-right";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/shared/components/ui/input-otp";
import { otpStepSchema } from "../../schemes/auth.schema";
import useSendOtp from "../../hooks/use-send-otp";
import useVerifyOtp from "../../hooks/use-verify-otp";
import { verifyOtpAction } from "../../lib/actions/auth.action";
import { MoveLeft } from "@/assets/icons/move-left";
import { toast } from "sonner";
import { useLocalStorage } from "@/shared/hooks/use-local-storage";
import SubmissionFeedback from "../submission-feedback";
import { ResendOTP } from "@/shared/components/resend-otp";

interface OtpStepProps {
  setStep: Dispatch<SetStateAction<CreateAccountSteps>>;
  email: string | null;
}

export default function OtpStep({ setStep, email }: OtpStepProps) {
  //translation
  const t = useTranslations("auth");

  //Mutation
  const {
    mutate: verifyOtp,
    isPending: isVerifyingOtp,
    error: verifyOtpError,
  } = useVerifyOtp();

  const { mutate: sendOtp, isPending: isSending } = useSendOtp();

  //Form
  const form = useForm<OtpStepFields>({
    resolver: zodResolver(otpStepSchema(t)),
    defaultValues: {
      otp: "",
    },
  });

  //Functions
  const onSubmit: SubmitHandler<OtpStepFields> = (values) => {
    if (!email) return;

    verifyOtp(
      {
        email,
        code: values.otp,
      },
      {
        onSuccess: () => {
          setStep(CREATE_ACCOUNT_STEPS.ACCOUNT_INFO);
        },
      },
    );
  };

  return (
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

      {/*resend otp*/}

      {email && (
        <ResendOTP
          storageKey="otp-cooldown"
          isPending={isSending}
          onResend={(callbacks) => sendOtp({ email }, callbacks)}
        />
      )}

      {/*error message*/}
      {verifyOtpError && (
        <SubmissionFeedback className="text-sm text-destructive mt-2">
          {verifyOtpError.message}
        </SubmissionFeedback>
      )}
      <Button
        isLoading={isVerifyingOtp}
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

// function ResendOTP({ email }: { email: string | null }) {
//   //translation
//   const t = useTranslations("auth");

//   //Hooks
//   const {
//     storedValue: otpCooldown,
//     setValue,
//     removeValue,
//   } = useLocalStorage(
//     "otp-cooldown",
//     new Date(Date.now() + OTP_COOLDOWN_TIME).toISOString(),
//   );

//   //state
//   const [countdown, setCountdown] = useState<number>(() => {
//     if (!otpCooldown) return 0;
//     const cooldown = new Date(otpCooldown);
//     const remainingTime = Math.floor(
//       (cooldown.getTime() - new Date().getTime()) / 1000,
//     );
//     return remainingTime;
//   });

//   //Mutation
//   const { mutate: sendOtp, isPending: isSendingOtp } = useSendOtp();

//   //Functions
//   const setCooldown = (cooldown: Date) => {
//     const nextAllowedTime = new Date(cooldown.getTime() + OTP_COOLDOWN_TIME);
//     setValue(nextAllowedTime.toISOString());
//     setCountdown(OTP_COOLDOWN_TIME / 1000);
//   };
//   const handleResendOtp = () => {
//     if (!email) return;
//     sendOtp(
//       { email },
//       {
//         onSuccess: () => {
//           //set otp cooldown
//           setCooldown(new Date());
//           //show success message
//           toast.success(t("otp-resend-success"));
//         },
//         onError: (error) => {
//           toast.error(error.message);
//         },
//       },
//     );
//   };

//   //Effects
//   useEffect(() => {
//     let interval: NodeJS.Timeout;
//     if (otpCooldown) {
//       interval = setInterval(() => {
//         setCountdown((prev) => {
//           if (prev <= 0) {
//             clearInterval(interval);
//             removeValue();
//             return 0;
//           }

//           return prev - 1;
//         });
//       }, 1000);

//       return () => clearInterval(interval);
//     }
//   }, [otpCooldown, removeValue]);

//   if (countdown > 0)
//     return (
//       <p className="text-sm text-muted-foreground font-medium text-center">
//         {t("otp-resend-cooldown", {
//           seconds: countdown,
//         })}
//       </p>
//     );
//   return (
//     <p className="text-sm text-muted-foreground  font-medium  flex items-center justify-center">
//       {t.rich("otp-resend-label", {
//         button: (chunk) => (
//           <Button
//             type="button"
//             isLoading={isSendingOtp}
//             onClick={handleResendOtp}
//             variant={"link"}
//             className={"text-primary h-fit"}
//           >
//             {chunk}
//           </Button>
//         ),
//       })}
//     </p>
//   );
// }
