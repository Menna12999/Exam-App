import { cn } from "@/shared/lib/utils/tailwind-merge";
import { CircleX } from "lucide-react";
import React from "react";

type submissionFeedbackProps = React.HtmlHTMLAttributes<HTMLParagraphElement>;

export default function SubmissionFeedback({
  children,
  className,
  ...props
}: submissionFeedbackProps) {
  if (!children) return null;
  return (
    <p
      className={cn(
        "text-destructive text-sm bg-red-50 p-2.5 border border-destructive relative text-center",
        className,
      )}
      {...props}
    >
      {/*icon*/}
      <CircleX className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full size-5 bg-white" />
      {/*message*/}
      {children}
    </p>
  );
}
