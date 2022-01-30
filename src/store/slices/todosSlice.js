import { createSlice } from "@reduxjs/toolkit"


const initialState = {
  todosItems: [{id: '12dewqwec', text: 'The recommended way to start new apps with React and Redux is by using the official Redux+JS template or Redux+TS template for Create React App, which takes advantage of Redux Toolkit and React Reduxs integration with React components.', time: '28.01.2022  17:33', importance: 'average', importanceLevel: '4', difficult: 'medium', difficultLevel: '3'}, {id: '125dewbbqwec', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi cum ratione necessitatibus, harum incidunt velit enim ab magnam architecto aspernatur minus debitis perferendis delectus fugiat. Ullam deserunt velit possimus dolores.', time: '29.01.2022  17:32', importance: 'average', importanceLevel: '4', difficult: 'medium', difficultLevel: '3'}]
}

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todosItems.push(action.payload)
    },
    removeTodo: (state, action) => {
      state.todosItems = state.todosItems.filter(todo => todo.id !== action.payload)
    }
  }
})



export const {addTodo, removeTodo} = todosSlice.actions;

export default todosSlice.reducer;