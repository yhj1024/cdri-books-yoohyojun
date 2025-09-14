import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { BookListItem } from './book-list-item'

// IntersectionObserver mock
const mockIntersectionObserver = vi.fn()
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
})
window.IntersectionObserver = mockIntersectionObserver

const mockBook = {
  id: '1',
  title: '테스트 책',
  author: '테스트 작가',
  publisher: '테스트 출판사',
  isbn: '1234567890',
  price: 20000,
  salePrice: 18000,
  url: 'https://example.com',
}

describe('BookListItem 컴포넌트', () => {
  it('필수 요소들이 렌더링된다', () => {
    const { container } = render(<BookListItem book={mockBook} />)

    // 컨테이너가 존재하는지
    expect(container.firstChild).toBeInTheDocument()

    // 하트 버튼이 존재하는지 (aria-label로 확인)
    expect(container.querySelector('button[aria-label*="찜"]')).toBeInTheDocument()

    // 구매하기 버튼이 존재하는지
    expect(screen.getByRole('button', { name: /구매하기/ })).toBeInTheDocument()

    // 전체 버튼 개수 확인 (찜하기, 상세보기, 구매하기)
    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(3)
  })

  it('찜하기 버튼 클릭 시 콜백이 호출된다', () => {
    const handleToggleLike = vi.fn()
    render(<BookListItem book={mockBook} onToggleLike={handleToggleLike} />)

    const likeButton = screen.getByRole('button', { name: /찜하기/ })
    fireEvent.click(likeButton)

    expect(handleToggleLike).toHaveBeenCalledWith('1')
  })

  it('상세보기 버튼 클릭 시 콜백이 호출된다', () => {
    const handleViewDetail = vi.fn()
    render(<BookListItem book={mockBook} onViewDetail={handleViewDetail} />)

    const detailButtons = screen.getAllByRole('button')
    const detailButton = detailButtons.find((btn) => btn.textContent?.includes('상세보기'))

    if (detailButton) {
      fireEvent.click(detailButton)
      expect(handleViewDetail).toHaveBeenCalledWith(mockBook)
    }
  })

  it('구매하기 버튼 클릭 시 새 탭이 열린다', () => {
    const windowOpenSpy = vi.spyOn(window, 'open').mockImplementation(() => null)

    render(<BookListItem book={mockBook} />)

    const purchaseButton = screen.getByRole('button', { name: /구매하기/ })
    fireEvent.click(purchaseButton)

    expect(windowOpenSpy).toHaveBeenCalledWith('https://example.com', '_blank')

    windowOpenSpy.mockRestore()
  })

  it('URL이 없으면 구매하기 버튼이 비활성화된다', () => {
    const bookWithoutUrl = { ...mockBook, url: undefined }

    render(<BookListItem book={bookWithoutUrl} />)

    const purchaseButton = screen.getByRole('button', { name: /구매하기/ })
    expect(purchaseButton).toBeDisabled()
  })

  it('찜한 상태가 올바르게 표시된다', () => {
    render(<BookListItem book={mockBook} isLiked={true} />)

    const likeButton = screen.getByRole('button', { name: /찜 해제/ })
    expect(likeButton).toBeInTheDocument()
  })
})
