import { Link, useLocation } from 'react-router-dom'

const navItems = [
  { path: '/search', label: '도서 검색' },
  { path: '/favorite-books', label: '내가 찜한 책' },
]

export const Header = () => {
  const location = useLocation()

  return (
    <header className="h-[80px] bg-white p-8">
      <div className="max-w-[1920px] min-w-[960px] h-full mx-auto flex items-center justify-between">
        {/* 로고 */}
        <h1>
          <Link to="/" className="text-[#000000] text-[24px] font-bold leading-[32px]">
            CERTICOS BOOKS
          </Link>
        </h1>
        {/* 네비게이션 */}
        <nav>
          <ul className="flex gap-[56px]">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path
              return (
                <li key={item.path} className="relative">
                  <Link
                    to={item.path}
                    className="block text-[20px] font-medium leading-[20px] text-[#353C49] transition-colors hover:text-[#4880EE]"
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.label}
                    {isActive && (
                      <span
                        className="absolute left-0 right-0 top-[29px] h-[1px] bg-[#4880EE]"
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
        <div className="w-[200px]" />
      </div>
    </header>
  )
}
