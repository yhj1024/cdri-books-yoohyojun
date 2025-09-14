import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { SearchBox } from './search-box'

describe('서치박스 컴포넌트', () => {
  it('렌더링된다', () => {
    render(<SearchBox />)
    expect(screen.getByPlaceholderText('검색어를 입력하세요')).toBeInTheDocument()
    expect(screen.getByText('상세검색')).toBeInTheDocument()
  })

  it('값이 변경된다', () => {
    const handleChange = vi.fn()
    render(<SearchBox onChange={handleChange} />)

    const input = screen.getByPlaceholderText('검색어를 입력하세요')
    fireEvent.change(input, { target: { value: '테스트' } })
    expect(handleChange).toHaveBeenCalledWith('테스트')
  })

  it('엔터키로 검색된다', () => {
    const handleSearch = vi.fn()
    render(<SearchBox onSearch={handleSearch} />)

    const input = screen.getByPlaceholderText('검색어를 입력하세요')
    fireEvent.keyDown(input, { key: 'Enter' })
    expect(handleSearch).toHaveBeenCalled()
  })

  it('상세검색 팝오버가 열린다', () => {
    render(<SearchBox />)

    fireEvent.click(screen.getByText('상세검색'))
    expect(screen.getByText('검색하기')).toBeInTheDocument()
  })
})
