import { render, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { act } from 'react'
import { Image } from './image'

// IntersectionObserver mock
const mockIntersectionObserver = vi.fn()
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
})
window.IntersectionObserver = mockIntersectionObserver

describe('Image 컴포넌트', () => {
  it('필수 요소들이 렌더링된다', () => {
    const { container } = render(
      <Image src="test.jpg" alt="테스트 이미지" width="100px" height="100px" />,
    )

    expect(container.firstChild).toBeInTheDocument()
  })

  it('src가 없으면 fallback이 표시된다', async () => {
    const mockObserve = vi.fn()
    const mockDisconnect = vi.fn()

    mockIntersectionObserver.mockImplementation(() => ({
      observe: mockObserve,
      unobserve: vi.fn(),
      disconnect: mockDisconnect,
    }))

    const { getByText } = render(
      <Image alt="테스트 이미지" width="100px" height="100px" fallbackText="커스텀 fallback" />,
    )

    // Trigger intersection observer callback to set isInView to true
    act(() => {
      const [observerCallback] =
        mockIntersectionObserver.mock.calls[mockIntersectionObserver.mock.calls.length - 1]
      observerCallback([{ isIntersecting: true }])
    })

    await waitFor(() => {
      expect(getByText('커스텀 fallback')).toBeInTheDocument()
    })
  })

  it('IntersectionObserver가 설정된다', () => {
    render(<Image src="test.jpg" alt="테스트 이미지" width="100px" height="100px" />)

    expect(mockIntersectionObserver).toHaveBeenCalled()
  })

  it('컴포넌트가 정상적으로 렌더링된다', () => {
    const { container } = render(
      <Image
        src="test.jpg"
        alt="테스트 이미지"
        width="100px"
        height="100px"
        className="custom-class"
      />,
    )

    expect(container.firstChild).toBeInTheDocument()
  })
})
