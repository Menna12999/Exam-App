"use client";
import { EllipsisVertical, LucideLogOut, User } from "lucide-react";
import { signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function UserMenu() {
  //Translation
    const t = useTranslations("dashboard.sidebar");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger  aria-label={t("label")}>
        <EllipsisVertical className="cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" side="bottom">
        <DropdownMenuGroup>
          <DropdownMenuItem
            render={<Link href="/account" />}
            className="flex items-center gap-2 text-base font-semibold text-gray-800"
          >
            <User size={18} /> {t("account")}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="flex items-center gap-2 text-base font-semibold text-red-600"
          >
            <LucideLogOut size={18} className="rotate-180" />    {t("logout")}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
