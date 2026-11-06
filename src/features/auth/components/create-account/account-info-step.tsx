"use client";

import { Dispatch, SetStateAction } from "react";
import { AccountInfoFields, CreateAccountSteps } from "../../types/auth";
import { useTranslations } from "next-intl";
import { accountInfoSchema } from "../../schemes/auth.schema";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CREATE_ACCOUNT_STEPS } from "@/shared/constants/auth.constant";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { ChevronRight } from "@/assets/icons/chevron-right";
import { PhoneInput } from "@/shared/components/ui/phone-input";

interface AccountInfoStepProps {
  setStep: Dispatch<SetStateAction<CreateAccountSteps>>;
  setAccountInfo: Dispatch<SetStateAction<AccountInfoFields | null>>;
}
export default function AccountInfoStep({
  setStep,
  setAccountInfo,
}: AccountInfoStepProps) {
  //translation
  const t = useTranslations("auth");

  //Form
  const form = useForm<AccountInfoFields>({
    resolver: zodResolver(accountInfoSchema(t)),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      phone: "",
    },
  });

  //Functions
  const onSubmit: SubmitHandler<AccountInfoFields> = (values) => {
    console.log(values);

    setAccountInfo(values);
    setStep(CREATE_ACCOUNT_STEPS.CREATE_PASSWORD);
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="grid grid-cols-2 gap-4 max-w-md w-full my-9"
    >
      {/*first name */}
      <FieldGroup>
        <Controller
          name="firstName"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              {/*label*/}
              <FieldLabel htmlFor="firstName">{t("firstName")}</FieldLabel>
              {/*input*/}
              <Input
                {...field}
                id="firstName"
                aria-invalid={fieldState.invalid}
                placeholder="Ahmed"
                autoComplete="given-name"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      {/*last name */}
      <FieldGroup>
        <Controller
          name="lastName"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              {/*label*/}
              <FieldLabel htmlFor="lastName">{t("lastName")}</FieldLabel>
              {/*input*/}
              <Input
                {...field}
                id="lastName"
                aria-invalid={fieldState.invalid}
                placeholder="Abdullah"
                autoComplete="family-name"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      {/*user name */}
      <FieldGroup className="col-span-2">
        <Controller
          name="username"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              {/*label*/}
              <FieldLabel htmlFor="username">{t("userName")}</FieldLabel>
              {/*input*/}
              <Input
                {...field}
                id="username"
                aria-invalid={fieldState.invalid}
                placeholder="user123"
                autoComplete="username"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <FieldGroup className="col-span-2">
        <Controller
          name="phone"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              {/*label*/}
              <FieldLabel htmlFor="phone">{t("phone")}</FieldLabel>
              {/*input*/}
              <PhoneInput
                {...field}
                id="phone"
                aria-invalid={fieldState.invalid}
                placeholder="1012345678"
                autoComplete="tel"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <Button
        type="submit"
        disabled={!form.formState.isValid && form.formState.isSubmitted}
        className={"w-full col-span-2"}
      >
        {t("next")}
        <ChevronRight className="size-5" />
      </Button>
    </form>
  );
}
