import { storageService } from './storage.service.js'
const USERS_KEY = 'users'
export const authService = {
    login,
    logout,
    getLoggedinUser,
    _createDemoUsers
}

function login(credentials) {
    return storageService.getByCredentials('users', credentials).then(user => {
        if (!user) throw new Error('Invalid credentials')
        localStorage.setItem('loggedinUser', JSON.stringify(user))
        return user
    })
}

function logout() {
    localStorage.removeItem('loggedinUser')
}

function getLoggedinUser() {
    return JSON.parse(localStorage.getItem('loggedinUser'))
}

function _createDemoUsers() {
  console.log('Running _createDemoUsers...')
  let users = JSON.parse(localStorage.getItem(USERS_KEY))
  if (!users || !users.length) {
    console.log('No users found — creating demo users!')
    const demoUsers = [
      { _id: 'u101', username: 'admin', password: '1234', fullname: 'Admin Admin', isAdmin: true },
      { _id: 'u102', username: 'puki', password: '1234', fullname: 'Puki Ga', isAdmin: false }
    ]
    localStorage.setItem(USERS_KEY, JSON.stringify(demoUsers))
  } else {
    console.log('Users already exist, skipping...')
  }
}


    _createDemoUsers()