import { createSlice } from "@reduxjs/toolkit";
import { storage } from './../../util/storage';


const initialState = {
  users: null,
  currentUser: null,
  isAuth: false,
  error: {
    message: null,
    status: null
  },
  isLoading: false,
  alert: null
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
    setAlert: (state, action) => {
      state.alert = action.payload
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
    },
    removeUserFromList: (state, action) => {
      state.users = state.users.filter(user => user.id !== action.payload);
    },
    updUserStore: (state, action) => {
      state.currentUser = Object.assign(state.currentUser, action.payload.payload);
      const {name = state.currentUser.name, email = state.currentUser.email, password, avatar = state.currentUser.avatar || ''} = action.payload.payload;
      state.users.forEach(user => {
        if (user.id === action.payload.id) {
          user = Object.assign(user, {name, email, password, avatar}); 
        }
      })
    }

  }
})



export const {setUsers, setError, setAlert, setCustomError, addUser, loadingTrue, loadingFalse, loginUser, logout, removeUserFromList, updUserStore} = authSlice.actions;

export default authSlice.reducer;