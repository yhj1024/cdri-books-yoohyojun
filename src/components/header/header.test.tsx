import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Header } from './header'

describe('헤더 컴포넌트', () => {
  it('필수 요소들이 렌더링된다', () => {
    const { container } = render(<Header />)

    // 헤더가 존재하는지
    expect(container.querySelector('header')).toBeInTheDocument()

    // 로고 링크가 존재하는지
    expect(container.querySelector('h1 a[href="/"]')).toBeInTheDocument()

    // 네비게이션이 존재하는지
    expect(container.querySelector('nav')).toBeInTheDocument()

    // 네비게이션 링크들이 존재하는지
    expect(container.querySelector('a[href="#search"]')).toBeInTheDocument()
    expect(container.querySelector('a[href="#favorites"]')).toBeInTheDocument()
  })

  it('탭 클릭 시 콜백이 호출된다', () => {
    const handleTabChange = vi.fn()
    render(<Header onTabChange={handleTabChange} />)

    fireEvent.click(screen.getByText('내가 찜한 책'))
    expect(handleTabChange).toHaveBeenCalledWith('favorites')

    fireEvent.click(screen.getByText('도서 검색'))
    expect(handleTabChange).toHaveBeenCalledWith('search')
  })
})
