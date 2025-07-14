import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

export function ToyPreview({ toy }) {
  const user = useSelector(storeState => storeState.userModule.loggedinUser)

  return (
    <li className="toy-preview">
      <img src={toy.imgUrl} alt={toy.name} />
      <h2>{toy.name}</h2>
      <p>Price: ${toy.price}</p>
      <p>Labels: {toy.labels.join(', ')}</p>
      <p className={toy.inStock ? 'in-stock' : 'out-of-stock'}>
        {toy.inStock ? 'In Stock' : 'Out of Stock'}
      </p>
{user?.isAdmin && (
  <div className="admin-actions">
    <Link to={`/toy/edit/${toy._id}`} className="edit-btn">
      Edit
    </Link>
  </div>
)}

    </li>

  )
}

