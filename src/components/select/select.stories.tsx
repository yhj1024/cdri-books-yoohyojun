import type { Meta, StoryObj } from '@storybook/react-vite'
import { Select } from './select'

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof Select>

export const Default: Story = {
  args: {
    options: [
      { id: 'title', label: '제목', value: 'title' },
      { id: 'author', label: '저자', value: 'author' },
      { id: 'publisher', label: '출판사', value: 'publisher' },
      { id: 'isbn', label: 'ISBN', value: 'isbn' },
    ],
  },
}
