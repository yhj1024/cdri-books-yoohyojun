export interface Book {
  id: string
  title: string
  author: string
  publisher: string
  isbn: string
  thumbnail?: string
  price: number
  salePrice?: number
  url: string
  contents?: string
  publishedDate: string
  status: string
}
