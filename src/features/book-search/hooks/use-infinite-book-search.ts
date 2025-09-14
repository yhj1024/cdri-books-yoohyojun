import { useInfiniteQuery } from '@tanstack/react-query'
import { searchBooks } from '@/services/kakao-api'
import type { SearchBooksParams } from '@/services/kakao-api'

export const useInfiniteBookSearch = (params: Omit<SearchBooksParams, 'page'>) => {
  return useInfiniteQuery({
    queryKey: ['books', 'infinite', params],
    queryFn: ({ pageParam }) => searchBooks({ ...params, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      // Kakao API는 is_end가 true이면 더 이상 데이터가 없음
      if (lastPage.isEnd) {
        return undefined
      }
      return allPages.length + 1
    },
    enabled: !!params.query?.trim(),
  })
}
