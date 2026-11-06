import { PAGINATION_LIMIT } from "@/shared/constants/api.constant";

export const EXAM_KEYS={
    List:(page:number=1,limit:number=PAGINATION_LIMIT,diplomaId:string)=>['exam-list',page,limit,diplomaId] as const,
}as const