import type { IQuestion } from "../types/question.interface";
import QuestionHeaderCard from "./question-header-card";

interface QuestionCardProps {
  question: IQuestion;
  index: number;
  total: number;
  selectedAnswerId?: string;
  onSelect: (questionId: string, answerId: string) => void;
}

export default function QuestionCard({
  question,
  index,
  total,
  selectedAnswerId,
  onSelect,
}: QuestionCardProps) {
  return (
    <div className="px-6">
     
    
      <h2 className="text-2xl font-semibold text-blue-600 pb-4">{question.text}</h2>

      <ul className="flex-col gap-2 flex" role="radiogroup">
        {question.answers.map((answer) => {
          const checked = selectedAnswerId === answer.id;
          return (
            <li key={answer.id}>
              <label
                className={`flex cursor-pointer items-center gap-3  p-4 transition-colors ${
                  checked
                    ? "bg-gray-100"
                    : "bg-gray-50 hover:bg-gray-100"
                }`}
              >
                <input
                  type="radio"
                  name={question.id}
                  checked={checked}
                  onChange={() => onSelect(question.id, answer.id)}
                  className="accent-blue-600"
                />
                <span className="text-sm">{answer.text}</span>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}