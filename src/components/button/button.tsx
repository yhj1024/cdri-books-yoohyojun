import type { ButtonHTMLAttributes, ReactNode } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'outline-border'
  size?: 'sm' | 'popover'
  disabled?: boolean
}

export const Button = ({
  children,
  variant = 'primary',
  size = 'sm',
  disabled = false,
  ...props
}: ButtonProps) => {
  const baseClasses =
    'inline-flex items-center justify-center font-medium disabled:opacity-50 disabled:cursor-not-allowed'

  const variants = {
    primary: 'bg-primary text-white',
    'outline-border': 'bg-transparent text-[#8D94A0] border border-[#8D94A0]', // 상세검색용
  }

  const sizes = {
    sm: 'px-[10px] py-[5px] text-[14px] font-medium rounded-lg h-[35px] min-w-[72px] leading-[14px]', // 상세검색
    popover: 'w-full h-[36px] text-[14px] font-medium rounded-lg', // 팝오버용
  }

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]}`.trim()

  return (
    <button className={classes} disabled={disabled} {...props}>
      {children}
    </button>
  )
}
