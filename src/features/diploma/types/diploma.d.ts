import { IExam } from "@/features/exam/types/exam.interface";

export interface IDiploma extends IDocumentFields {
    	
        id: string,
        title: string,
        description: string,
        image: string|null,
        immutable: boolean,
      }

export interface IDiplomaDetails {
  diploma: IDiploma & {
    exams: IExam[]
  };
}
