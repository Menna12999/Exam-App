import DiplomaList from "@/features/diploma/components/diploma-list";
import { AppBreadcrumb } from "@/shared/components/app-breadcrumb";
import { PageTitleBar } from "@/shared/components/page-title-bar";
import { GraduationCap } from "lucide-react";
import { useTranslations } from "next-intl";

export default function HomePage() {
  // Translation
  const t = useTranslations("dashboard");

  return (
    <main className="min-h-screen flex flex-col">
      <AppBreadcrumb items={[{ label: t("title") }]} />
      <PageTitleBar title={t("title")} icon={GraduationCap} />

      {/*Diplomas List */}
      <div className="px-6">
        <DiplomaList />
      </div>
    </main>
  );
}
