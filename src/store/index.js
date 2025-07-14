import { configureStore } from '@reduxjs/toolkit'
import toyReducer from './toy.slice.js'
import userReducer from './user.slice.js'

export const store = configureStore({
  reducer: {
    toyModule: toyReducer,
    userModule: userReducer
  },
})
