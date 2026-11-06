"use client";

import { CircleUser, Lock, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

export default function AccountSidebar() {
  // Translation
  const tSidebar = useTranslations("dashboard.sidebar");
  const tAuth = useTranslations("auth");

  // Navigation
  const pathname = usePathname();

  // Variables
  const links = [
    { href: "/account", label: tSidebar("profile"), icon: CircleUser },
    {
      href: "/account/change-password",
      label: tAuth("change-password"),
      icon: Lock,
    },
  ];

  return (
    <div className="col-span-1 flex h-screen flex-col justify-between bg-white p-6 font-mono">
      <ul className="space-y-1 px-4">
        {links.map(({ href, label, icon: Icon }) => (
          <li key={href}>
            <Link
              href={href}
              className={`flex items-center gap-2 p-2 text-base font-semibold ${
                pathname === href
                  ? "border bg-blue-100 text-blue-500"
                  : "text-gray-600"
              }`}
            >
              <Icon />
              {label}
            </Link>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="flex items-center gap-2 bg-red-50 px-4 py-2 text-red-600"
      >
        <LogOut />
        {tSidebar("logout")}
      </button>
    </div>
  );
}