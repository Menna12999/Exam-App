import type { IAnalytics } from "../types/submission.interface";
import AnswerRow from "./answer-row";

interface Props {
  item: IAnalytics;
}

export default function QuestionResultItem({ item }: Props) {
  const { questionText, selectedAnswer, correctAnswer, isCorrect } = item;

  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-blue-600">{questionText}</h3>

      {!isCorrect && selectedAnswer && (
        <AnswerRow text={selectedAnswer.text} variant="wrong" />
      )}
      <AnswerRow text={correctAnswer.text} variant="correct" />
    </div>
  );
}
