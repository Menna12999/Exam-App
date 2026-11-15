import {
  BookOpenCheck,
  Brain,
  FolderCode,
  RectangleEllipsis,
} from "lucide-react";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/shared/components/language-switcher";
import { cn } from "@/shared/lib/utils/tailwind-merge";

export default function AuthSideLayout() {
  // Translation
  const t = useTranslations("side");

  // Variables
  const features = [
    {
      icon: Brain,
      title: t("features.diplomas.title"),
      description: t("features.diplomas.description"),
    },
    {
      icon: BookOpenCheck,
      title: t("features.exams.title"),
      description: t("features.exams.description"),
    },
    {
      icon: RectangleEllipsis,
      title: t("features.forms.title"),
      description: t("features.forms.description"),
    },
  ];

  return (
    <aside
      className={cn(
        "relative flex items-center justify-center overflow-hidden p-16",
        "before:absolute before:top-24 before:-right-16 before:-z-10 before:size-80 before:rounded-full before:bg-blue-200 before:blur-3xl",
        "after:absolute after:-bottom-24 after:-left-16 after:-z-10 after:size-80 after:rounded-full after:bg-blue-200 after:blur-3xl",
      )}
    >
      <div className="z-10 flex h-full max-h-160 max-w-120 flex-col justify-between">
        <header className="flex items-center gap-2 text-xl font-semibold text-blue-600">
          {/* Logo */}
          <FolderCode className="size-8" />
          {/* App name */}
          {t("app-name")}
          {/* Language switcher */}
          <LanguageSwitcher className="ms-auto" />
        </header>

        {/* Content */}
        <div className="flex h-120 flex-col justify-between">
          {/* Headline */}
          <p className="font-inter text-3xl font-bold text-gray-800">
            {t("headline")}
          </p>

          {/* Features */}
          <ul className="space-y-9">
            {features.map(({ icon: Icon, title, description }) => (
              <li key={title} className="flex gap-5">
                {/* Icon */}
                <span className="flex size-9 shrink-0 items-center justify-center border-2 border-blue-600 text-blue-600">
                  <Icon className="size-6" />
                </span>

                <div className="space-y-2.5">
                  <p className="text-xl font-semibold text-blue-600">{title}</p>
                  <p className="text-gray-500">{description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}