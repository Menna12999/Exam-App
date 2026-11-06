import React, { Dispatch, SetStateAction } from "react";
import { ForgotPasswordSteps } from "../../types/auth";
import { useTranslations } from "next-intl";


export default function PasswordResetSent() {
  //translation
  const t = useTranslations("auth");

  return (
    <>
      <p className="text-[1rem]">{t("check-inbox")}</p>
      <p className="text-sm max-w-md w-full mt-2.5 text-gray-500 font-medium">
        {t("check-spam")}
      </p>
    </>
  );
}
