import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Header } from './header'

describe('헤더 컴포넌트', () => {
  it('렌더링된다', () => {
    render(<Header />)
    expect(screen.getByText('CERTICOS BOOKS')).toBeInTheDocument()
    expect(screen.getByText('도서 검색')).toBeInTheDocument()
    expect(screen.getByText('내가 찜한 책')).toBeInTheDocument()
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
