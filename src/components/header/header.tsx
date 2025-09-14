interface HeaderProps {
  activeTab?: 'search' | 'favorites'
  onTabChange?: (tab: 'search' | 'favorites') => void
}

const navItems = [
  { id: 'search' as const, label: '도서 검색', href: '#search' },
  { id: 'favorites' as const, label: '내가 찜한 책', href: '#favorites' },
]

export const Header = ({ activeTab = 'search', onTabChange }: HeaderProps) => {
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    tabId: 'search' | 'favorites',
  ) => {
    e.preventDefault()
    onTabChange?.(tabId)
  }

  return (
    <header className="relative w-[1920px] h-[80px] bg-white mx-auto">
      {/* 로고 */}
      <h1 className="absolute left-[160px] top-[24px]">
        <a href="/" className="text-[#000000] text-[24px] font-bold leading-[32px]">
          CERTICOS BOOKS
        </a>
      </h1>

      {/* 네비게이션 */}
      <nav className="absolute left-[767px] top-[27px]">
        <ul className="flex gap-[56px]">
          {navItems.map((item) => (
            <li key={item.id} className="relative">
              <a
                href={item.href}
                onClick={(e) => handleNavClick(e, item.id)}
                className="block text-[20px] font-medium leading-[20px] text-[#353C49] transition-colors hover:text-[#4880EE]"
                aria-current={activeTab === item.id ? 'page' : undefined}
              >
                {item.label}
                {activeTab === item.id && (
                  <span
                    className="absolute left-0 right-0 top-[29px] h-[1px] bg-[#4880EE]"
                    aria-hidden="true"
                  />
                )}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
