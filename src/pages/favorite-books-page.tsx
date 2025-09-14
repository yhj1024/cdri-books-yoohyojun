import { useFavoriteStore } from '../stores/favorite-store'
import { BookList } from '@/features/book-list'
import { SearchCountText } from '@/components/search-count-text'

export const FavoriteBooksPage = () => {
  const { favoriteBooks, toggleFavorite, likedBookIds } = useFavoriteStore()

  const handleToggleLike = (bookId: string) => {
    const book = favoriteBooks.find((b) => b.id === bookId)
    if (book) {
      toggleFavorite(book)
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">내가 찜한 책</h1>

      <div className="mb-4">
        <SearchCountText text={'찜한 책'} count={favoriteBooks.length} />
      </div>

      <BookList
        books={favoriteBooks}
        likedBookIds={likedBookIds}
        onToggleLike={handleToggleLike}
        isLoading={false}
        emptyMessage="찜한 책이 없습니다."
      />
    </div>
  )
}
