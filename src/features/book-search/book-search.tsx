import { useState, useCallback } from 'react'
import { SearchBox } from '@/components/search-box'
import { SearchCountText } from '@/components/search-count-text'
import { SearchHistory } from '@/components/search-history'
import { useSearchStore, type SearchTarget } from '@/stores/search-store.ts'
import type { SelectOption } from '@/components/select'

interface BookSearchProps {
  onSearch: (keyword: string, target?: SearchTarget) => void
  totalCount?: number
  isLoading?: boolean
}

const searchCategories: SelectOption[] = [
  { id: 'title', label: '제목', value: 'title' },
  { id: 'person', label: '저자명', value: 'person' },
  { id: 'publisher', label: '출판사', value: 'publisher' },
]

export const BookSearch = ({ onSearch, totalCount = 0 }: BookSearchProps) => {
  const [inputValue, setInputValue] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const { searchTarget, searchHistory, setSearchTarget, addSearchHistory, removeSearchHistory } =
    useSearchStore()

  // 최근 검색 기록 가져오기 (최대 8개)
  const recentSearches = searchHistory.slice(0, 8)
  // 포커스 상태이고 검색 기록이 있을 때만 표시
  const isHistoryVisible = isFocused && recentSearches.length > 0

  const handleSearch = useCallback(
    (keyword: string) => {
      if (!keyword.trim()) return

      setInputValue(keyword)
      onSearch(keyword, searchTarget)
      addSearchHistory(keyword, searchTarget)
      setIsFocused(false) // 검색 실행 후 포커스 해제
    },
    [onSearch, searchTarget, addSearchHistory],
  )

  const handleDetailSearch = useCallback(
    (category: string, keyword: string) => {
      const target = category as SearchTarget
      setSearchTarget(target)
      setInputValue('') // 전체 검색 입력값 초기화
      onSearch(keyword, target)
      // 상세 검색은 검색 기록에 추가하지 않음
      setIsFocused(false) // 상세 검색 후 검색 기록 닫기
    },
    [onSearch, setSearchTarget],
  )

  const handleInputChange = useCallback((value: string) => {
    setInputValue(value)
    // 텍스트에 변화가 생기면 검색 기록을 다시 보여줌
    setIsFocused(true)
  }, [])

  const handleSelectHistory = useCallback(
    (query: string, target: SearchTarget) => {
      setInputValue(query)
      setSearchTarget(target)
      onSearch(query, target)
      addSearchHistory(query, target)
      setIsFocused(false) // 선택 후 포커스 해제
    },
    [onSearch, setSearchTarget, addSearchHistory],
  )

  const handleRemoveHistory = useCallback(
    (query: string, target: SearchTarget) => {
      removeSearchHistory(query, target)
      // 삭제 후에도 포커스 상태 유지
      if (!isFocused) {
        setIsFocused(true)
      }
    },
    [removeSearchHistory, isFocused],
  )

  const handleInputFocus = useCallback(() => {
    setIsFocused(true)
  }, [])

  return (
    <div className="w-full">
      <div className="relative">
        <SearchBox
          value={inputValue}
          title={'도서 검색'}
          onChange={handleInputChange}
          onSearch={handleSearch}
          onDetailSearch={handleDetailSearch}
          onFocus={handleInputFocus}
          placeholder="검색어를 입력하세요"
          searchCategories={searchCategories}
          isHistoryVisible={isHistoryVisible}
        />
        <SearchHistory
          isOpen={isHistoryVisible}
          searchHistory={recentSearches}
          onSelectHistory={handleSelectHistory}
          onRemoveHistory={handleRemoveHistory}
        />
      </div>
      <div className="mt-4">
        <SearchCountText text={'도서 검색 결과'} count={totalCount} />
      </div>
    </div>
  )
}
