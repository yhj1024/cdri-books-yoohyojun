import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from './button'
import { ChevronDetailDownIcon, ChevronDetailUpIcon } from '../icons'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof meta>

// 구매하기 버튼 (Primary)
export const Purchase: Story = {
  args: {
    children: '구매하기',
    variant: 'primary',
    size: 'md',
  },
}

// 상세보기 버튼 (닫힌 상태 - 아래 화살표)
export const DetailClosed: Story = {
  args: {
    children: (
      <>
        상세보기
        <ChevronDetailDownIcon size={14} className="ml-1" fill="#B1B8C0" />
      </>
    ),
    variant: 'outline',
    size: 'md',
  },
}

// 상세보기 버튼 (열린 상태 - 위 화살표)
export const DetailOpen: Story = {
  args: {
    children: (
      <>
        상세보기
        <ChevronDetailUpIcon size={14} className="ml-1" fill="#B1B8C0" />
      </>
    ),
    variant: 'outline',
    size: 'md',
  },
}

// 상세검색 버튼 (테두리만 있음, 아이콘 없음)
export const DetailSearch: Story = {
  args: {
    children: '상세검색',
    variant: 'outline-border',
    size: 'sm',
  },
}

// 큰 구매 버튼 (전체 너비)
export const PurchaseLarge: Story = {
  args: {
    children: '구매하기',
    variant: 'primary',
    size: 'full',
  },
}
