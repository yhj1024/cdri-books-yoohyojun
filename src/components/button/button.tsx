import type { ButtonHTMLAttributes, ReactNode } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'outline' | 'ghost' | 'outline-border'
  size?: 'sm' | 'md' | 'lg' | 'full'
  disabled?: boolean
}

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  ...props
}: ButtonProps) => {
  const baseClasses =
    'inline-flex items-center justify-center font-medium disabled:opacity-50 disabled:cursor-not-allowed'

  const variants = {
    primary: 'bg-primary text-white',
    outline: 'bg-gray-50 text-[#6D7582]', // 상세보기용 - #F2F4F6 배경, #6D7582 텍스트
    ghost: 'text-gray-600',
    'outline-border': 'bg-transparent text-[#8D94A0] border border-[#8D94A0]', // 상세검색용
  }

  const sizes = {
    sm: 'px-[10px] py-[5px] text-[14px] font-medium rounded-lg h-[35px] min-w-[72px] leading-[14px]', // 상세검색: 14px, 500
    md: 'w-[115px] h-[48px] text-[16px] font-medium rounded-lg leading-[22px]', // 구매하기/상세보기: 16px, 500
    lg: 'px-6 py-4 text-[16px] font-medium rounded-lg h-[48px]',
    full: 'w-60 px-5 py-3 text-[16px] font-medium rounded-lg h-[48px]',
  }

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]}`.trim()

  return (
    <button className={classes} disabled={disabled} {...props}>
      {children}
    </button>
  )
}
