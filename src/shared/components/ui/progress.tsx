"use client";

import { Progress as ProgressPrimitive } from "@base-ui/react/progress";
import { cn } from "cn";

function Progress({
  className,
  children,
  value,
  max = 100,
  variant = "default",
  ...props
}: ProgressPrimitive.Root.Props & {
  variant?: "default" | "steps";
}) {
  if (variant === "steps") {
    const totalSteps = max ?? 4;
    const currentStep = value ?? 0;

    return (
      <ProgressPrimitive.Root
        value={value}
        max={max}
        data-slot="progress"
        className={cn("w-full", className)}
        {...props}
      >
        <div className="flex w-full items-center">
          {Array.from({ length: totalSteps }).map((_, index) => {
            const step = index + 1;

            const isCompleted = step < currentStep;
            const isCurrent = step === currentStep;
            const isLast = step === totalSteps;

            return (
              <div
                key={step}
                className="flex flex-1 items-center last:flex-none"
              >
                {/* Diamond */}
                <div
                  className={cn(
                    "relative flex h-5 w-5 shrink-0 rotate-45 items-center justify-center",
                    isCurrent && "bg-blue-100"
                  )}
                >
                  <div
                    className={cn(
                      "h-2.5 w-2.5 border",
                      isCompleted && "border-blue-600 bg-blue-600",
                      isCurrent && "border-blue-600 bg-blue-600",
                      !isCompleted &&
                        !isCurrent &&
                        "border-blue-600 bg-blue-50"
                    )}
                  />
                </div>

                {/* Line */}
                {!isLast && (
                  <div
                    className={cn(
                      "mx-2 h-px flex-1",
                      isCompleted
                        ? "bg-blue-600"
                        : isCurrent
                          ? "border-t border-dashed border-blue-600"
                          : "border-t border-dashed border-gray-300"
                    )}
                  />
                )}
              </div>
            );
          })}
        </div>

        {children}
      </ProgressPrimitive.Root>
    );
  }

  // Default/Base UI Progress
  return (
    <ProgressPrimitive.Root
      value={value}
       max={max}
      data-slot="progress"
      className={cn("flex flex-wrap gap-3", className)}
      {...props}
    >
      {children}

      <ProgressTrack>
        <ProgressIndicator />
      </ProgressTrack>
    </ProgressPrimitive.Root>
  );
}

function ProgressTrack({
  className,
  ...props
}: ProgressPrimitive.Track.Props) {
  return (
    <ProgressPrimitive.Track
      className={cn(
        "relative flex h-2 w-full items-center overflow-x-hidden bg-blue-50",
        className
      )}
      data-slot="progress-track"
      {...props}
    />
  );
}

function ProgressIndicator({
  className,
  ...props
}: ProgressPrimitive.Indicator.Props) {
  return (
    <ProgressPrimitive.Indicator
      data-slot="progress-indicator"
      className={cn("h-full bg-blue-600 transition-all", className)}
      {...props}
    />
  );
}

function ProgressLabel({
  className,
  ...props
}: ProgressPrimitive.Label.Props) {
  return (
    <ProgressPrimitive.Label
      className={cn("text-sm font-medium", className)}
      data-slot="progress-label"
      {...props}
    />
  );
}

function ProgressValue({
  className,
  ...props
}: ProgressPrimitive.Value.Props) {
  return (
    <ProgressPrimitive.Value
      className={cn(
        "ml-auto text-sm text-muted-foreground tabular-nums",
        className
      )}
      data-slot="progress-value"
      {...props}
    />
  );
}

export {
  Progress,
  ProgressTrack,
  ProgressIndicator,
  ProgressLabel,
  ProgressValue,
};