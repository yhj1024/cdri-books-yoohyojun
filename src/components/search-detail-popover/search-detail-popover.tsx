import { useEffect, useRef, useState } from 'react'
import { XSmallIcon } from '../icons'
import { Button } from '../button'
import { Select } from '../select'
import type { SelectOption } from '../select'

interface SearchDetailPopoverProps {
  isOpen: boolean
  onClose: () => void
  onSearch: (category: string, keyword: string) => void
  searchCategories?: SelectOption[]
}

const defaultSearchCategories: SelectOption[] = [
  { id: 'title', label: '제목', value: 'title' },
  { id: 'author', label: '저자', value: 'author' },
  { id: 'publisher', label: '출판사', value: 'publisher' },
  { id: 'isbn', label: 'ISBN', value: 'isbn' },
]

export const SearchDetailPopover = ({
  isOpen,
  onClose,
  onSearch,
  searchCategories = defaultSearchCategories,
}: SearchDetailPopoverProps) => {
  const [selectedCategory, setSelectedCategory] = useState<SelectOption>(searchCategories[0])
  const [keyword, setKeyword] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const popoverRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  const handleSubmit = () => {
    if (keyword.trim()) {
      onSearch(selectedCategory.value, keyword.trim())
      setKeyword('')
      onClose()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit()
    } else if (e.key === 'Escape') {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div
      ref={popoverRef}
      className="absolute top-[calc(100%+15px)] left-1/2 -translate-x-1/2 w-[360px] h-[160px] bg-white rounded-[8px] shadow-[0_4px_14px_6px_rgba(151,151,151,0.15)] z-50"
    >
      {/* Close button - CSS: left: 742px(332px from container), top: 356px(8px from container) */}
      <button
        onClick={onClose}
        className="absolute top-[8px] right-[8px] w-[20px] h-[20px] flex items-center justify-center"
      >
        <XSmallIcon size={12} />
      </button>

      {/* Content container - padding: 36px 24px */}
      <div className="px-[24px] pt-[36px] pb-[24px] h-full flex flex-col justify-between">
        {/* Search inputs */}
        <div className="flex gap-[4px]">
          <Select
            options={searchCategories}
            value={selectedCategory}
            onChange={setSelectedCategory}
          />
          <input
            ref={inputRef}
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="검색어 입력"
            className="flex-1 h-[36px] px-[9.5px] py-[8px] border-b border-[#4880EE] bg-transparent text-[14px] font-medium placeholder-[#8D94A0] outline-none"
          />
        </div>

        {/* Search button - width: 312px, height: 36px */}
        <Button variant="primary" size="popover" onClick={handleSubmit}>
          검색하기
        </Button>
      </div>
    </div>
  )
}
