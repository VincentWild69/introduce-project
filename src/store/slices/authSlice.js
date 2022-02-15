import { createSlice } from "@reduxjs/toolkit";
import { storage } from './../../util/storage';


const initialState = {
  users: null,
  currentUser: null,
  isAuth: false,
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
      if (state.users) state.users = null;
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
      storage.setItem('curUser', action.payload.id)
    },
    logout: (state) => {
      state.currentUser = null;
      state.isAuth = false;
      localStorage.removeItem('curUser');
    }

  }
})



export const {setUsers, setError, setCustomError, addUser, loadingTrue, loadingFalse, loginUser, logout } = authSlice.actions;

export default authSlice.reducer;