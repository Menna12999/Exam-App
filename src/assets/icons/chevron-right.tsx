import { forwardRef } from "react";
import { ChevronRight as LucideChevronRight } from "lucide-react";
import { cn } from "@/shared/lib/utils/tailwind-merge";

export const ChevronRight = forwardRef<
  SVGSVGElement,
  React.ComponentProps<typeof LucideChevronRight>
>(({ className, ...props }, ref) => {
  return (
    <LucideChevronRight
      className={cn("rtl:rotate-180", className)}
      ref={ref}
      {...props}
    />
  );
});

ChevronRight.displayName = "ChevronRight";
