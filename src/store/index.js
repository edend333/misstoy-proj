import { configureStore } from '@reduxjs/toolkit'
import toyReducer from './toy.slice.js'

export const store = configureStore({
  reducer: {
    toyModule: toyReducer
  },
})
