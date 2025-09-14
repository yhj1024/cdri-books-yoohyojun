import type { Book } from '../types/book'
import { ApiError, ValidationError } from '@/lib/errors/custom-errors'

const KAKAO_API_BASE_URL = import.meta.env.VITE_KAKAO_API_BASE_URL
const API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY

interface KakaoBookDocument {
  title: string
  contents: string
  url: string
  isbn: string
  datetime: string
  authors: string[]
  publisher: string
  translators: string[]
  price: number
  sale_price: number
  thumbnail: string
  status: string
}

interface KakaoSearchResponse {
  meta: {
    total_count: number
    pageable_count: number
    is_end: boolean
  }
  documents: KakaoBookDocument[]
}

export interface SearchBooksParams {
  query: string
  sort?: 'accuracy' | 'latest'
  page?: number
  size?: number
  target?: 'title' | 'isbn' | 'publisher' | 'person'
}

export interface SearchBooksResult {
  books: Book[]
  totalCount: number
  isEnd: boolean
}

// 카카오 API 응답을 우리 Book 타입으로 변환
const transformKakaoBook = (doc: KakaoBookDocument): Book => ({
  id: doc.isbn,
  title: doc.title,
  author: doc.authors.join(', '),
  publisher: doc.publisher,
  isbn: doc.isbn,
  thumbnail: doc.thumbnail,
  price: doc.price,
  salePrice: doc.sale_price === -1 ? undefined : doc.sale_price,
  url: doc.url,
  contents: doc.contents,
  publishedDate: doc.datetime.split('T')[0], // YYYY-MM-DD 형식으로 변환
  status: doc.status,
})

export const searchBooks = async ({
  query,
  sort = 'accuracy',
  page = 1,
  size = 50,
  target = 'title',
}: SearchBooksParams): Promise<SearchBooksResult> => {
  // API 키 체크
  if (!API_KEY) {
    throw new ValidationError('Kakao API 키가 설정되지 않았습니다')
  }

  // 검색어 유효성 검사
  if (!query?.trim()) {
    throw new ValidationError('검색어를 입력해주세요')
  }

  const params = new URLSearchParams({
    query,
    sort,
    page: page.toString(),
    size: size.toString(),
    target,
  })

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 10000) // 10초 타임아웃

  try {
    const response = await fetch(`${KAKAO_API_BASE_URL}?${params}`, {
      headers: {
        Authorization: `KakaoAK ${API_KEY}`,
      },
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    // API 응답 에러 처리
    if (!response.ok) {
      if (response.status === 400) {
        throw new ValidationError('잘못된 검색 요청입니다')
      }
      if (response.status === 401) {
        throw new ApiError('API 키가 유효하지 않습니다', 401, '/search/book', 'GET')
      }
      if (response.status === 429) {
        throw new ApiError(
          '요청 횟수를 초과했습니다. 잠시 후 다시 시도해주세요',
          429,
          '/search/book',
          'GET',
        )
      }
      if (response.status >= 500) {
        throw new ApiError(
          '카카오 서버 오류가 발생했습니다',
          response.status,
          '/search/book',
          'GET',
        )
      }
      throw new ApiError(
        `API 요청 실패: ${response.status}`,
        response.status,
        '/search/book',
        'GET',
      )
    }

    const data: KakaoSearchResponse = await response.json()

    return {
      books: data.documents.map(transformKakaoBook),
      totalCount: data.meta.total_count,
      isEnd: data.meta.is_end,
    }
  } finally {
    clearTimeout(timeoutId)
  }
}
