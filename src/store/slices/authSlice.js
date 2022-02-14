import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  users: null,
  currentUser: null,
  isAuth: false,
  isAdmin: false,
  error: {
    message: null,
    status: null,
    login: null,
    password: null
  },
  isLoading: false
}


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loadingTrue: (state) => {
      state.isLoading = true;
    },
    loadingFalse: (state) => {
      state.isLoading = false;
    },
    setUsers: (state, action) => {
      state.users = action.payload
    },
    setError: (state, action) => {
      state.error.message = action.payload
    },
    setCustomError: (state, action) => {
      state.error[action.payload.name] = action.payload.error
    },
    addUser: (state, action) => {
      state.users = [...state.users, action.payload]
    },
    loginUser: (state, action) => {
      state.currentUser = action.payload;
      state.isAuth = true;
    },

  }
})



export const {setUsers, setError, setCustomError, addUser, loadingTrue, loadingFalse, loginUser } = authSlice.actions;

export default authSlice.reducer;