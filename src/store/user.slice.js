import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loggedinUser: null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoggedinUser(state, action) {
      state.loggedinUser = action.payload
    }
  }
})

export const { setLoggedinUser } = userSlice.actions

export default userSlice.reducer
