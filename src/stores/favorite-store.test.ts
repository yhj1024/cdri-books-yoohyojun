import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useFavoriteStore } from './favorite-store'
import type { Book } from '../types/book'

describe('FavoriteStore', () => {
  const mockBook: Book = {
    id: 'book-1',
    title: '테스트 책',
    author: '저자1',
    publisher: '출판사',
    publishedDate: '2024-01-01',
    thumbnail: 'https://example.com/image.jpg',
    contents: '책 내용',
    price: 15000,
    salePrice: 13500,
    isbn: '1234567890',
    status: '정상',
    url: 'https://example.com/book',
  }

  const mockBook2: Book = {
    ...mockBook,
    id: 'book-2',
    title: '테스트 책 2',
  }

  beforeEach(() => {
    // localStorage 초기화
    localStorage.clear()
    // Zustand store 초기화
    useFavoriteStore.setState({
      favoriteBooks: [],
      likedBookIds: new Set(),
    })
  })

  describe('기본 기능', () => {
    it('책을 찜하기에 추가할 수 있다', () => {
      const { result } = renderHook(() => useFavoriteStore())

      act(() => {
        result.current.addFavorite(mockBook)
      })

      expect(result.current.favoriteBooks).toHaveLength(1)
      expect(result.current.favoriteBooks[0]).toEqual(mockBook)
      expect(result.current.likedBookIds.has(mockBook.id)).toBe(true)
    })

    it('책을 찜하기에서 제거할 수 있다', () => {
      const { result } = renderHook(() => useFavoriteStore())

      act(() => {
        result.current.addFavorite(mockBook)
        result.current.removeFavorite(mockBook.id)
      })

      expect(result.current.favoriteBooks).toHaveLength(0)
      expect(result.current.likedBookIds.has(mockBook.id)).toBe(false)
    })

    it('찜하기 토글이 작동한다', () => {
      const { result } = renderHook(() => useFavoriteStore())

      // 추가
      act(() => {
        result.current.toggleFavorite(mockBook)
      })
      expect(result.current.isFavorite(mockBook.id)).toBe(true)

      // 제거
      act(() => {
        result.current.toggleFavorite(mockBook)
      })
      expect(result.current.isFavorite(mockBook.id)).toBe(false)
    })

    it('모든 찜하기를 제거할 수 있다', () => {
      const { result } = renderHook(() => useFavoriteStore())

      act(() => {
        result.current.addFavorite(mockBook)
        result.current.addFavorite(mockBook2)
        result.current.clearFavorites()
      })

      expect(result.current.favoriteBooks).toHaveLength(0)
      expect(result.current.likedBookIds.size).toBe(0)
    })
  })

  describe('localStorage 직렬화', () => {
    it('Set이 localStorage에 저장되고 복원된다', () => {
      const { result } = renderHook(() => useFavoriteStore())

      // 책 추가
      act(() => {
        result.current.addFavorite(mockBook)
        result.current.addFavorite(mockBook2)
      })

      // localStorage에 저장된 데이터 확인
      const storedData = localStorage.getItem('favorite-books')
      expect(storedData).toBeTruthy()

      const parsed = JSON.parse(storedData!)
      expect(Array.isArray(parsed.state.likedBookIds)).toBe(true)
      expect(parsed.state.likedBookIds).toHaveLength(2)
    })

    it('새로고침 후에도 likedBookIds가 Set으로 복원된다', async () => {
      // 첫 번째 렌더링 - 데이터 저장
      const { result: result1 } = renderHook(() => useFavoriteStore())

      act(() => {
        result1.current.addFavorite(mockBook)
        result1.current.addFavorite(mockBook2)
      })

      // localStorage에 저장된 데이터 확인
      const storedData = localStorage.getItem('favorite-books')
      expect(storedData).toBeTruthy()

      // Store를 재생성하기 위해 getState를 호출하여 hydration 트리거
      const storage = useFavoriteStore.persist?.getOptions()?.storage
      if (storage) {
        const persistedData = await storage.getItem('favorite-books')

        // 저장된 데이터에서 상태 복원
        if (persistedData && persistedData.state) {
          act(() => {
            useFavoriteStore.setState(persistedData.state)
          })
        }
      }

      const { result: result2 } = renderHook(() => useFavoriteStore())

      // likedBookIds가 Set인지 확인
      expect(result2.current.likedBookIds).toBeInstanceOf(Set)

      // Set의 메서드가 정상 작동하는지 확인
      expect(result2.current.likedBookIds.has(mockBook.id)).toBe(true)
      expect(result2.current.likedBookIds.has(mockBook2.id)).toBe(true)
      expect(result2.current.likedBookIds.size).toBe(2)

      // favoriteBooks도 복원되었는지 확인
      expect(result2.current.favoriteBooks).toHaveLength(2)
    })

    it('localStorage에서 잘못된 데이터를 처리할 수 있다', () => {
      // 잘못된 형식의 데이터를 localStorage에 저장
      localStorage.setItem(
        'favorite-books',
        JSON.stringify({
          state: {
            favoriteBooks: [mockBook],
            likedBookIds: undefined, // Set이 아닌 undefined
          },
        }),
      )

      const { result } = renderHook(() => useFavoriteStore())

      // 에러 없이 빈 Set으로 초기화되어야 함
      expect(result.current.likedBookIds).toBeInstanceOf(Set)
      expect(result.current.likedBookIds.size).toBe(0)
    })

    it('likedBookIds.has() 메서드가 항상 작동한다', async () => {
      const { result } = renderHook(() => useFavoriteStore())

      // 데이터 추가
      act(() => {
        result.current.addFavorite(mockBook)
      })

      // localStorage에 저장된 데이터 확인
      const storedData = localStorage.getItem('favorite-books')
      expect(storedData).toBeTruthy()

      // Store를 재생성하기 위해 getState를 호출하여 hydration 트리거
      const storage = useFavoriteStore.persist?.getOptions()?.storage
      if (storage) {
        const persistedData = await storage.getItem('favorite-books')

        // 저장된 데이터에서 상태 복원
        if (persistedData && persistedData.state) {
          act(() => {
            useFavoriteStore.setState(persistedData.state)
          })
        }
      }

      // 새로운 hook 인스턴스로 테스트
      const { result: newResult } = renderHook(() => useFavoriteStore())

      // has 메서드가 함수인지 확인
      expect(typeof newResult.current.likedBookIds.has).toBe('function')

      // has 메서드가 정상 작동하는지 확인
      expect(() => {
        newResult.current.likedBookIds.has(mockBook.id)
      }).not.toThrow()

      expect(newResult.current.likedBookIds.has(mockBook.id)).toBe(true)
    })
  })

  describe('동기화', () => {
    it('favoriteBooks와 likedBookIds가 동기화된다', () => {
      const { result } = renderHook(() => useFavoriteStore())

      act(() => {
        result.current.addFavorite(mockBook)
        result.current.addFavorite(mockBook2)
      })

      // favoriteBooks의 모든 ID가 likedBookIds에 있는지 확인
      result.current.favoriteBooks.forEach((book) => {
        expect(result.current.likedBookIds.has(book.id)).toBe(true)
      })

      // likedBookIds의 크기가 favoriteBooks 길이와 같은지 확인
      expect(result.current.likedBookIds.size).toBe(result.current.favoriteBooks.length)
    })
  })
})
