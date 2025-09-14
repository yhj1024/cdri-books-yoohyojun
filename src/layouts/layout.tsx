import { Header } from '@/components/header'
import { Outlet } from 'react-router-dom'

export const Layout = () => {
  return (
    <>
      <Header />
      <main className="w-[960px] max-w-[960px] h-[calc(100vh-80px)] mx-auto mt-14">
        <Outlet />
      </main>
    </>
  )
}
