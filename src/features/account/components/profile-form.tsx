"use client";

import { Controller, FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { PencilLine } from "lucide-react";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { PhoneInput } from "@/shared/components/ui/phone-input";
import { ChevronRight } from "@/assets/icons/chevron-right";
import { useRouter } from "@/i18n/navigation";
import SubmissionFeedback from "@/features/auth/components/submission-feedback";
import { profileSchema } from "../schemas/profile-schema";
import type { IProfile, ProfileFields, UpdateProfilePayload } from "../types/profile";
import useUpdateProfile from "../hooks/use-update-profile";
import ChangeEmailDialog from "./change-email-dialog";
import ProfileImageField from "./profile-image-field";

const toFormValues = (user: IProfile): ProfileFields => ({
  firstName: user.firstName,
  lastName: user.lastName,
  username: user.username,
  email: user.email,
  phone: `+20${user.phone.replace(/^0/, "")}`,
  profilePhoto: user.profilePhoto ?? "",
});

export default function ProfileForm({ user }: { user: IProfile }) {
  const t = useTranslations("auth");
  const router = useRouter();
  const { update } = useSession();

  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const { mutate: save, isPending, error } = useUpdateProfile();

  const form = useForm<ProfileFields>({
    resolver: zodResolver(profileSchema(t)),
    defaultValues: toFormValues(user),
  });

  useEffect(() => {
    form.reset(toFormValues(user));
  }, [user, form]);

  const onSubmit: SubmitHandler<ProfileFields> = (values) => {
    const { dirtyFields } = form.formState;
    const payload: UpdateProfilePayload = {};

    if (dirtyFields.firstName) payload.firstName = values.firstName;
    if (dirtyFields.lastName) payload.lastName = values.lastName;
    if (dirtyFields.phone) payload.phone = values.phone.replace(/^\+20/, "0");
    if (dirtyFields.profilePhoto) payload.profilePhoto = values.profilePhoto;

    if (Object.keys(payload).length === 0) return;

    save(payload, {
      onSuccess: async (updatedUser) => {
        toast.success(t("profile-updated"));
        await update({
          firstName: updatedUser.firstName,
          lastName: updatedUser.lastName,
          profilePhoto: updatedUser.profilePhoto,
          phone: updatedUser.phone,
        });
        router.refresh();
      },
    });
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-4 w-full my-9 p-6"
      >
        <div className="col-span-2">
          <ProfileImageField
            fallbackName={user.firstName}
            onUploadingChange={setIsUploading}
          />
        </div>

        {/* first name */}
        <FieldGroup>
          <Controller
            name="firstName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="firstName">{t("firstName")}</FieldLabel>
                <Input {...field} id="firstName" aria-invalid={fieldState.invalid}
                  placeholder="Ahmed" autoComplete="given-name" />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </FieldGroup>

        {/* last name */}
        <FieldGroup>
          <Controller
            name="lastName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="lastName">{t("lastName")}</FieldLabel>
                <Input {...field} id="lastName" aria-invalid={fieldState.invalid}
                  placeholder="Abdullah" autoComplete="family-name" />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </FieldGroup>

        {/* username */}
        <FieldGroup className="col-span-2">
          <Controller
            name="username"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="username">{t("userName")}</FieldLabel>
                <Input {...field} disabled id="username" aria-invalid={fieldState.invalid}
                  placeholder="user123" autoComplete="username" />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </FieldGroup>

        {/* email */}
        <FieldGroup className="col-span-2">
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <div className="flex items-center justify-between">
                  <FieldLabel htmlFor="email">{t("email-label")}</FieldLabel>
                  <button
                    type="button"
                    onClick={() => setIsEmailDialogOpen(true)}
                    className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
                  >
                    <PencilLine className="size-3.5" />
                    {t("change")}
                  </button>
                </div>
                <Input {...field} id="email" readOnly aria-invalid={fieldState.invalid}
                  placeholder="user@example.com" autoComplete="email" />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </FieldGroup>

        {/* phone */}
        <FieldGroup className="col-span-2">
          <Controller
            name="phone"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="phone">{t("phone")}</FieldLabel>
                <PhoneInput {...field} id="phone" aria-invalid={fieldState.invalid}
                  placeholder="1012345678" autoComplete="tel" />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </FieldGroup>

        {error && (
          <SubmissionFeedback className="col-span-2 text-sm text-destructive">
            {error.message}
          </SubmissionFeedback>
        )}

        <Button
          type="submit"
          isLoading={isPending}
          disabled={!form.formState.isDirty || isUploading || isPending}
          className="w-full col-span-2"
        >
          {t("save-changes")}
          <ChevronRight className="size-5" />
        </Button>

        <ChangeEmailDialog userId={user.id} open={isEmailDialogOpen} onOpenChange={setIsEmailDialogOpen} />
      </form>
    </FormProvider>
  );
}