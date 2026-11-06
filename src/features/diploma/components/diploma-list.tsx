"use client";

import { useMemo } from "react";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import InfiniteScroll from "react-infinite-scroll-component";
import useDiplomaList from "../hooks/use-diploma-list";
import DiplomaItem from "./diploma-item";
import DiplomaListSkeleton from "./diploma-list-skeleton";

export default function DiplomaList() {
  // Translation
  const t = useTranslations("dashboard");

  // Queries
  const {
    data: diplomaPages,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
  } = useDiplomaList();

  // Variables
  const allDiplomas = useMemo(
    () => diplomaPages?.pages.flatMap((page) => page?.data ?? []) ?? [],
    [diplomaPages],
  );

  if (isLoading) return <DiplomaListSkeleton />;
  if (error) return <div>{t("error")}</div>;

  return (
    <InfiniteScroll
      dataLength={allDiplomas.length}
      next={fetchNextPage}
      hasMore={hasNextPage}
      loader={
        <div className="flex flex-col items-center gap-2 px-5 py-2 font-mono font-medium text-gray-600">
          {t("scroll-more")}
          <ChevronDown size={18} />
        </div>
      }
      endMessage={
        <p className="block text-center">
          <b>{t("end-of-list")}</b>
        </p>
      }
    >
      <div className="grid grid-cols-1 gap-2.5 py-6 md:grid-cols-2 lg:grid-cols-3">
        {allDiplomas.map((diploma) => (
          <DiplomaItem key={diploma.id} diploma={diploma} />
        ))}
      </div>
    </InfiniteScroll>
  );
}