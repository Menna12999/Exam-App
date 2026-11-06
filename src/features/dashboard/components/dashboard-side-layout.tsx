import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import LogoIcon from "@/assets/icons/logo-icon";
import logo from "@/assets/images/logo.png";
import NavLinks from "./navlinks";
import UserMenu from "./user-menu";
import { getTranslations } from "next-intl/server";

export default async function DashboardSideLayout() {
  // Translation
  const t = await getTranslations("dashboard.sidebar");

  const session = await getServerSession(authOptions);

  // Variables
  const user = session?.user;

  return (
    <aside className="sticky top-0 hidden h-screen flex-col justify-between bg-blue-50 lg:flex">
      <div className="flex flex-col gap-2 px-10">
        {/* App brand */}
        <header className="flex items-center pt-22">
          <LogoIcon />
          <span className="text-xl font-semibold text-blue-600">
            {t("app-name")}
          </span>
        </header>
        <NavLinks />
      </div>

      {/* Signed-in user */}
      {user && (
        <div className="flex items-center gap-3 p-5">
          <Image
            src={user.profilePhoto || logo}
            width={54}
            height={54}
            alt={user.firstName ?? t("user-avatar")}
            className={`size-13.5 shrink-0 border border-blue-500 ${
              user.profilePhoto ? "object-cover" : "object-contain p-1 bg-gray-800"
            }`}
          />
          <div className="flex flex-col">
            <span className="font-mono text-base font-medium text-blue-600">
              {user.firstName}
            </span>
            <span className="text-sm text-gray-500">{user.email}</span>
          </div>
          <UserMenu />
        </div>
      )}
    </aside>
  );
}
