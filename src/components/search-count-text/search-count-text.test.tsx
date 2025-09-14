import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { SearchCountText } from './search-count-text'

describe('검색 결과 개수 텍스트 컴포넌트', () => {
  it('렌더링된다', () => {
    render(<SearchCountText text="도서 검색 결과" count={21} />)
    expect(screen.getByText('도서 검색 결과')).toBeInTheDocument()
    expect(screen.getByText('21')).toBeInTheDocument()
  })
})
