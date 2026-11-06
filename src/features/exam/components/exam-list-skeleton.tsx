import { Skeleton } from "@/shared/components/ui/skeleton";

const SKELETON_COUNT = 6;

export default function ExamListSkeleton() {
  return (
    <div
      aria-busy="true"
      className="px-6 flex flex-col gap-6 my-7"
    >
      {Array.from({ length: SKELETON_COUNT }, (_, index) => (
        <div key={index} className="flex flex-col gap-4 bg-white p-4">
          {/* Title */}
          <Skeleton className="h-5 w-2/3" />
          {/* Questions count + duration */}
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-4 w-1/4" />
          {/* Start button */}
          <Skeleton className="h-10 w-full" />
        </div>
      ))}
    </div>
  );
}