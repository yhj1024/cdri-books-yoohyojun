import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Button } from './button'

describe('버튼 컴포넌트', () => {
  it('렌더링된다', () => {
    render(<Button>테스트</Button>)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('클릭된다', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>클릭</Button>)

    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalled()
  })

  it('비활성화된다', () => {
    render(<Button disabled>비활성화</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
