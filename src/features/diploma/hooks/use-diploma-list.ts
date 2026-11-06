'use client'
import { APIResponse, IPaginatedResponse } from '@/shared/types/api';
import { useInfiniteQuery } from '@tanstack/react-query'
import { IDiploma } from '../types/diploma';
import { DIPLOMA_KEYS } from '../apis/diploma.option';
import { useSearchParams } from 'next/navigation';
import { PAGINATION_LIMIT } from '@/shared/constants/api.constant';

export default function useDiplomaList() {
  //Navigation
  const searchParams = useSearchParams();

  //Variables
  const page = searchParams.get('page')||1 ;
  const limit = searchParams.get('limit') || PAGINATION_LIMIT;

  //Query
  return useInfiniteQuery({
    queryKey: DIPLOMA_KEYS.List(Number(page|| 1),Number(limit||12)),
    queryFn: async ({ pageParam }) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const url = new URL(`/api/diplomas`,window.location.origin);
      if(pageParam) url.searchParams.set('page', pageParam.toString());
      if(limit) url.searchParams.set('limit', limit.toString());
      const response = await fetch(url);
      const data: APIResponse<IPaginatedResponse<IDiploma>> = await response.json();
      if(!data.status || !data.payload) throw new Error(data.message);
      return data.payload;
    },
    initialPageParam:1,
    getNextPageParam: (lastPage) => {
        console.log("lastPage metadata:", lastPage.metadata);

      if (lastPage.metadata.page === lastPage.metadata.totalPages) {
        return undefined;
      }

      return lastPage.metadata.page + 1;
        
      
    }
  })
}
