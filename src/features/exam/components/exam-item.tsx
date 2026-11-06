import Image from "next/image";
import { ArrowRight, CircleHelp, Clock } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { IExam } from "../types/exam.interface";

const FALLBACK_IMAGE = "/images/exam-placeholder.svg";

interface ExamItemProps {
  exam: IExam;
}

export default function ExamItem({ exam }: ExamItemProps) {
  //translations
  const t = useTranslations("exams");

  return (
    <Link
      href={`/exams/${exam.id}`}
      className="group flex items-start relative gap-4 border border-blue-200 bg-blue-50 p-4 transition-all duration-500 hover:border-dashed group"
    >
      <Image
        src={exam.image || FALLBACK_IMAGE}
        alt=""
        width={80}
        height={80}
        className="size-20 shrink-0 border border-blue-300 bg-blue-100 object-contain p-3"
      />
      <span className="invisible group-hover:visible absolute bottom-2.5 ltr:right-2.5 rtl:left-2.5 bg-blue-600 px-4 py-1.5 text-xs text-white flex gap-2.5">{t("start")} <ArrowRight className="rtl:rotate-180" size={18} /></span>
      <div className="grow space-y-2">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <h3 className="font-semibold text-blue-600 ">
            {exam.title}
          </h3>

          <ul className="flex shrink-0 items-center gap-4 text-xs text-gray-600">
            <ExamMeta icon={CircleHelp} label={t("questions", { count: exam?.questionsCount })} />
            <ExamMeta icon={Clock} label={t("minutes", { count: exam?.duration })} />
          </ul>
        </div>

        {exam.description && (
          <p className="line-clamp-2 text-sm text-gray-500">{exam.description}</p>
        )}
      </div>
    </Link>
  );
}

interface ExamMetaProps {
  icon: React.ElementType;
  label: string;
}

function ExamMeta({ icon: Icon, label }: ExamMetaProps) {
  return (
    <li className="flex items-center gap-1.5">
      <Icon className="size-4 text-blue-600" aria-hidden />
      <span>{label}</span>
    </li>
  );
}