import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  users: null,
  currentUser: null,
  isAuth: false,
  isAdmin: false,
  error: {
    message: null,
    status: null,
  }
}


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload
    },
    setError: (state, action) => {
      state.error.message = action.payload
    }
  }
})



export const {setUsers, setError, setWarning} = authSlice.actions;

export default authSlice.reducer;