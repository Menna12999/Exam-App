import { CircleHelp } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { getExamById } from "@/features/exam/api/exam.api";
import { getQuestionsByExam } from "@/features/question/api/question.api";
import QuestionsList from "@/features/question/components/question-list";
import { AppBreadcrumb } from "@/shared/components/app-breadcrumb";
import { PageTitleBar } from "@/shared/components/page-title-bar";

export default async function ExamPage({
  params,
}: {
  params: Promise<{ examId: string }>;
}) {
  // Translation
  const tDashboard = await getTranslations("dashboard");
  const tExam = await getTranslations("exams");

  // Queries
  const { examId } = await params;

  const [exam, questions] = await Promise.all([
    getExamById(examId),
    getQuestionsByExam(examId),
  ]);

  // Variables
  const examsHref = `/exams?diplomaId=${exam.diplomaId}`;

  return (
    <main className="min-h-screen flex flex-col">
      <AppBreadcrumb
        items={[
          { label: tDashboard("title"), href: "/diplomas" },
          { label: exam.diploma.title, href: examsHref },
          { label: exam.title, className: "text-blue-600" },
        ]}
      />
      <PageTitleBar
        title={tExam("title", { examTitle: exam.title })}
        icon={CircleHelp}
        backHref={examsHref}
      />
      <QuestionsList
        questions={questions}
        examDuration={exam.duration}
        examId={exam.id}
        title={`${exam.diploma.title} - ${exam.title}`}
      />
    </main>
  );
}