import { it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import App from './App.tsx'
import { QueryProvider } from './providers/query-provider'

// IntersectionObserver mock
const mockIntersectionObserver = vi.fn()
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
})
window.IntersectionObserver = mockIntersectionObserver

it('renders without crashing', () => {
  render(
    <QueryProvider>
      <App />
    </QueryProvider>,
  )
  expect(document.body.children.length).toBeGreaterThan(0)
})
