import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import {
  SearchIcon,
  HeartIcon,
  HeartFilledIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronDownIcon,
} from './index'

describe('아이콘 컴포넌트', () => {
  it('검색 아이콘이 정상적으로 렌더링된다', () => {
    const { container } = render(<SearchIcon />)
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
    expect(svg).toHaveAttribute('width', '24')
    expect(svg).toHaveAttribute('height', '24')
  })

  it('하트 아이콘이 정상적으로 렌더링된다', () => {
    const { container } = render(<HeartIcon />)
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
    expect(svg).toHaveAttribute('fill', 'none')
  })

  it('채워진 하트 아이콘이 정상적으로 렌더링된다', () => {
    const { container } = render(<HeartFilledIcon />)
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
    expect(svg).toHaveAttribute('fill', 'currentColor')
  })

  it('화살표 아이콘들이 정상적으로 렌더링된다', () => {
    const { container: leftContainer } = render(<ArrowLeftIcon />)
    const { container: rightContainer } = render(<ArrowRightIcon />)
    const { container: downContainer } = render(<ChevronDownIcon />)

    expect(leftContainer.querySelector('svg')).toBeInTheDocument()
    expect(rightContainer.querySelector('svg')).toBeInTheDocument()
    expect(downContainer.querySelector('svg')).toBeInTheDocument()
  })

  it('사이즈 prop이 정상적으로 적용된다', () => {
    const { container } = render(<SearchIcon size={32} />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('width', '32')
    expect(svg).toHaveAttribute('height', '32')
  })

  it('className prop과 함께 렌더링된다', () => {
    const { container } = render(<SearchIcon className="test-class" />)
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })
})
