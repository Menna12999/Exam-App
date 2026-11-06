"use client";

import { useEffect, useRef, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useTranslations } from "next-intl";
import { Camera, X } from "lucide-react";
import { Field, FieldError } from "@/shared/components/ui/field";
import { Progress } from "@/shared/components/ui/progress";
import useUploadImage from "@/shared/hooks/use-upload-image";
import { imageSchema } from "@/shared/schemes/image.schema";
import type { ProfileFields } from "../types/profile";

type Props = {
  fallbackName: string;
  onUploadingChange?: (isUploading: boolean) => void;
};

export default function ProfileImageField({
  fallbackName,
  onUploadingChange,
}: Props) {
  const t = useTranslations("auth");
  const { control, setValue, setError, clearErrors, formState } =
    useFormContext<ProfileFields>();

  const photo = useWatch({ control, name: "profilePhoto" });
  const { isPending, mutate: uploadImage, uploadProgress } = useUploadImage();
  const [preview, setPreview] = useState<string>();
  const inputRef = useRef<HTMLInputElement>(null);

  const originalPhoto = formState.defaultValues?.profilePhoto || "";

  useEffect(() => {
    onUploadingChange?.(isPending);
  }, [isPending, onUploadingChange]);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    const parsed = imageSchema.safeParse({ image: file });
    if (!parsed.success) {
      setError("profilePhoto", { message: parsed.error.issues[0].message });
      return;
    }
    clearErrors("profilePhoto");

    setPreview(URL.createObjectURL(file));
    uploadImage(
      { image: file },
      {
        onSuccess: (data) =>
          setValue("profilePhoto", data?.url, { shouldDirty: true }),
        onError: (error) => {
          setPreview(undefined);
          setError("profilePhoto", { message: error.message });
        },
      },
    );
  };

  const handleRemove = () => {
    clearErrors("profilePhoto");

    const hasNewPhoto = !!preview || (photo || "") !== originalPhoto;

    if (hasNewPhoto) {
      setPreview(undefined);
      setValue("profilePhoto", originalPhoto, { shouldDirty: false });
      return;
    }

    setValue("profilePhoto", "", { shouldDirty: true });
  };

  const src = preview ?? (photo || undefined);

  return (
    <Field
      data-invalid={!!formState.errors.profilePhoto}
      className="items-center"
    >
      <div className="relative size-44 overflow-hidden rounded-2xl border bg-muted shadow-sm">
        {src ? (
          <img src={src} alt="" className="size-full object-cover" />
        ) : (
          <div className="grid size-full place-items-center bg-blue-100 text-6xl font-semibold text-blue-600">
            {fallbackName.charAt(0).toUpperCase()}
          </div>
        )}

        {src && (
          <button
            type="button"
            onClick={handleRemove}
            disabled={isPending}
            aria-label={t("removePhoto")}
            className="absolute end-2 top-2 grid size-8 place-items-center rounded-full border border-white/30 bg-black/50 text-white backdrop-blur-sm transition hover:bg-black/70 disabled:opacity-50"
          >
            <X className="size-4" />
          </button>
        )}

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={isPending}
          aria-label={t("changePhoto")}
          className="absolute bottom-2 end-2 grid size-9 place-items-center rounded-full border border-white/30 bg-black/50 text-white backdrop-blur-sm transition hover:bg-black/70 disabled:opacity-50"
        >
          <Camera className="size-4" />
        </button>

        <input
          ref={inputRef}
          id="profilePhoto"
          type="file"
          accept="image/jpeg,image/png"
          onChange={handleChange}
          className="hidden"
        />
      </div>

      {isPending && <Progress value={uploadProgress} className="h-2 w-44" />}
      <FieldError errors={[formState.errors.profilePhoto]} />
    </Field>
  );
}