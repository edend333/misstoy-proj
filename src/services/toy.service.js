import { storageService } from './storage.service.js'

const TOY_KEY = 'toyDB'

const gDemoToys = [
    {
        _id: 't101',
        name: 'Talking Doll',
        price: 123,
        labels: ['Doll', 'Battery Powered', 'Baby'],
        createdAt: Date.now(),
        inStock: true,
    },
    {
        _id: 't102',
        name: 'Puzzle Box',
        price: 67,
        labels: ['Puzzle', 'Box game'],
        createdAt: Date.now(),
        inStock: false,
    }
]

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy
}

async function query(filterBy = {}) {
    let toys = await storageService.query(TOY_KEY)

    if (!toys.length) {
        toys = gDemoToys
        toys.forEach(toy => storageService.post(TOY_KEY, toy))
    }

    return toys
}

function getById(toyId) {
    return storageService.get(TOY_KEY, toyId)
}

function remove(toyId) {
    return storageService.remove(TOY_KEY, toyId)
}

function save(toy) {
    if (toy._id) {
        return storageService.put(TOY_KEY, toy)
    } else {
        return storageService.post(TOY_KEY, toy)
    }
}

function getEmptyToy() {
    return {
        name: '',
        price: 0,
        labels: [],
        createdAt: Date.now(),
        inStock: true,
    }
}
