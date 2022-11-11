export interface ReviewsResponseI {
  data: ReviewI[]
  meta: Meta
}

export interface ReviewI {
  id: number
  attributes: Attributes
}

export interface Attributes {
  review: string
  reviewer: string
  createdAt: Date
  updatedAt: Date
  publishedAt: Date
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
