import { Button } from '@/components/button'
import { Image } from '@/components/image'
import { HeartIcon, HeartFilledIcon, ChevronDetailDownIcon } from '@/components/icons'
import type { Book } from '@/types/book.ts'

interface BookListItemProps {
  book: Book
  onToggleLike?: (bookId: string) => void
  onToggleExpand?: (bookId: string) => void
  isLiked?: boolean
}

export const BookListItem = ({
  book,
  onToggleLike,
  onToggleExpand,
  isLiked = false,
}: BookListItemProps) => {
  const handleLikeClick = () => {
    onToggleLike?.(book.id)
  }

  const handleDetailClick = () => {
    onToggleExpand?.(book.id)
  }

  const handlePurchaseClick = () => {
    if (book.url) {
      window.open(book.url, '_blank')
    }
  }

  return (
    <div className="w-[960px] h-[100px] bg-white border-b border-[#D2D6DA] flex items-center">
      {/* 왼쪽 영역: 이미지와 하트 */}
      <div className="ml-[48px] relative w-[48px] h-[68px]">
        {/* 책 이미지 */}
        <Image
          src={book.thumbnail}
          alt={book.title}
          width="48px"
          height="68px"
          className="w-[48px] h-[68px] object-cover"
        />
        {/* 하트 아이콘 (이미지 위 66.67% 위치) */}
        <button
          onClick={handleLikeClick}
          className="absolute left-[32px] top-0 w-4 h-4 flex items-center justify-center"
          aria-label={isLiked ? '찜 해제' : '찜하기'}
        >
          {isLiked ? <HeartFilledIcon size={12} /> : <HeartIcon size={12} />}
        </button>
      </div>

      {/* 중간 영역: 책 정보 (left: 144px = 48px + 96px 간격) */}
      <div className="ml-[48px] flex items-center gap-4 flex-1">
        <h3 className="text-[18px] font-bold leading-[18px] text-[#353C49] truncate max-w-[300px]">
          {book.title}
        </h3>
        <p className="text-[14px] font-medium leading-[14px] text-[#6D7582]">{book.author}</p>
      </div>

      {/* 오른쪽 영역: 가격과 버튼들 */}
      <div className="flex items-center">
        {/* 가격 (right: 310px) */}
        <div className="mr-[57px] text-right">
          <div className="text-[18px] font-bold leading-[18px] text-[#353C49]">
            {book.price ? `${book.price.toLocaleString()}원` : '가격미정'}
          </div>
        </div>

        {/* 구매하기 버튼 (right: 139px) */}
        <div className="mr-[8px]">
          <Button onClick={handlePurchaseClick} disabled={!book.url} variant="primary" size="md">
            구매하기
          </Button>
        </div>

        {/* 상세보기 버튼 (right: 16px) */}
        <div className="mr-[16px]">
          <Button onClick={handleDetailClick} variant="outline" size="md">
            상세보기
            <ChevronDetailDownIcon size={14} className="ml-1" fill="#B1B8C0" />
          </Button>
        </div>
      </div>
    </div>
  )
}
