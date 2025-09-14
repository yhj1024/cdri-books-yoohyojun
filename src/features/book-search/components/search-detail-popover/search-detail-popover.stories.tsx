import type { Meta, StoryObj } from '@storybook/react-vite'
import { SearchDetailPopover } from '@/features/book-search'

const meta: Meta<typeof SearchDetailPopover> = {
  title: 'Components/SearchDetailPopover',
  component: SearchDetailPopover,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof SearchDetailPopover>

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => console.log('close'),
    onSearch: (category, keyword) => console.log('search', category, keyword),
  },
}
