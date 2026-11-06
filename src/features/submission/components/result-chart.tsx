"use client";
import { Pie, PieChart } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/shared/components/ui/chart";

const chartConfig = {
  correct: { label: "Correct", color: "#10b981" },
  incorrect: { label: "Incorrect", color: "#ef4444" },
} satisfies ChartConfig;

interface ResultChartProps {
  correct: number;
  wrong: number;
}

export default function ResultChart({ correct, wrong }: ResultChartProps) {
  const data = [
    { name: "correct", value: correct, fill: "var(--color-correct)" },
    { name: "incorrect", value: wrong, fill: "var(--color-incorrect)" },
  ];

  return (
    <div className="flex flex-col items-center gap-6">
      <ChartContainer config={chartConfig} className="aspect-square size-50.75">
        <PieChart>
          <ChartTooltip
            content={<ChartTooltipContent hideLabel nameKey="name" />}
          />
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={45}
            startAngle={90}
            endAngle={-270}
            strokeWidth={0}
          />
        </PieChart>
      </ChartContainer>

      <ul className="space-y-2 text-sm">
        <li className="flex items-center gap-2">
          <span className="size-3 bg-emerald-500" /> Correct: {correct}
        </li>
        <li className="flex items-center gap-2">
          <span className="size-3 bg-red-500" /> Incorrect: {wrong}
        </li>
      </ul>
    </div>
  );
}