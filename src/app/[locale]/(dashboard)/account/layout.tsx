import type { ReactNode } from "react";
import { UserRound } from "lucide-react";
import { useTranslations } from "next-intl";
import AccountBreadcrumb from "@/features/account/components/account-breadcrumb";
import AccountSidebar from "@/features/account/components/account-sidebar";
import { PageTitleBar } from "@/shared/components/page-title-bar";

export default function AccountLayout({ children }: { children: ReactNode }) {
  // Translation
  const t = useTranslations("dashboard.sidebar");

  return (
    <main className="min-h-screen flex flex-col">
      <AccountBreadcrumb />

      <PageTitleBar title={t("account-settings")} icon={UserRound} />

      <div className="grid grid-cols-1 gap-3 p-6 md:grid-cols-3">
        <AccountSidebar />
        <div className="col-span-2 bg-white">{children}</div>
      </div>
    </main>
  );
}