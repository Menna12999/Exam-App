export interface ValidationError {
  path: string;
  message: string;
}
export interface ErrorResponse {
  code?: number;
  status: false;
  message: string;
  code: number;
   errors?: ValidationError[];
}

export interface SuccessResponse<T> {
  status: true;
  message?: string;
  payload?: T;
}

export type APIResponse<T> = ErrorResponse | SuccessResponse<T>;

export interface IPaginatedResponse<T> {
  data: T[];
  metadata:{
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  }
}

export interface IDocumentFields{
  createdAt: string;
  updatedAt: string;
}
