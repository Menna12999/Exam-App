"use client";

import { useState } from "react";
import { Controller, SubmitHandler, useForm, useWatch } from "react-hook-form";
import { ChevronLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import { ChevronRight } from "@/assets/icons/chevron-right";
import ResultView from "@/features/submission/components/result-view";
import { useSubmitExam } from "@/features/submission/hooks/use-submit-exam";
import { ISubmitExamResponse } from "@/features/submission/types/submission.interface";
import { useCountdown } from "../hooks/use-count-down";
import type { IQuestion } from "../types/question.interface";
import CircularTimer from "./circular-timer-container";
import QuestionCard from "./question-card";
import QuestionHeaderCard from "./question-header-card";

interface QuestionsListProps {
  questions: IQuestion[];
  title: string;
  examDuration: number;
  examId: string;
}

type FormValues = {
  answers: Record<string, string>;
};

export default function QuestionsList({
  questions,
  title,
  examDuration,
  examId,
}: QuestionsListProps) {
  // Translation
  const t = useTranslations("exams");

  // State
  const [current, setCurrent] = useState(0);
  const [result, setResult] = useState<ISubmitExamResponse["payload"] | null>(
    null,
  );
  const [startedAt, setStartedAt] = useState(() => new Date().toISOString());

  // Mutation
  const { mutate, isPending, error } = useSubmitExam();

  // Form & validation
  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: { answers: {} },
  });
  const answers = useWatch({ control, name: "answers" });

  // Variables
  const EXAM_SECONDS = examDuration * 60;
  const question = questions[current];
  const isAnswered = question ? Boolean(answers?.[question.id]) : false;
  const isLast = current === questions.length - 1;

  // Hooks
  const { remaining, reset: resetCountdown } = useCountdown(
    EXAM_SECONDS,
    () => {
      handleSubmit(onSubmit)();
    },
  );

  // Functions
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    // Prevents double submission (manual click + timer ending together)
    if (isPending || result) return;

    const answersArray = Object.entries(data.answers)
      .filter(([, answerId]) => Boolean(answerId))
      .map(([questionId, answerId]) => ({ questionId, answerId }));

    mutate(
      { examId, answers: answersArray, startedAt },
      { onSuccess: (res) => setResult(res.payload) },
    );
  };

  const handlePrev = () => setCurrent((c) => Math.max(0, c - 1));
  const handleNext = () => setCurrent((c) => c + 1);

  const handleRestart = () => {
    setCurrent(0);
    setResult(null);
    reset({ answers: {} });
    setStartedAt(new Date().toISOString());
    resetCountdown();
  };

  if (result) return <ResultView result={result} onRestart={handleRestart} />;

  if (!questions.length) return <div className="h-full flex items-center justify-center">{t("no-questions")}</div>;

  if (!question) return null;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="m-6 space-y-4 bg-white">
      {/* Progress + timer */}
      <div className="flex items-center gap-6 px-6 pt-6">
        <QuestionHeaderCard
          title={title}
          current={current + 1}
          total={questions.length}
        />
        <CircularTimer remaining={remaining} total={EXAM_SECONDS} />
      </div>

      {/* Current question */}
      <Controller
        key={question.id}
        name={`answers.${question.id}`}
        control={control}
        render={({ field }) => (
          <QuestionCard
            question={question}
            index={current}
            total={questions.length}
            selectedAnswerId={field.value}
            onSelect={(_qId, aId) => field.onChange(aId)}
          />
        )}
      />

      {/* Navigation buttons */}
      <div className="flex gap-4 p-6">
        <button
          type="button"
          disabled={current === 0}
          onClick={handlePrev}
          className="flex flex-1 items-center justify-center gap-2 bg-gray-200 px-4 py-2 disabled:opacity-40"
        >
          <ChevronLeft size={18} className="rtl:rotate-180" />
          {t("previous")}
        </button>

        {isLast ? (
          <button
            type="submit"
            disabled={!isAnswered || isPending}
            className="flex flex-1 items-center justify-center gap-2 bg-blue-600 px-4 py-2 text-white disabled:opacity-40"
          >
            {isPending ? t("submitting") : t("submit")}
            <ChevronRight size={18} className="rtl:rotate-180" />
          </button>
        ) : (
          <button
            type="button"
            disabled={!isAnswered}
            onClick={handleNext}
            className="flex flex-1 items-center justify-center gap-2 bg-blue-600 px-4 py-2 text-white disabled:opacity-40"
          >
            {t("next")}
            <ChevronRight size={18} className="rtl:rotate-180" />
          </button>
        )}
      </div>

      {error && <p className="px-6 pb-6 text-red-500">{t("submit-error")}</p>}
    </form>
  );
}
