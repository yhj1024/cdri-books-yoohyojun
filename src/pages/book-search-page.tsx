import { useState, useCallback, useRef, useEffect } from 'react'
import { BookSearch } from '@/features/book-search'
import { BookList } from '@/features/book-list'
import { useInfiniteBookSearch } from '../hooks/use-infinite-book-search'
import { useFavoriteStore } from '../stores/favorite-store'
import type { SearchTarget } from '../stores/search-store'

export const BookSearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchTarget, setSearchTarget] = useState<SearchTarget>('title')

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteBookSearch(
    {
      query: searchQuery,
      size: 10,
      target: searchTarget,
    },
  )

  const { toggleFavorite, likedBookIds } = useFavoriteStore()
  const observerRef = useRef<IntersectionObserver | null>(null)
  const loadMoreRef = useRef<HTMLDivElement>(null)

  // Intersection Observer 설정
  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage()
        }
      },
      { threshold: 0.1 },
    )

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current)
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  const handleSearch = (keyword: string, target?: SearchTarget) => {
    setSearchQuery(keyword)
    if (target) {
      setSearchTarget(target)
    }
  }

  const handleToggleLike = useCallback(
    (bookId: string) => {
      const allBooks = data?.pages.flatMap((page) => page.books) || []
      const book = allBooks.find((b) => b.id === bookId)
      if (book) {
        toggleFavorite(book)
      }
    },
    [data, toggleFavorite],
  )

  // 모든 페이지의 책들을 flat하게 펼침
  const allBooks = data?.pages.flatMap((page) => page.books) || []
  const totalCount = data?.pages[0]?.totalCount || 0

  return (
    <div className="p-8">
      {/* 검색 컴포넌트 */}
      <div className="mb-8">
        <BookSearch onSearch={handleSearch} totalCount={totalCount} isLoading={isLoading} />
      </div>

      {/* 책 목록 */}
      <BookList
        books={allBooks}
        likedBookIds={likedBookIds}
        onToggleLike={handleToggleLike}
        isLoading={isLoading && allBooks.length === 0}
        emptyMessage={searchQuery ? '검색된 결과가 없습니다.' : '검색된 결과가 없습니다.'}
      />

      {/* 무한 스크롤 트리거 */}
      {allBooks.length > 0 && (
        <div ref={loadMoreRef} className="h-20 flex items-center justify-center">
          {isFetchingNextPage && <div className="text-gray-500">로딩 중...</div>}
        </div>
      )}
    </div>
  )
}
