import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
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

      // 찜하기 추가
      addFavorite: (book) =>
        set((state) => {
          const newFavoriteBooks = [...state.favoriteBooks, book]
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
      name: 'favorite-books', // localStorage key
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
