import { Progress } from "@/shared/components/ui/progress"; 

interface QuestionHeaderCardProps {
  title: string;
  current: number; 
  total: number;
}

export default function QuestionHeaderCard({
  title,
  current,
  total,
}: QuestionHeaderCardProps) {
  return (
    <div className="space-y-2  grow ">
      <div className="flex items-center justify-between font-mono text-xs text-gray-600">
        <span>{title}</span>
        <span>
          Question <b className="text-blue-600">{current}</b> of {total}
        </span>
      </div>
      <Progress value={current} max={total} />
    </div>
  );
}