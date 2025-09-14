import type { Meta, StoryObj } from '@storybook/react-vite'
import { NoData } from './no-data'

const meta: Meta<typeof NoData> = {
  title: 'Components/NoData',
  component: NoData,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="w-[990px] bg-gray-50 p-4">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof NoData>

export const Default: Story = {
  args: {
    message: '검색 결과가 없습니다.',
  },
}

export const NoLikedBooks: Story = {
  args: {
    message: '찜한 책이 없습니다.',
  },
}

export const NoSearchResult: Story = {
  args: {
    message: '검색어에 해당하는 도서가 없습니다.',
  },
}
