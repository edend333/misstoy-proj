import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { toyService } from '../services/toy.service'
import { loadToys } from '../store/toy.slice'

export function ToyDetails() {
  const { toyId } = useParams()
  const dispatch = useDispatch()
  const [toy, setToy] = useState(null)

  useEffect(() => {
    loadToy()
  }, [toyId])

  async function loadToy() {
    const toy = await toyService.getById(toyId)
    setToy(toy)
  }

  if (!toy) return <div>Loading...</div>

  return (
    <section>
      <h1>{toy.name}</h1>
      <p>Price: ${toy.price}</p>
      <p>Labels: {toy.labels.join(', ')}</p>

      <h2>Messages:</h2>
      <ul>
        {toy.msgs?.length ? toy.msgs.map(msg => (
          <li key={msg.id}>{msg.txt} by {msg.by.fullname}</li>
        )) : (
          <li>No messages yet.</li>
        )}
      </ul>

      

    </section>
  )
}
