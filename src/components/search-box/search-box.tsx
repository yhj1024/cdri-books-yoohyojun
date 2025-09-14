import { useState } from 'react'
import { SearchIcon } from '../icons'
import { Button } from '../button'
import { SearchDetailPopover } from '../search-detail-popover'
import type { SelectOption } from '../select'

interface SearchBoxProps {
  value?: string
  onChange?: (value: string) => void
  onSearch?: () => void
  onDetailSearch?: (category: string, keyword: string) => void
  placeholder?: string
  title?: string
  searchCategories?: SelectOption[]
}

export const SearchBox = ({
  value = '',
  onChange,
  onSearch,
  onDetailSearch,
  placeholder = '검색어를 입력하세요',
  title,
  searchCategories,
}: SearchBoxProps) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch?.()
    }
  }

  const handleDetailSearch = (category: string, keyword: string) => {
    onDetailSearch?.(category, keyword)
  }

  return (
    <div className="relative w-[568px] h-[103px]">
      {/* 도서 검색 타이틀 */}
      {title && (
        <div className="absolute left-0 top-0 text-[22px] font-bold leading-[24px] text-[#1A1E27]">
          {title}
        </div>
      )}

      {/* 검색 입력창 */}
      <div className="absolute left-0 right-[88px] top-[52px] bottom-0 flex items-center bg-[#F2F4F6] rounded-[100px] px-[10px] gap-[11px]">
        <div className="w-[30px] h-[30px] flex items-center justify-center">
          <SearchIcon size={24} />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 text-[16px] font-medium leading-[16px] text-[#222222] placeholder-[#8D94A0] bg-transparent outline-none"
        />
      </div>

      {/* 상세검색 버튼 */}
      <div className="absolute right-0 top-[61px]">
        <Button variant="outline-border" size="sm" onClick={() => setIsPopoverOpen(true)}>
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
