export interface ISubmitAnswer {
  questionId: string;
  answerId: string;
}

export interface ISubmitExamBody {
  examId: string;
  answers: ISubmitAnswer[];
  startedAt: string;
}

export interface ISubmission {
  id: string;
  examId: string;
  examTitle: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  startedAt: string;
  submittedAt: string;
}

export interface IAnalytics {
  questionId: string;
  questionText: string;
  selectedAnswer: { id: string; text: string } | null;
  isCorrect: boolean;
  correctAnswer: { id: string; text: string };
}

export interface ISubmitExamResponse {
  status: boolean;
  code: number;
  payload: {
    submission: ISubmission;
    analytics: IAnalytics[];
  };
}