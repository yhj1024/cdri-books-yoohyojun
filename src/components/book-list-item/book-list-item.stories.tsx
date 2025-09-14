import type { Meta, StoryObj } from '@storybook/react-vite'
import { BookListItem } from './book-list-item'

const meta: Meta<typeof BookListItem> = {
  title: 'Components/BookListItem',
  component: BookListItem,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof BookListItem>

const mockBook = {
  id: '1',
  title: '리액트를 다루는 기술',
  author: '김민준',
  publisher: '길벗',
  isbn: '9791160508796',
  thumbnail:
    'https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F1467038%3Ftimestamp%3D20181203205056',
  price: 36000,
  salePrice: 32400,
  url: 'https://book.naver.com/bookdb/book_detail.nhn?bid=13161039',
  publishedDate: '2019-05-31',
}

export const Default: Story = {
  args: {
    book: mockBook,
    isLiked: false,
  },
}

export const Liked: Story = {
  args: {
    book: mockBook,
    isLiked: true,
  },
}

export const WithoutThumbnail: Story = {
  args: {
    book: {
      ...mockBook,
      thumbnail: undefined,
    },
    isLiked: false,
  },
}

export const WithoutPrice: Story = {
  args: {
    book: {
      ...mockBook,
      price: undefined,
      salePrice: undefined,
    },
    isLiked: false,
  },
}

export const LongTitle: Story = {
  args: {
    book: {
      ...mockBook,
      title:
        '매우 길고 복잡한 제목을 가진 책의 이름이 여기에 표시될 것입니다. 이렇게 긴 제목은 어떻게 처리될까요?',
    },
    isLiked: false,
  },
}
