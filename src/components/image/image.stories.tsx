import type { Meta, StoryObj } from '@storybook/react-vite'
import { Image } from './image'

const meta: Meta<typeof Image> = {
  title: 'Components/Image',
  component: Image,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof Image>

export const Default: Story = {
  args: {
    src: 'https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F1467038%3Ftimestamp%3D20181203205056',
    alt: '책 이미지',
    width: '48px',
    height: '68px',
  },
}

export const WithoutSrc: Story = {
  args: {
    alt: '책 이미지',
    width: '48px',
    height: '68px',
    fallbackText: '이미지 없음',
  },
}

export const LoadingError: Story = {
  args: {
    src: 'https://invalid-url.com/image.jpg',
    alt: '책 이미지',
    width: '48px',
    height: '68px',
  },
}

export const LargeSize: Story = {
  args: {
    src: 'https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F1467038%3Ftimestamp%3D20181203205056',
    alt: '책 이미지',
    width: '120px',
    height: '174px',
  },
}
