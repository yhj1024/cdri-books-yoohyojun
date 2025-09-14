import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export type SearchTarget = 'title' | 'person' | 'publisher'

interface SearchHistory {
  query: string
  target: SearchTarget
  timestamp: number
}

interface SearchStore {
  // 상태
  searchTarget: SearchTarget
  searchHistory: SearchHistory[]

  // 액션
  setSearchTarget: (target: SearchTarget) => void
  addSearchHistory: (query: string, target: SearchTarget) => void
  removeSearchHistory: (query: string, target: SearchTarget) => void
}

export const useSearchStore = create<SearchStore>()(
  persist(
    (set) => ({
      // 초기 상태
      searchTarget: 'title',
      searchHistory: [],

      // 검색 타겟 설정
      setSearchTarget: (target) => set({ searchTarget: target }),

      // 검색 기록 추가
      addSearchHistory: (query, target) => {
        if (!query.trim()) return

        const newHistory: SearchHistory = {
          query: query.trim(),
          target,
          timestamp: Date.now(),
        }

        set((state) => ({
          searchHistory: [
            newHistory,
            // 중복 제거 및 최대 8개까지만 저장
            ...state.searchHistory
              .filter((h) => !(h.query === query.trim() && h.target === target))
              .slice(0, 7),
          ],
        }))
      },

      // 개별 검색 기록 삭제
      removeSearchHistory: (query, target) => {
        set((state) => ({
          searchHistory: state.searchHistory.filter(
            (h) => !(h.query === query && h.target === target),
          ),
        }))
      },
    }),
    {
      name: 'search-settings',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
