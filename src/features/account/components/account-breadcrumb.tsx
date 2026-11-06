"use client";

import { usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { AppBreadcrumb } from "@/shared/components/app-breadcrumb";

export const ACCOUNT_PAGES = [
  { href: "/account", labelKey: "account" },
  { href: "/account/change-password", labelKey: "change-password" },
] as const;

export default function AccountBreadcrumb() {
    //translations
   const t = useTranslations("auth");

   //hooks
  const pathname = usePathname();
  
  
  const [root, ...subPages] = ACCOUNT_PAGES;
  const current = subPages.find((page) => page.href === pathname);

  return (
    <AppBreadcrumb
      items={
        current
          ? [
              { label: t(root.labelKey), href: root.href },
              { label: t(current.labelKey), className: "text-blue-600 font-bold" },
            ]
          : [{ label: t(root.labelKey)}]
      }
    />
  );
}