import { useState } from 'react'

export function usePagination(items = [], itemsPerPage = 5) {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(items.length / itemsPerPage)

  const currentItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  function goToPage(pageNumber) {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber)
    }
  }

  function nextPage() {
    goToPage(currentPage + 1)
  }

  function prevPage() {
    goToPage(currentPage - 1)
  }

  return {
    currentPage,
    totalPages,
    currentItems,
    goToPage,
    nextPage,
    prevPage
  }
}
