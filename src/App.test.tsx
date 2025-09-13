import { it, expect } from 'vitest'
import { render } from '@testing-library/react'
import App from './App.tsx'

it('renders without crashing', () => {
  render(<App />)
  expect(document.body.children.length).toBeGreaterThan(0)
})
