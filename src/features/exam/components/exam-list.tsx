"use client";

import { useMemo } from "react";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import InfiniteScroll from "react-infinite-scroll-component";
import useExamList from "../hooks/use-exam-list";
import ExamItem from "./exam-item";
import ExamListSkeleton from "./exam-list-skeleton";

export default function ExamList() {
  // Translation
  const tList = useTranslations("dashboard");
  const tExams = useTranslations("exams");

  // Queries
  const {
    data: examPages,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
  } = useExamList();

  // Variables
  const allExams = useMemo(
    () => examPages?.pages.flatMap((page) => page?.data ?? []) ?? [],
    [examPages],
  );

  if (isLoading) return <ExamListSkeleton />;
  if (error) return <div>{tExams("load-error")}</div>;

  return (
    <InfiniteScroll
      dataLength={allExams.length}
      next={fetchNextPage}
      hasMore={hasNextPage}
      loader={
        <div className="flex flex-col items-center gap-2 px-5 py-2 font-mono font-medium text-gray-600">
          {tList("scroll-more")}
          <ChevronDown size={18} />
        </div>
      }
      endMessage={
        <p className="block text-center">
          <b>{tList("end-of-list")}</b>
        </p>
      }
    >
      <div className="m-6 grid grid-cols-1 gap-2.5 bg-white p-6">
        {allExams.map((exam) => (
          <ExamItem key={exam.id} exam={exam} />
        ))}
      </div>
    </InfiniteScroll>
  );
}