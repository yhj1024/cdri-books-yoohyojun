interface SearchCountTextProps {
  text: string
  count: number
}

export const SearchCountText = ({ text, count }: SearchCountTextProps) => {
  return (
    <div className="flex flex-row items-start gap-[16px] h-[24px]">
      <span className="text-[16px] font-medium leading-[24px] tracking-normal text-[#353C49]">
        {text}
      </span>
      <span className="text-[16px] font-medium leading-[24px] tracking-normal text-[#353C49]">
        총 <span className="text-[#4880EE] mr-0.5">{count}</span>건
      </span>
    </div>
  )
}
