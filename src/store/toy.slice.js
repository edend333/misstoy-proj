import { createSlice } from "@reduxjs/toolkit"
import { toyService } from "../services/toy.service.js"

const initialState = {
  toys: []
}

const toySlice = createSlice({
  name: "toy",
  initialState,
  reducers: {
    setToys(state, action) {
      state.toys = action.payload
    }
  }
})

export const { setToys } = toySlice.actions
export default toySlice.reducer

export function loadToys() {
  return async dispatch => {
    const toys = await toyService.query()
    dispatch(setToys(toys))
  }
}
