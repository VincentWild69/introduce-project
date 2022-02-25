import { createSlice } from "@reduxjs/toolkit";
import { storage } from './../../util/storage';


const initialState = {
  todosItems: []
}


export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    fillTodoList: (state, action) => {
      if (action.payload && action.payload.length !== 0) {
        state.todosItems = [...state.todosItems, ...action.payload]
      }
    },
    addTodo: (state, action) => {
      state.todosItems.push(action.payload);
      storage.setItem('todos', state.todosItems);
    },
    removeTodo: (state, action) => {
      state.todosItems = state.todosItems.filter(todo => todo.id !== action.payload);
      storage.setItem('todos', state.todosItems);
    }
  }
})



export const {fillTodoList, addTodo, removeTodo} = todosSlice.actions;

export default todosSlice.reducer;