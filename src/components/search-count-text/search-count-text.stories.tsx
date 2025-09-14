import type { Meta, StoryObj } from '@storybook/react-vite'
import { SearchCountText } from './search-count-text'

const meta: Meta<typeof SearchCountText> = {
  title: 'Components/SearchCountText',
  component: SearchCountText,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof SearchCountText>

export const Default: Story = {
  args: {
    text: '도서 검색 결과',
    count: 21,
  },
}
