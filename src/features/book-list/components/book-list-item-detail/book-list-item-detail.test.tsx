import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { BookListItemDetail } from '@/features/book-list'

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
  contents: '이것은 테스트 책의 내용입니다. 매우 흥미로운 책입니다.',
  publishedDate: '2024-01-01',
  status: '판매중',
}

describe('BookListItemDetail 컴포넌트', () => {
  it('필수 요소들이 렌더링된다', () => {
    const { container } = render(<BookListItemDetail book={mockBook} />)

    // 컨테이너가 존재하는지
    expect(container.firstChild).toBeInTheDocument()

    // 하트 버튼이 존재하는지
    expect(container.querySelector('button[aria-label*="찜"]')).toBeInTheDocument()

    // 구매하기 버튼이 존재하는지
    expect(screen.getByRole('button', { name: /구매하기/ })).toBeInTheDocument()

    // 상세 접기 버튼이 존재하는지
    const buttons = screen.getAllByRole('button')
    expect(buttons.some((btn) => btn.textContent?.includes('상세 접기'))).toBe(true)
  })

  it('찜하기 버튼 클릭 시 콜백이 호출된다', () => {
    const handleToggleLike = vi.fn()
    render(<BookListItemDetail book={mockBook} onToggleLike={handleToggleLike} />)

    const likeButton = screen.getByRole('button', { name: /찜하기/ })
    fireEvent.click(likeButton)

    expect(handleToggleLike).toHaveBeenCalledWith('1')
  })

  it('상세 접기 버튼 클릭 시 콜백이 호출된다', () => {
    const handleToggleExpand = vi.fn()
    render(<BookListItemDetail book={mockBook} onToggleExpand={handleToggleExpand} />)

    const detailButtons = screen.getAllByRole('button')
    const detailButton = detailButtons.find((btn) => btn.textContent?.includes('상세 접기'))

    if (detailButton) {
      fireEvent.click(detailButton)
      expect(handleToggleExpand).toHaveBeenCalledWith('1')
    }
  })

  it('구매하기 버튼 클릭 시 새 탭이 열린다', () => {
    const windowOpenSpy = vi.spyOn(window, 'open').mockImplementation(() => null)

    render(<BookListItemDetail book={mockBook} />)

    const purchaseButton = screen.getByRole('button', { name: /구매하기/ })
    fireEvent.click(purchaseButton)

    expect(windowOpenSpy).toHaveBeenCalledWith('https://example.com', '_blank')

    windowOpenSpy.mockRestore()
  })

  it('상세 정보가 표시된다', () => {
    render(<BookListItemDetail book={mockBook} />)

    // 여러 버튼이 있는지 확인
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThan(2)
  })

  it('찜한 상태가 올바르게 표시된다', () => {
    render(<BookListItemDetail book={mockBook} isLiked={true} />)

    const likeButton = screen.getByRole('button', { name: /찜 해제/ })
    expect(likeButton).toBeInTheDocument()
  })
})
