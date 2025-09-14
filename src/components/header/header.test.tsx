import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import { Header } from './header'

describe('헤더 컴포넌트', () => {
  it('필수 요소들이 렌더링된다', () => {
    const { container } = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    )

    // 헤더가 존재하는지
    expect(container.querySelector('header')).toBeInTheDocument()

    // 로고가 존재하는지
    expect(container.querySelector('h1')).toBeInTheDocument()

    // 네비게이션이 존재하는지
    expect(container.querySelector('nav')).toBeInTheDocument()

    // 네비게이션 텍스트가 존재하는지
    expect(screen.getByText('도서 검색')).toBeInTheDocument()
    expect(screen.getByText('내가 찜한 책')).toBeInTheDocument()
  })
})
