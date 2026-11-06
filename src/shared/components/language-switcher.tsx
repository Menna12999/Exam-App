// language-switcher.tsx
"use client";

import { Check, Globe } from "lucide-react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { cn } from "../lib/utils/tailwind-merge";

const LANGUAGES = [
  { code: "ar", label: "العربية" },
  { code: "en", label: "English" },
] as const;

type LanguageSwitcherProps = {
  className?: string;
};

export default function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="outline"
            size="icon"
            aria-label="Change language"
            className={cn(
              "rounded-full border-blue-200 bg-transparent text-blue-600 hover:bg-blue-100 hover:text-blue-700",
              className,
            )}
          />
        }
      >
        <Globe className="size-4" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {LANGUAGES.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            className="flex items-center justify-between gap-6"
            onClick={() => router.replace(pathname, { locale: lang.code })}
          >
            <span>{lang.label}</span>
            {locale === lang.code && <Check className="size-4 text-blue-500" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
