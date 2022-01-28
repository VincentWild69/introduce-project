import { combineReducers, configureStore } from "@reduxjs/toolkit";
import todosSlice from "./slices/todosSlice";


const rootReducer = combineReducers({
  todos: todosSlice,
})

export const store = configureStore({
  reducer: rootReducer
})