import { useState, useCallback } from 'react'
import { BookListItem } from '../../components/book-list-item/book-list-item'
import { BookListItemDetail } from '@/components/book-list-item-detail'
import { NoData } from '@/components/no-data'
import type { Book } from '@/types/book.ts'

interface BookListProps {
  books: Book[]
  likedBookIds: Set<string>
  onToggleLike: (bookId: string) => void
  emptyMessage?: string
  isLoading?: boolean
}

export const BookList = ({
  books,
  likedBookIds,
  onToggleLike,
  emptyMessage = '검색 결과가 없습니다.',
  isLoading = false,
}: BookListProps) => {
  const [expandedBookId, setExpandedBookId] = useState<string | null>(null)

  const handleToggleExpand = useCallback((bookId: string) => {
    setExpandedBookId((prev) => (prev === bookId ? null : bookId))
  }, [])

  // 로딩 중일 때는 아무것도 표시하지 않거나 로딩 표시
  if (isLoading) {
    return null // 또는 로딩 스피너
  }

  // 로딩이 끝났는데 데이터가 없을 때만 NoData 표시
  if (!isLoading && books.length === 0) {
    return <NoData message={emptyMessage} />
  }

  return (
    <div className="w-[960px]">
      {books.map((book) => (
        <div key={book.id}>
          {expandedBookId === book.id ? (
            <BookListItemDetail
              book={book}
              isLiked={likedBookIds.has(book.id)}
              onToggleLike={onToggleLike}
              onToggleExpand={handleToggleExpand}
            />
          ) : (
            <BookListItem
              book={book}
              isLiked={likedBookIds.has(book.id)}
              onToggleLike={onToggleLike}
              onToggleExpand={handleToggleExpand}
            />
          )}
        </div>
      ))}
    </div>
  )
}
