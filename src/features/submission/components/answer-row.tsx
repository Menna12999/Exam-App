import { cn } from "@/shared/lib/utils/tailwind-merge";

type AnswerRowProps = {
  text: string;
  variant: "wrong" | "correct";
};

export default function AnswerRow({ text, variant }: AnswerRowProps) {
  const isWrong = variant === "wrong";

  return (
    <div
      className={cn(
        "flex items-center gap-3 px-4 py-3 text-sm",
        isWrong ? "bg-red-50" : "bg-emerald-50"
      )}
    >
      {isWrong ? (
       
        <span className="flex size-4 shrink-0 items-center justify-center rounded-full border-2 border-red-500">
          <span className="size-2 rounded-full bg-red-500" />
        </span>
      ) : (
       
        <span className="size-3 shrink-0 rounded-full border-2 border-emerald-500" />
      )}
      {text}
    </div>
  );
}