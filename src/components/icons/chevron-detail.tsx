import type { IconProps } from './types'

// 상세보기 버튼용 아이콘 (14x8 비율)
export const ChevronDetailDownIcon = ({
  size = 14,
  className = '',
  fill = '#B1B8C0',
}: IconProps) => (
  <svg
    width={size}
    height={size * 0.57} // 8/14 비율
    viewBox="0 0 14 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M2 0L7 5L12 0L14 1L7 8L0 1L2 0Z" fill={fill} />
  </svg>
)

export const ChevronDetailUpIcon = ({ size = 14, className = '', fill = '#B1B8C0' }: IconProps) => (
  <svg
    width={size}
    height={size * 0.57} // 8/14 비율
    viewBox="0 0 14 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M12 8L7 3L2 8L0 7L7 0L14 7L12 8Z" fill={fill} />
  </svg>
)
