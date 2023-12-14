import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const login = createAsyncThunk('session/login', async (userData) => {
  const response = await fetch('/api/login',{
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userData)
  })

  return await response.json();
}) 

export const logout = createAsyncThunk("session/logout", async () => {
  const response = await fetch("/api/logout", {
    method: "DELETE",
  });

  return await response.json();
});

const sessionSlice = createSlice({
    name: 'session',
    initialState: {
      loggedIn: false,
      currentUser: null,
      loading: true
    },
    
    reducers: {
    },
    extraReducers(builder) {
      builder.addCase(login.pending, (state, action) => {
        state.loading = true
      });
      builder.addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.currentUser = action.payload
        state.loggedIn = true
      });
      builder.addCase(login.rejected, (state, action) => {
        state.error = action.error
      });
      builder.addCase(logout.pending, (state, action) => {
        state.loading = null
      });
      builder.addCase(logout.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = null;
        state.loggedIn = false;
      });
      builder.addCase(logout.rejected, (state, action) => {
        state.error = action.error
      });
    }
  })

  export const { } = sessionSlice.actions

  export default sessionSlice.reducer

