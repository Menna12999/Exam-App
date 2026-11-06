"use client";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  AccountInfoFields,
  CreatePasswordFields,
  RegisterFields,
} from "../../types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPasswordSchema } from "../../schemes/auth.schema";
import { useTranslations } from "next-intl";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import Link from "next/link";
import { Button } from "@/shared/components/ui/button";
import useRegister from "../../hooks/use-register";
import { parsePhoneNumber } from "react-phone-number-input";
import SubmissionFeedback from "../submission-feedback";

interface CreatePasswordProps {
  email: string | null;
  accountInfo: AccountInfoFields | null;
}
export default function CreatePassword({
  email,
  accountInfo,
}: CreatePasswordProps) {

  //translation
  const t = useTranslations("auth");

  //Mutation
  const { register, isPending, error } = useRegister();

  //Form
  const form = useForm<CreatePasswordFields>({
    resolver: zodResolver(createPasswordSchema(t)),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  //Functions
  const onSubmit: SubmitHandler<RegisterFields> = (values) => {
    const payload = {
      email,
      ...accountInfo,
      password: values.password,
      confirmPassword: values.confirmPassword,
    };

    const parsedPhoneNumber = parsePhoneNumber(payload.phone);
    if (!parsedPhoneNumber) {
      form.setError("phone", { message: t("invalid-phone") });
      return;
    }

    payload.phone = `0${parsedPhoneNumber.nationalNumber}`;

    register(payload);
  };
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      {/*password */}
      <FieldGroup>
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              {/*label*/}
              <FieldLabel htmlFor="password">{t("password")}</FieldLabel>
              {/*input*/}
              <Input
                {...field}
                id="[password"
                type="password"
                aria-invalid={fieldState.invalid}
                placeholder="*************"
                autoComplete="current-password"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      {/*confirm password */}
      <FieldGroup>
        <Controller
          name="confirmPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              {/*label*/}
              <FieldLabel htmlFor="confirmPassword">
                {t("confirm-password")}
              </FieldLabel>
              {/*input*/}
              <Input
                {...field}
                id="confirmPassword"
                type="password"
                aria-invalid={fieldState.invalid}
                placeholder="*************"
                autoComplete="current-password"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      {/*submit feedback */}
      {error && (
        <SubmissionFeedback className="mt-6">
          {error?.message}
        </SubmissionFeedback>
      )}
      <Button
        isLoading={isPending}
        type="submit"
        disabled={!form.formState.isValid && form.formState.isSubmitted}
        className={"w-full mb-9 mt-6"}
      >
        {t("create-account-title")}
      </Button>
    </form>
  );
}
