import type { Book } from '../types/book'

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
  if (!API_KEY) {
    throw new Error('Kakao API key is not configured')
  }

  const params = new URLSearchParams({
    query,
    sort,
    page: page.toString(),
    size: size.toString(),
    target,
  })

  try {
    const response = await fetch(`${KAKAO_API_BASE_URL}?${params}`, {
      headers: {
        Authorization: `KakaoAK ${API_KEY}`,
      },
    })

    if (!response.ok) {
      new Error(`API request failed: ${response.status}`)
    }

    const data: KakaoSearchResponse = await response.json()

    return {
      books: data.documents.map(transformKakaoBook),
      totalCount: data.meta.total_count,
      isEnd: data.meta.is_end,
    }
  } catch (error) {
    console.error('Failed to search books:', error)
    throw error
  }
}
