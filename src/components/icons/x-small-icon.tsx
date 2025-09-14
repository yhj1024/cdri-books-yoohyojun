interface XSmallIconProps {
  size?: number
  className?: string
}

export const XSmallIcon = ({ size = 12, className = '' }: XSmallIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M10.6582 0.166687L5.99984 4.82502L1.3415 0.166687L0.166504 1.34169L4.82484 6.00002L0.166504 10.6584L1.3415 11.8334L5.99984 7.17502L10.6582 11.8334L11.8332 10.6584L7.17484 6.00002L11.8332 1.34169L10.6582 0.166687Z"
        fill="#B1B8C0"
      />
    </svg>
  )
}
