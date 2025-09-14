import type { Meta, StoryObj } from '@storybook/react-vite'
import { SearchBox } from './search-box'

const meta: Meta<typeof SearchBox> = {
  title: 'Components/SearchBox',
  component: SearchBox,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof SearchBox>

export const Default: Story = {
  args: {
    title: '도서 검색',
  },
}
