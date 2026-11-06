export interface IAnswer {
  id: string;
  text: string;
}

export interface IQuestion {
  id: string;
  text: string;
  examId: string;
  immutable: boolean;
  createdAt: string;
  updatedAt: string;
  answers: IAnswer[];
}

export interface IQuestionsPayload {
  questions: IQuestion[];
}