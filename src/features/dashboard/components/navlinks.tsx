"use client";

import { GraduationCap, User } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/shared/lib/utils/tailwind-merge";

// Variables
const LINKS = [
  {
    href: "/",
    label: "diplomas",
    Icon: GraduationCap,
    activePaths: ["/", "/exams"],
  },
  {
    href: "/account",
    label: "account-settings",
    Icon: User,
    activePaths: ["/account"],
  },
] as const;

const isActivePath = (pathname: string, paths: readonly string[]) =>
  paths.some((base) =>
    base === "/"
      ? pathname === "/"
      : pathname === base || pathname.startsWith(`${base}/`),
  );

export default function NavLinks() {
  // Translation
  const t = useTranslations("dashboard.sidebar");

  //Navigation
  const pathname = usePathname();

  return (
    <nav>
      <ul className="mt-5">
        {LINKS.map(({ href, label, Icon, activePaths }) => {
          const isActive = isActivePath(pathname, activePaths);

          return (
            <li
              key={href}
              className={cn(
                "border border-transparent p-2 font-mono text-base font-semibold text-blue-600",
                isActive && "border-blue-500 bg-blue-100",
              )}
            >
              <Link
                href={href}
                aria-current={isActive ? "page" : undefined}
                className="flex items-center gap-2"
              >
                <Icon size={18} aria-hidden="true" />
                {t(label)}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}