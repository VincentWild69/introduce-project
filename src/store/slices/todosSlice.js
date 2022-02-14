import { createSlice } from "@reduxjs/toolkit";
import { storage } from './../../util/storage';


const initialState = {
  // todosItems: [{id: '12dewqwec', text: 'The recommended way to start new apps with React and Redux is by using the official Redux+JS template or Redux+TS template for Create React App, which takes advantage of Redux Toolkit and React Reduxs integration with React components.', date: '28.01.2022  11:33', importance: 'under average', importanceLevel: '2', difficult: 'medium', difficultLevel: '3'}, {id: '125dewbbqwec', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi cum ratione necessitatibus, harum incidunt velit enim ab magnam architecto aspernatur minus debitis perferendis delectus fugiat. Ullam deserunt velit possimus dolores.', date: '29.01.2022  17:32', importance: 'average', importanceLevel: '3', difficult: 'medium', difficultLevel: '3'}, {id: '125dewbbasxasqwec', text: 'mananr ulan', date: '24.01.2022  16:32', importance: 'high', importanceLevel: '4', difficult: 'very hard', difficultLevel: '5'}, {id: '125dewbbxxxqwec', text: 'Loirem borem', date: '23.01.2022  17:37', importance: 'low', importanceLevel: '1', difficult: 'hard', difficultLevel: '4'}]
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