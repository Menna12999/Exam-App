import { BookOpen } from "lucide-react";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getDiploma } from "@/features/diploma/apis/diploma.api";
import ExamList from "@/features/exam/components/exam-list";
import { AppBreadcrumb } from "@/shared/components/app-breadcrumb";
import { PageTitleBar } from "@/shared/components/page-title-bar";

export default async function ExamsPage({
  searchParams,
}: {
  searchParams: Promise<{ diplomaId?: string }>;
}) {
  // Translation
  const tDashboard = await getTranslations("dashboard");
  const tExams = await getTranslations("exams");

  // Queries
  const { diplomaId } = await searchParams;

  if (!diplomaId) notFound();

  const response = await getDiploma(diplomaId);

  // Variables
  const diploma = response?.status ? response.payload?.diploma : null;

  if (!diploma) notFound();

  return (
    <main className="min-h-screen flex flex-col">
      <AppBreadcrumb
        items={[
          { label: tDashboard("title"), href: "/" },
          { label: diploma.title },
          { label: tExams("breadcrumb"), className: "text-blue-600" },
        ]}
      />
      <PageTitleBar
        title={tExams("diploma-exams-title", { diplomaTitle: diploma.title })}
        icon={BookOpen}
        backHref="/"
      />
      <ExamList />
    </main>
  );
}