import { QueryClient, QueryClientProvider, QueryCache, MutationCache } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import type { ReactNode } from 'react'
import { isAppError, NetworkError, ServerError } from '@/lib/errors/custom-errors'

// Query 캐시 - 전역 에러 처리
const queryCache = new QueryCache({
  onError: (error: unknown) => {
    console.error('Query error:', error)

    // 서버 에러는 에러 바운더리로 전파
    if (error instanceof ServerError && !error.isOperational) {
      throw error
    }
  },
})

// Mutation 캐시 - 전역 에러 처리
const mutationCache = new MutationCache({
  onError: (error: unknown) => {
    console.error('Mutation error:', error)
  },
})

const queryClient = new QueryClient({
  queryCache,
  mutationCache,
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5분
      gcTime: 1000 * 60 * 10, // 10분 (구 cacheTime)
      retry: (failureCount, error: unknown) => {
        // 네트워크 에러는 3번까지 재시도
        if (error instanceof NetworkError) {
          return failureCount < 3
        }
        // 서버 에러는 1번만 재시도
        if (error instanceof ServerError) {
          return failureCount < 1
        }
        // 인증/권한 에러는 재시도하지 않음
        if (isAppError(error) && [401, 403, 404].includes(error.statusCode)) {
          return false
        }
        // 기타 에러는 1번 재시도
        return failureCount < 1
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      refetchOnWindowFocus: false,
      // 에러 바운더리로 전파할지 결정
      throwOnError: (error: unknown) => {
        // 서버 에러 중 operational이 아닌 것만 전파
        return error instanceof ServerError && !error.isOperational
      },
    },
    mutations: {
      retry: false, // mutation은 기본적으로 재시도하지 않음
      throwOnError: (error: unknown) => {
        // 서버 에러 중 operational이 아닌 것만 전파
        return error instanceof ServerError && !error.isOperational
      },
    },
  },
})

interface QueryProviderProps {
  children: ReactNode
}

export const QueryProvider = ({ children }: QueryProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
