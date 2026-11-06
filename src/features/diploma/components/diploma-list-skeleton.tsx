import { Skeleton } from "@/shared/components/ui/skeleton";

const SKELETON_COUNT = 6;

export default function DiplomaListSkeleton() {
  return (
    <div
      aria-busy="true"
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 my-7"
    >
      {Array.from({ length: SKELETON_COUNT }, (_, index) => (
        <div key={index} className="flex flex-col gap-4 bg-white p-4">
          {/* Image */}
          <Skeleton className="h-40 w-full" />
          {/* Title */}
          <Skeleton className="h-5 w-3/4" />
          {/* Description */}
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  );
}