import { Button } from '@/components/button'
import { Image } from '@/components/image'
import { HeartIcon, HeartFilledIcon, ChevronDetailUpIcon } from '@/components/icons'
import type { Book } from '@/types/book.ts'

interface BookListItemDetailProps {
  book: Book
  onToggleLike?: (bookId: string) => void
  onToggleExpand?: (bookId: string) => void
  isLiked?: boolean
}

export const BookListItemDetail = ({
  book,
  onToggleLike,
  onToggleExpand,
  isLiked = false,
}: BookListItemDetailProps) => {
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
    <div className="w-[960px] h-[344px] bg-white relative">
      {/* 하단 구분선 */}
      <div className="absolute left-0 right-0 bottom-0 h-[1px] bg-[#D2D6DA]" />

      {/* 왼쪽: 책 이미지 프레임 */}
      <div className="absolute left-[54px] top-[24px] w-[210px] h-[280px]">
        <Image
          src={book.thumbnail}
          alt={book.title}
          width="210px"
          height="280px"
          className="w-[210px] h-[280px] object-cover"
        />
        {/* 하트 아이콘 */}
        <button
          onClick={handleLikeClick}
          className="absolute left-[178px] top-[8px] w-6 h-6 flex items-center justify-center"
          aria-label={isLiked ? '찜 해제' : '찜하기'}
        >
          {isLiked ? <HeartFilledIcon size={20} /> : <HeartIcon size={20} />}
        </button>
      </div>

      {/* 중앙 상단: 책 제목과 저자 */}
      <div className="absolute left-[296px] top-[44px] flex items-center gap-4">
        <h3 className="text-[18px] font-bold leading-[26px] text-[#353C49] max-w-[200px] truncate">
          {book.title}
        </h3>
        <span className="text-[14px] font-medium leading-[22px] text-[#8D94A0]">{book.author}</span>
      </div>

      {/* 중앙 하단: 책 소개 */}
      {book.contents && (
        <div className="absolute left-[296px] top-[86px] w-[360px] h-[218px]">
          <h4 className="absolute left-0 top-0 text-[14px] font-bold leading-[26px] text-[#353C49]">
            책 소개
          </h4>
          <p className="absolute left-0 top-[38px] right-0 bottom-0 text-[10px] font-medium leading-[16px] text-[#353C49] overflow-hidden">
            {book.contents}
          </p>
        </div>
      )}

      {/* 우측 상단: 상세 접기 버튼 */}
      <div className="absolute right-[16px] top-[26px]">
        <Button onClick={handleDetailClick} variant="outline" size="md">
          상세 접기
          <ChevronDetailUpIcon size={14} className="ml-1" fill="#B1B8C0" />
        </Button>
      </div>

      {/* 우측 중간: 가격 정보 */}
      {/* 원가 - 할인가가 있을 때만 표시 */}
      {book.price && book.salePrice && book.salePrice < book.price && (
        <>
          {/* 원가 */}
          <div className="absolute right-[20px] bottom-[150px] flex items-center gap-2">
            <span className="text-[10px] font-medium leading-[22px] text-[#8D94A0] w-[37px] text-right">
              원가
            </span>
            <span className="text-[18px] font-[350] leading-[26px] text-[#353C49] line-through w-[84px] text-right">
              {book.price.toLocaleString()}원
            </span>
          </div>
          {/* 할인가 */}
          <div className="absolute right-[20px] bottom-[116px] flex items-center gap-2">
            <span className="text-[10px] font-medium leading-[22px] text-[#8D94A0] w-[37px] text-right">
              할인가
            </span>
            <span className="text-[18px] font-bold leading-[26px] text-[#353C49] w-[84px] text-right">
              {book.salePrice.toLocaleString()}원
            </span>
          </div>
        </>
      )}

      {/* 할인가가 없을 때 - 원가만 표시 */}
      {(!book.salePrice || book.salePrice >= (book.price || 0)) && book.price && (
        <div className="absolute right-[20px] bottom-[116px] flex items-center gap-2">
          <span className="text-[10px] font-medium leading-[22px] text-[#8D94A0] w-[37px] text-right">
            원가
          </span>
          <span className="text-[18px] font-bold leading-[26px] text-[#353C49] w-[84px] text-right">
            {book.price.toLocaleString()}원
          </span>
        </div>
      )}

      {/* 우측 하단: 구매하기 버튼 */}
      <div className="absolute right-[16px] bottom-[40px]">
        <Button onClick={handlePurchaseClick} disabled={!book.url} variant="primary" size="full">
          구매하기
        </Button>
      </div>
    </div>
  )
}
