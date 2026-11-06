import type { ISubmitExamResponse } from "../types/submission.interface";
import ResultChart from "./result-chart";
import QuestionResultItem from "./question-result-item";
import QuestionHeaderCard from "@/features/question/components/question-header-card";
import ResultActions from "./result-action";

interface ResultViewProps {
  result: ISubmitExamResponse["payload"];
  onRestart: () => void;
}

export default function ResultView({ result, onRestart }: ResultViewProps) {
  const { submission, analytics } = result;
  //Variables
    const wrongQuestions = analytics.filter((item) => !item.isCorrect);
    const total = analytics.length;
   

  return (
    <section className="m-6 space-y-4 bg-white p-6">
      <QuestionHeaderCard
        title={submission?.examTitle}
        current={total}
        total={total}
      />
      <h2 className="text-xl font-semibold text-blue-600">Results:</h2>

      <div className="flex gap-6">
        <div className="flex w-1/3 items-center justify-center bg-blue-50 p-6">
          <ResultChart
            correct={submission.correctAnswers}
            wrong={submission.wrongAnswers}
          />
        </div>

        <div className="max-h-[400px] flex-1 space-y-6 overflow-y-auto border border-dashed p-4">
          {wrongQuestions.map((item) => (
            <QuestionResultItem key={item.questionId} item={item} />
          ))}
        </div>
      </div>
      <ResultActions onRestart={onRestart} />
    </section>
  );
}