export interface FilmsResponseI {
  data: FilmI[]
  meta: Meta
}
export interface FilmResponseI {
  data: FilmI
  meta: Meta
}

export interface Meta {
  pagination: Pagination
}

export interface Pagination {
  page: number
  pageSize: number
  pageCount: number
  total: number
}

export interface FilmI {
  id: number
  attributes: Attributes
}

export interface Attributes {
  title: string
  release: Date
  director: string
  plot: string
  slug: null
  createdAt: Date
  updatedAt: Date
  publishedAt: Date
}
