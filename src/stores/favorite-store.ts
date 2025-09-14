import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Book } from '../types/book'

interface FavoriteStore {
  // 상태
  favoriteBooks: Book[]
  likedBookIds: Set<string>

  // 액션
  addFavorite: (book: Book) => void
  removeFavorite: (bookId: string) => void
  toggleFavorite: (book: Book) => void
  isFavorite: (bookId: string) => boolean
  clearFavorites: () => void
}

export const useFavoriteStore = create<FavoriteStore>()(
  persist(
    (set, get) => ({
      // 초기 상태
      favoriteBooks: [],
      likedBookIds: new Set<string>(),

      // 찜하기 추가 (최신 찜한 책이 맨 앞에)
      addFavorite: (book) =>
        set((state) => {
          const newFavoriteBooks = [book, ...state.favoriteBooks]
          return {
            favoriteBooks: newFavoriteBooks,
            likedBookIds: new Set(newFavoriteBooks.map((b) => b.id)),
          }
        }),

      // 찜하기 제거
      removeFavorite: (bookId) =>
        set((state) => {
          const newFavoriteBooks = state.favoriteBooks.filter((book) => book.id !== bookId)
          return {
            favoriteBooks: newFavoriteBooks,
            likedBookIds: new Set(newFavoriteBooks.map((b) => b.id)),
          }
        }),

      // 찜하기 토글
      toggleFavorite: (book) => {
        const isFav = get().isFavorite(book.id)
        if (isFav) {
          get().removeFavorite(book.id)
        } else {
          get().addFavorite(book)
        }
      },

      // 찜한 책인지 확인
      isFavorite: (bookId) => {
        return get().favoriteBooks.some((book) => book.id === bookId)
      },

      // 모든 찜하기 제거
      clearFavorites: () => set({ favoriteBooks: [], likedBookIds: new Set() }),
    }),
    {
      name: 'favorite-books',
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name)
          if (!str) return null

          const { state } = JSON.parse(str)

          // likedBookIds를 배열에서 Set으로 복원
          return {
            state: {
              ...state,
              likedBookIds: new Set(state.likedBookIds || []),
            },
          }
        },
        setItem: (name, value) => {
          // Set을 배열로 변환하여 저장
          const toStore = {
            state: {
              ...value.state,
              likedBookIds: Array.from(value.state.likedBookIds || []),
            },
          }
          localStorage.setItem(name, JSON.stringify(toStore))
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    },
  ),
)
