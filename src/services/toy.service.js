import { storageService } from './storage.service.js'

const TOY_KEY = 'toyDB'

const gDemoToys = [
  {
    _id: 't101',
    name: 'Teddy Bear',
    price: 45,
    labels: ['Plush', 'Bear'],
    inStock: true,
    createdAt: Date.now(),
    imgUrl: 'https://images.pexels.com/photos/459296/pexels-photo-459296.jpeg',
    msgs: [
      {
        id: 'm101',
        txt: 'So soft and cuddly!',
        by: { _id: 'u101', fullname: 'Puki Ga' }
      }
    ]
  },
  {
    _id: 't102',
    name: 'Wooden Blocks',
    price: 30,
    labels: ['Wood', 'Blocks'],
    inStock: true,
    createdAt: Date.now(),
    imgUrl: 'https://images.pexels.com/photos/515704/pexels-photo-515704.jpeg',
    msgs: []
  },
  {
    _id: 't103',
    name: 'Rubber Duck',
    price: 15,
    labels: ['Bath', 'Rubber'],
    inStock: false,
    createdAt: Date.now(),
    imgUrl: 'https://images.pexels.com/photos/226518/pexels-photo-226518.jpeg',
    msgs: [
      {
        id: 'm102',
        txt: 'Is it squeaky?',
        by: { _id: 'u102', fullname: 'Muki Mo' }
      },
      {
        id: 'm103',
        txt: 'Great for bath time!',
        by: { _id: 'u103', fullname: 'Gaga Goo' }
      }
    ]
  },
  {
    _id: 't104',
    name: 'Puzzle',
    price: 25,
    labels: ['Puzzle', 'Board game'],
    inStock: true,
    createdAt: Date.now(),
    imgUrl: 'https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg',
    msgs: []
  },
  {
    _id: 't105',
    name: 'Train Set',
    price: 70,
    labels: ['Wood', 'Train'],
    inStock: true,
    createdAt: Date.now(),
    imgUrl: 'https://images.pexels.com/photos/1208666/pexels-photo-1208666.jpeg',
    msgs: []
  },
  {
    _id: 't106',
    name: 'Doll House',
    price: 120,
    labels: ['Doll', 'House'],
    inStock: false,
    createdAt: Date.now(),
    imgUrl: 'https://images.pexels.com/photos/3661352/pexels-photo-3661352.jpeg',
    msgs: [
      {
        id: 'm104',
        txt: 'So many rooms to play!',
        by: { _id: 'u104', fullname: 'Lala Lo' }
      }
    ]
  },
  {
    _id: 't107',
    name: 'RC Car',
    price: 80,
    labels: ['Car', 'Remote'],
    inStock: true,
    createdAt: Date.now(),
    imgUrl: 'https://images.pexels.com/photos/595804/pexels-photo-595804.jpeg',
    msgs: []
  },
  {
    _id: 't108',
    name: 'Robot',
    price: 95,
    labels: ['Electronic', 'Robot'],
    inStock: true,
    createdAt: Date.now(),
    imgUrl: 'https://images.pexels.com/photos/3933038/pexels-photo-3933038.jpeg',
    msgs: [
      {
        id: 'm105',
        txt: 'Can it dance?',
        by: { _id: 'u105', fullname: 'Bubu Ba' }
      }
    ]
  },
  {
    _id: 't109',
    name: 'Beach Ball',
    price: 10,
    labels: ['Outdoor', 'Ball'],
    inStock: true,
    createdAt: Date.now(),
    imgUrl: 'https://images.pexels.com/photos/2187608/pexels-photo-2187608.jpeg',
    msgs: []
  },
  {
    _id: 't110',
    name: 'Jump Rope',
    price: 12,
    labels: ['Outdoor', 'Sport'],
    inStock: false,
    createdAt: Date.now(),
    imgUrl: 'https://images.pexels.com/photos/461008/pexels-photo-461008.jpeg',
    msgs: []
  },
  {
    _id: 't111',
    name: 'Yo-Yo',
    price: 5,
    labels: ['Classic'],
    inStock: true,
    createdAt: Date.now(),
    imgUrl: 'https://images.pexels.com/photos/2231050/pexels-photo-2231050.jpeg',
    msgs: []
  },
  {
    _id: 't112',
    name: 'Lego Set',
    price: 65,
    labels: ['Blocks', 'Building'],
    inStock: true,
    createdAt: Date.now(),
    imgUrl: 'https://images.pexels.com/photos/163743/kids-toys-toy-lego-163743.jpeg',
    msgs: []
  },
  {
    _id: 't113',
    name: 'Stuffed Bunny',
    price: 35,
    labels: ['Plush', 'Bunny'],
    inStock: true,
    createdAt: Date.now(),
    imgUrl: 'https://images.pexels.com/photos/459296/pexels-photo-459296.jpeg',
    msgs: []
  },
  {
    _id: 't114',
    name: 'Basketball',
    price: 20,
    labels: ['Sport', 'Ball'],
    inStock: false,
    createdAt: Date.now(),
    imgUrl: 'https://images.pexels.com/photos/680964/pexels-photo-680964.jpeg',
    msgs: []
  },
  {
    _id: 't115',
    name: 'Board Game',
    price: 40,
    labels: ['Board game'],
    inStock: true,
    createdAt: Date.now(),
    imgUrl: 'https://images.pexels.com/photos/166094/pexels-photo-166094.jpeg',
    msgs: [
      {
        id: 'm106',
        txt: 'Great for family night!',
        by: { _id: 'u106', fullname: 'Tiki Ta' }
      }
    ]
  },
  {
    _id: 't116',
    name: 'Marbles',
    price: 8,
    labels: ['Classic'],
    inStock: true,
    createdAt: Date.now(),
    imgUrl: 'https://images.pexels.com/photos/844923/pexels-photo-844923.jpeg',
    msgs: []
  },
  {
    _id: 't117',
    name: 'Skateboard',
    price: 50,
    labels: ['Outdoor', 'Sport'],
    inStock: true,
    createdAt: Date.now(),
    imgUrl: 'https://images.pexels.com/photos/442528/pexels-photo-442528.jpeg',
    msgs: []
  },
  {
    _id: 't118',
    name: 'T-Rex Dinosaur',
    price: 27,
    labels: ['Figurine', 'Dinosaur'],
    inStock: true,
    createdAt: Date.now(),
    imgUrl: 'https://images.pexels.com/photos/754105/pexels-photo-754105.jpeg',
    msgs: []
  },
  {
    _id: 't119',
    name: 'Magic Kit',
    price: 55,
    labels: ['Magic', 'Set'],
    inStock: false,
    createdAt: Date.now(),
    imgUrl: 'https://images.pexels.com/photos/290524/pexels-photo-290524.jpeg',
    msgs: []
  },
  {
    _id: 't120',
    name: 'Bicycle',
    price: 150,
    labels: ['Outdoor', 'Bike'],
    inStock: true,
    createdAt: Date.now(),
    imgUrl: 'https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg',
    msgs: []
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


function _createDemoToys() {
  console.log('Running _createDemoToys...')
  let toys = JSON.parse(localStorage.getItem(TOY_KEY))
  if (!toys || !toys.length) {
    console.log('No toys found — creating demo toys!')
    localStorage.setItem(TOY_KEY, JSON.stringify(gDemoToys))
  } else {
    console.log('Toys already exist, skipping...')
  }
}
_createDemoToys()