import { ChevronDownIcon } from '../icons'
import { useState, useRef, useEffect } from 'react'

export interface SelectOption {
  id: string
  label: string
  value: string
}

interface SelectProps {
  options: SelectOption[]
  value?: SelectOption
  onChange?: (option: SelectOption) => void
  placeholder?: string
}

export const Select = ({ options, value, onChange, placeholder = '선택' }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(0)
  const selectRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (option: SelectOption) => {
    onChange?.(option)
    setIsOpen(false)
  }

  return (
    <div className="relative w-[100px]" ref={selectRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-[36px] px-[8px] flex items-center justify-between border-b border-[#D2D6DA] bg-transparent cursor-pointer"
      >
        <span className="text-[14px] font-bold text-[#353C49]">{value?.label || placeholder}</span>
        <ChevronDownIcon
          size={20}
          className={`text-[#B1B8C0] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <ul className="absolute top-[42px] left-0 w-full bg-white shadow-[0_0_4px_0_rgba(0,0,0,0.25)] z-10">
          {options
            .filter((option) => option.id !== value?.id) // 선택된 항목 제외
            .map((option, index) => (
              <li
                key={option.id}
                onMouseEnter={() => setHighlightedIndex(index)}
                onClick={() => handleSelect(option)}
                className={`
                  px-[8px] py-[4px] cursor-pointer text-[14px] font-medium text-[#8D94A0]
                  ${
                    highlightedIndex === index
                      ? 'bg-[#4880EE] text-white'
                      : 'hover:bg-[#4880EE] hover:text-white'
                  }
                `}
              >
                {option.label}
              </li>
            ))}
        </ul>
      )}
    </div>
  )
}
