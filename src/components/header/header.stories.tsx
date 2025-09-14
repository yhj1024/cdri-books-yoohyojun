import type { Meta, StoryObj } from '@storybook/react-vite'
import { Header } from './header'

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof Header>

export const SearchTabActive: Story = {
  args: {
    activeTab: 'search',
  },
}

export const FavoritesTabActive: Story = {
  args: {
    activeTab: 'favorites',
  },
}
