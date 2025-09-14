import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { NoData } from './no-data'

describe('NoData 컴포넌트', () => {
  it('메시지가 렌더링된다', () => {
    const message = '검색 결과가 없습니다.'
    render(<NoData message={message} />)
    expect(screen.getByText(message)).toBeInTheDocument()
  })

  it('커스텀 메시지가 렌더링된다', () => {
    const customMessage = '찜한 책이 없습니다.'
    render(<NoData message={customMessage} />)
    expect(screen.getByText(customMessage)).toBeInTheDocument()
  })

  it('책 아이콘이 렌더링된다', () => {
    render(<NoData message="검색 결과가 없습니다." />)
    const bookIcon = screen.getByAltText('book-icon')
    expect(bookIcon).toBeInTheDocument()
    expect(bookIcon).toHaveAttribute('src', '/book.webp')
  })

  it('컨테이너가 올바르게 렌더링된다', () => {
    const { container } = render(<NoData message="테스트 메시지" />)
    const wrapper = container.firstChild as HTMLElement

    expect(wrapper).toBeInTheDocument()
  })
})
