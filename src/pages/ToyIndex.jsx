import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loadToys } from "../store/toy.slice.js"

export function ToyIndex() {
  const dispatch = useDispatch()
  const toys = useSelector(storeState => storeState.toyModule.toys)

  useEffect(() => {
    dispatch(loadToys())
  }, [])

  return (
    <section>
      <h1>Toys:</h1>
      <pre>{JSON.stringify(toys, null, 2)}</pre>
    </section>
  )
}
