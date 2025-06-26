interface PaginatedApiResponse<T> {
  count: number
  pageSize: number
  next: number
  currentPage: number
  totalPages: number
  results: T[]
}

export default PaginatedApiResponse
