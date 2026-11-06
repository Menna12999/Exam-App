"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Button } from "@/shared/components/ui/button";
import { useLocalStorage } from "@/shared/hooks/use-local-storage";
import { OTP_COOLDOWN_TIME } from "@/shared/constants/auth.constant";

type ResendOTPProps = {
  onResend: (callbacks: {
    onSuccess: () => void;
    onError: (error: Error) => void;
  }) => void;
  isPending: boolean;
  storageKey: string;
};

const getRemaining = (value: string | null) =>
  value
    ? Math.max(0, Math.ceil((new Date(value).getTime() - Date.now()) / 1000))
    : 0;

export function ResendOTP({ onResend, isPending, storageKey }: ResendOTPProps) {
  //translation
  const t = useTranslations("auth");

  //Hooks
  const {
    storedValue: otpCooldown,
    setValue,
    removeValue,
  } = useLocalStorage(storageKey, null);

  //state
  const [countdown, setCountdown] = useState<number>(() =>
    getRemaining(otpCooldown),
  );

  //Functions
  const startCooldown = () => {
    const nextAllowedTime = new Date(Date.now() + OTP_COOLDOWN_TIME);
    setValue(nextAllowedTime.toISOString());
    setCountdown(Math.ceil(OTP_COOLDOWN_TIME / 1000));
  };

  const handleResendOtp = () => {
    onResend({
      onSuccess: () => {
        startCooldown();
        toast.success(t("otp-resend-success"));
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  //Effects
  useEffect(() => {
    if (!otpCooldown) {
      setCountdown(0);
      return;
    }

    const tick = () => {
      const remaining = getRemaining(otpCooldown);
      setCountdown(remaining);
      if (remaining <= 0) {
        clearInterval(interval);
        removeValue();
      }
    };

    const interval = setInterval(tick, 1000);
    tick(); 

    return () => clearInterval(interval);
  }, [otpCooldown, removeValue]);

  if (countdown > 0)
    return (
      <p className="text-sm text-muted-foreground font-medium text-center">
        {t("otp-resend-cooldown", { seconds: countdown })}
      </p>
    );

  return (
    <p className="text-sm text-muted-foreground font-medium flex items-center justify-center">
      {t.rich("otp-resend-label", {
        button: (chunk) => (
          <Button
            type="button"
            isLoading={isPending}
            onClick={handleResendOtp}
            variant={"link"}
            className={"text-primary h-fit"}
          >
            {chunk}
          </Button>
        ),
      })}
    </p>
  );
}