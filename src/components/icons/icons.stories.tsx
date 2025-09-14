import type { Meta, StoryObj } from '@storybook/react-vite'
import { SearchIcon, HeartIcon, HeartFilledIcon, ChevronDownIcon } from './index'

const meta: Meta = {
  title: 'Components/Icons',
  parameters: {
    layout: 'centered',
  },
}

export default meta

export const Search: StoryObj = {
  render: () => <SearchIcon size={24} />,
}

export const Heart: StoryObj = {
  render: () => (
    <div className="flex items-center gap-4">
      <HeartIcon size={24} />
      <HeartFilledIcon size={24} className="text-red-500" />
    </div>
  ),
}

export const ChevronDown: StoryObj = {
  render: () => <ChevronDownIcon size={24} />,
}
