import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './layouts/layout'
import { BookSearchPage } from './pages/book-search-page'
import { FavoriteBooksPage } from './pages/favorite-books-page'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/search" replace />} />
        <Route path="/" element={<Layout />}>
          <Route path="/search" element={<BookSearchPage />} />
          <Route path="/favorite-books" element={<FavoriteBooksPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
