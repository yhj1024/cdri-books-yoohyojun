import { useState } from 'react'
import { SearchIcon } from '@/components/icons'
import { Button } from '@/components/button'
import { SearchDetailPopover } from '@/features/book-search'
import type { SelectOption } from '@/components/select'

interface SearchBoxProps {
  value?: string
  onChange?: (value: string) => void
  onSearch?: (keyword: string) => void
  onDetailSearch?: (category: string, keyword: string) => void
  onFocus?: () => void
  placeholder?: string
  title?: string
  searchCategories?: SelectOption[]
  isHistoryVisible?: boolean
}

export const SearchBox = ({
  value = '',
  onChange,
  onSearch,
  onDetailSearch,
  onFocus,
  placeholder = '검색어를 입력하세요',
  title,
  searchCategories,
  isHistoryVisible = false,
}: SearchBoxProps) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch?.(value)
    }
  }

  const handleDetailSearch = (category: string, keyword: string) => {
    onDetailSearch?.(category, keyword)
  }

  const borderRadius = isHistoryVisible ? 'rounded-t-[25px]' : 'rounded-[25px]'

  return (
    <div className="relative w-[568px] h-[103px]">
      {/* 도서 검색 타이틀 */}
      {title && (
        <div className="absolute left-0 top-0 text-[22px] font-bold leading-[24px] text-[#1A1E27]">
          {title}
        </div>
      )}

      {/* 검색 입력창 */}
      <div
        className={`absolute left-0 right-[88px] top-[52px] bottom-0 flex items-center bg-[#F2F4F6] ${borderRadius} px-[10px] gap-[11px]`}
      >
        <div className="w-[30px] h-[30px] flex items-center justify-center">
          <SearchIcon size={24} />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={onFocus}
          placeholder={placeholder}
          className="flex-1 text-[16px] font-medium leading-[16px] text-[#222222] placeholder-[#8D94A0] bg-transparent outline-none"
          aria-label="도서 검색어 입력"
          aria-autocomplete="list"
          aria-expanded={isHistoryVisible}
          aria-haspopup="listbox"
        />
      </div>

      {/* 상세검색 버튼 */}
      <div className="absolute right-0 top-[61px]">
        <Button
          variant="outline-border"
          size="sm"
          onClick={() => setIsPopoverOpen(true)}
          aria-label="상세 검색 열기"
          aria-expanded={isPopoverOpen}
          aria-haspopup="dialog"
        >
          상세검색
        </Button>

        {/* 상세검색 팝오버 */}
        <SearchDetailPopover
          isOpen={isPopoverOpen}
          onClose={() => setIsPopoverOpen(false)}
          onSearch={handleDetailSearch}
          searchCategories={searchCategories}
        />
      </div>
    </div>
  )
}
