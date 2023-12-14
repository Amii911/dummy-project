import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchUsers = createAsyncThunk('users/users', async () => {
  const response = await fetch('/api/users')
  return response.json()
})

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    user: null,
  },
  reducers: {setUser: (state, action) => {
    state.user = action.payload;
}},

})

export const {setUser} = usersSlice.actions;

export default usersSlice.reducer
