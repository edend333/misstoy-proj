import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loadToys } from "../store/toy.slice.js"
import { ToyList } from "../cmps/ToyList.jsx"
import { Link } from "react-router-dom"
import { usePagination } from "../hooks/usePagination.js"
export function ToyIndex() {
  const dispatch = useDispatch()
  const toys = useSelector(storeState => storeState.toyModule.toys)
  const user = useSelector(storeState => storeState.userModule.loggedinUser)

  useEffect(() => {
    dispatch(loadToys())
  }, [])

  const {
    currentItems: toysToShow,
    currentPage,
    totalPages,
    nextPage,
    prevPage
  } = usePagination(toys, 5)

  return (
    <section className="toy-index">
      <h1>Toys:</h1>

      {user?.isAdmin && (
        <p className="admin-msg">
          <Link to={`/toy/edit/`} className="add-btn">Add</Link>
        </p>
      )}

      <ToyList toys={toysToShow} />

      <div className="pagination-controls">
        <button onClick={prevPage} disabled={currentPage === 1}>Prev</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={nextPage} disabled={currentPage === totalPages}>Next</button>
      </div>
    </section>
  )
}
