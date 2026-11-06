import { forwardRef } from "react";
import { MoveLeft as LucideMoveLeft } from "lucide-react";
import { cn } from "@/shared/lib/utils/tailwind-merge";

export const MoveLeft = forwardRef<
  SVGSVGElement,
  React.ComponentProps<typeof LucideMoveLeft>
>(({ className, ...props }, ref) => {
  return (
    <LucideMoveLeft
      className={cn("rtl:rotate-180", className)}
      ref={ref}
      {...props}
    />
  );
});

MoveLeft.displayName = "MoveLeft";
