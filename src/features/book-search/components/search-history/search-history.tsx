import { XSmallIcon } from '@/components/icons'
import type { SearchTarget } from '@/stores/search-store.ts'

interface SearchHistoryItem {
  query: string
  target: SearchTarget
  timestamp: number
}

interface SearchHistoryProps {
  isOpen: boolean
  searchHistory: SearchHistoryItem[]
  onSelectHistory: (query: string, target: SearchTarget) => void
  onRemoveHistory: (query: string, target: SearchTarget) => void
}

export const SearchHistory = ({
  isOpen,
  searchHistory,
  onSelectHistory,
  onRemoveHistory,
}: SearchHistoryProps) => {
  if (!isOpen) return null

  // 검색 기록이 없으면 아무것도 렌더링하지 않음
  if (searchHistory.length === 0) return null

  return (
    <ul
      className="absolute left-0 top-full w-[480px] bg-[#F2F4F6] rounded-b-[24px] z-10 py-3 pl-[51px] pr-[20px] list-none"
      onMouseDown={(e) => e.preventDefault()} // 포커스 유지
    >
      {searchHistory.slice(0, 8).map((item) => (
        <li key={item.timestamp} className="w-full flex items-center justify-between py-2">
          <button
            className="flex-1 text-left"
            onClick={() => onSelectHistory(item.query, item.target)}
          >
            <span className="text-[16px] font-medium leading-[16px] text-[#8D94A0]">
              {item.query}
            </span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onRemoveHistory(item.query, item.target)
            }}
            className="p-1 text-[#222222]"
          >
            <XSmallIcon size={16} />
          </button>
        </li>
      ))}
    </ul>
  )
}
