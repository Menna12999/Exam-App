import { PAGINATION_LIMIT } from "@/shared/constants/api.constant";

export const DIPLOMA_KEYS={
    List:(page:number=1,limit:number=PAGINATION_LIMIT)=>['diploma-list',page,limit] as const,
}as const