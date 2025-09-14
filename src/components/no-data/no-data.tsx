interface NoDataProps {
  message: string
}

export const NoData = ({ message }: NoDataProps) => {
  return (
    <div className="w-[960px] h-[400px] bg-white border-b border-[#D2D6DA] flex items-center justify-center">
      <div className="flex flex-col items-center gap-[25px]">
        <img src="/book.webp" alt="book-icon" className="w-[80px] h-[80px]" />
        <p className="text-[14px] font-medium leading-[22px] text-[#8D94A0]">{message}</p>
      </div>
    </div>
  )
}
