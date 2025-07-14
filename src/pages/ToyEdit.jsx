import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toyService } from '../services/toy.service.js'

export function ToyEdit() {
    const [toy, setToy] = useState({
        name: '',
        price: '',
        labels: '',
        inStock: true,
        imgUrl: ''
    })

    const { toyId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (toyId) {
            toyService.getById(toyId).then(toyToEdit => {
                setToy({
                    ...toyToEdit,
                    labels: toyToEdit.labels.join(', ')
                })
            })
        }
    }, [toyId])

    function handleChange(ev) {
        const { name, value, type, checked } = ev.target
        const val = type === 'checkbox' ? checked : value
        setToy(prevToy => ({ ...prevToy, [name]: val }))
    }

    async function onSaveToy(ev) {
        ev.preventDefault()
        const toyToSave = {
            ...toy,
            price: +toy.price,
            labels: toy.labels.split(',').map(l => l.trim())
        }
        if (toyId) {
            await toyService.save(toyToSave)
        } else {
            await toyService.save(toyToSave)
        }
        navigate('/toy')
    }

    return (
        <section className="toy-edit">
            <h1>{toyId ? 'Edit Toy' : 'Add New Toy'}</h1>
            <form className="toy-form" onSubmit={onSaveToy}>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={toy.name}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    Price:
                    <input
                        type="number"
                        name="price"
                        value={toy.price}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    Labels:
                    <input
                        type="text"
                        name="labels"
                        value={toy.labels}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    Image URL:
                    <input
                        type="text"
                        name="imgUrl"
                        value={toy.imgUrl}
                        onChange={handleChange}
                    />
                </label>

                <label className="checkbox-label">
                    <input
                        type="checkbox"
                        name="inStock"
                        checked={toy.inStock}
                        onChange={handleChange}
                    />
                    <span>In Stock</span>
                </label>

                <button type="submit">Save</button>
            </form>

            {toy.imgUrl && (
                <div className="preview">
                    <h3>Preview:</h3>
                    <img src={toy.imgUrl} alt={toy.name} style={{ maxWidth: '100%', borderRadius: '8px' }} />
                </div>
            )}
        </section>
    )
}
