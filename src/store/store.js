import { combineReducers, configureStore } from "@reduxjs/toolkit";
import todosSlice from "./slices/todosSlice";
import authSlice from './slices/authSlice';


const rootReducer = combineReducers({
  todos: todosSlice,
  auth: authSlice
})

export const store = configureStore({
  reducer: rootReducer
})