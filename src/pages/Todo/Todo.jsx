import { useState } from 'react';
import { useSelector } from 'react-redux';
import s from './Todo.module.css';
import TodoAddForm from './TodoAddForm/TodoAddForm';
import TodoItem from './TodoItem/TodoItem';
import TodoSearchForm from './TodoSearchForm/TodoSearchForm';
import React from 'react';
import { useFilter } from './../../hooks/hooks';


const Todo = () => {

  const todoList = useSelector(state => state.todos.todosItems)

  const {
    enteredSearchValue,
    setEnteredSearchValue,
    availableItems
  } = useFilter(todoList, 'text');


  const sortConfig = {
    date: 'asc',
    importance: 'asc',
    complexity: 'asc'
  }





  return (
    <section className={s.todoSecWrapper}>
      <h2 className={s.todoMainTitle}>Todo list</h2>
      <TodoAddForm />
      <TodoSearchForm 
        setEnteredSearchValue={setEnteredSearchValue}
        enteredSearchValue={enteredSearchValue}
      />
      <div className={s.todoContainer}>
        {
          availableItems.length > 0
          ? availableItems.map(todoItem => {
            return <TodoItem key={todoItem.id} todoItem={todoItem} />
          })
          : <div style={{textAlign: 'center'}}>No todos</div>
        }
      </div>
    </section>
  );
}

export default Todo;