import type { Meta, StoryObj } from '@storybook/react-vite'
import { BookListItemDetail } from '@/features/book-list'

const meta: Meta<typeof BookListItemDetail> = {
  title: 'Components/BookListItemDetail',
  component: BookListItemDetail,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="w-[1024px] h-[500px] bg-gray-50 p-8">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof BookListItemDetail>

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
  contents:
    '리액트를 다루는 기술은 리액트를 처음 접하는 개발자들을 위한 입문서입니다. 실무에서 리액트를 다루는 데 필요한 기본기를 다지고, 실전 예제를 통해 리액트 개발을 경험할 수 있습니다. 컴포넌트 작성, 상태 관리, 라우팅, 성능 최적화까지 리액트 개발에 필요한 모든 내용을 담았습니다.',
  status: '정상판매',
}

const mockBookLong = {
  ...mockBook,
  title:
    '매우 길고 복잡한 제목을 가진 책의 이름이 여기에 표시될 것입니다. 이렇게 긴 제목은 어떻게 처리될까요?',
  contents:
    '이 책은 정말 긴 내용을 가지고 있습니다. ' +
    '줄거리가 매우 길어서 여러 줄에 걸쳐 표시됩니다. ' +
    '독자들에게 책의 내용을 충분히 전달하기 위해 상세한 설명을 포함하고 있습니다. ' +
    '이 부분은 line-clamp로 인해 4줄까지만 표시되고 나머지는 생략됩니다. ' +
    '하지만 충분한 정보를 제공하여 독자가 책의 내용을 파악할 수 있도록 합니다. ' +
    '더 많은 내용이 있지만 여기서는 표시되지 않습니다.',
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

export const WithSalePrice: Story = {
  args: {
    book: mockBook,
    isLiked: false,
  },
}

export const WithoutSalePrice: Story = {
  args: {
    book: {
      ...mockBook,
      salePrice: undefined,
    },
    isLiked: false,
  },
}

export const LongContent: Story = {
  args: {
    book: mockBookLong,
    isLiked: false,
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

export const WithoutContents: Story = {
  args: {
    book: {
      ...mockBook,
      contents: undefined,
    },
    isLiked: false,
  },
}
