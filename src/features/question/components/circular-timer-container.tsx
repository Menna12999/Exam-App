interface CircularTimerProps {
  remaining: number;
  total: number;
}

export default function CircularTimer({
  remaining,
  total,
}: CircularTimerProps) {
  const size = 65;
  const stroke = 10;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - remaining / total);

  const mm = String(Math.floor(remaining / 60)).padStart(2, "0");
  const ss = String(remaining % 60).padStart(2, "0");

  return (
    <div className="relative ps-6 before:absolute before:inset-s-0 before:top-1/2 before:h-16.25 before:w-0.5 before:-translate-y-1/2 before:bg-gray-200">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-10">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            strokeWidth={stroke}
            className="stroke-blue-100"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            strokeWidth={stroke}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="stroke-blue-600 transition-[stroke-dashoffset] duration-500 ease-linear"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-xs font-medium tabular-nums">
          {mm}:{ss}
        </span>
      </div>
    </div>
  );
}
