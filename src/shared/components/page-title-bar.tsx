import type { LucideIcon } from "lucide-react";
import { ChevronLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { cn } from "cn";

type PageTitleBarProps = {
  title: string;
  icon: LucideIcon;
  backHref?: string;
  className?: string;
};

export function PageTitleBar({
  title,
  icon: Icon,
  backHref,
  className,
}: PageTitleBarProps) {
  return (
    <div className={cn("flex  gap-3 mx-6 mt-6", className)}>
      {backHref && (
        <Link
          href={backHref}
          aria-label="Back"
          className="flex h-19 w-9.5 shrink-0 items-center justify-center border-blue-600  border bg-white  transition-colors hover:text-gray-900"
        >
          <ChevronLeft className="size-5 rtl:rotate-180 text-blue-600" />
        </Link>
      )}

      <div className="flex  flex-1 items-center gap-3 bg-blue-600 px-4 py-3   text-white">
        <Icon className="size-11.25 shrink-0" aria-hidden="true" />
        <h1 className="font-inter truncate text-[2rem] font-semibold">{title}</h1>
      </div>
    </div>
  );
}