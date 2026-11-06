"use client";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { LoginFields } from "../../types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import useLogin from "../../hooks/use-login";
import { loginSchema } from "../../schemes/auth.schema";
import { Link } from "@/i18n/navigation";
import SubmissionFeedback from "../submission-feedback";
import { useTranslations } from "next-intl";

export default function LoginForm() {

  //Translations
  const t = useTranslations("auth");

  //Mutation
  const { mutate: login, isPending, error } = useLogin();
  
  //Form
  const form = useForm<LoginFields>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  //Functions
  const onSubmit: SubmitHandler<LoginFields> = (values) => {
    login(values);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      {/*user name */}
      <FieldGroup>
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
                id="password"
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
      <Link
        href="/forgot-password"
        className="-mt-1.5 block text-blue-600 font-medium text-sm text-end mb-4"
      >
        {t("forgotPassword")}
      </Link>
      {/*submit feedback */}
      <SubmissionFeedback className="mt-6">{error?.message}</SubmissionFeedback>
      <Button
        type="submit"
        disabled={
          isPending || (!form.formState.isValid && form.formState.isSubmitted)
        }
        className={"w-full mb-9 mt-6"}
      >
        {t("login-title")}
      </Button>
    </form>
  );
}
