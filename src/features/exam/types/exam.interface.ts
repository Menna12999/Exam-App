export interface Root {
  status: boolean
  code: number
  payload: Payload
}

export interface Payload {
  data: IExam[]
  metadata: Metadata
}

export interface IExam {
  id: string
  title: string
  description: string
  image: any
  duration: number
  diplomaId: string
  immutable: boolean
  createdAt: string
  updatedAt: string
  diploma: Diploma
  questionsCount: number
}

export interface IExamPayload {
  exam: IExam;
}

export interface Diploma {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface Metadata {
  page: number
  limit: number
  total: number
  totalPages: number
}
