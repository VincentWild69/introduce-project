import { useState } from 'react';
import { useSelector } from 'react-redux';
import s from './Todo.module.css';
import TodoAddForm from './TodoAddForm/TodoAddForm';
import TodoItem from './TodoItem/TodoItem';
import TodoSearchForm from './TodoSearchForm/TodoSearchForm';
import React from 'react';
import { useFilter, useSort } from './../../hooks/hooks';
import { useTranslation } from 'react-i18next';


const Todo = () => {

  const { t } = useTranslation();

  const todoList = useSelector(state => state.todos.todosItems)

  const sortConfig = {
    date: 'up',
    importance: 'up',
    difficult: 'up',
  }
  
  const {
    enteredSearchValue,
    setEnteredSearchValue,
    availableItems
  } = useFilter(todoList, 'text');

  const [currentSortParam, setCurrentSortParam] = useState('date')

  const {
    sortMode,
    setSortMode,
    sortedItems
  } = useSort(availableItems, currentSortParam)

  // React.useEffect(() => {
  //   fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/413187`).then(
  //     res => {
  //       if (res.ok) {
  //         return res.json()
  //       } else {
  //         console.log('errrrrr')
  //       }
  //     }
  //   ).then(
  //     data => console.log(data)
  //   )
  // }, [])

  return (
    <section className={s.todoSecWrapper}>
      <h2 className={s.todoMainTitle}>{t('todo.todo-h1')}</h2>
      <TodoAddForm />
      <TodoSearchForm 
        enteredSearchValue={enteredSearchValue}
        setEnteredSearchValue={setEnteredSearchValue}
        currentSortParam={currentSortParam}
        setCurrentSortParam={setCurrentSortParam}
        sortMode={sortMode}
        setSortMode={setSortMode}
        sortConfig={sortConfig}
      />
      <div className={s.todoContainer}>
        {
          sortedItems.length > 0
          ? sortedItems.map(todoItem => {
            return <TodoItem key={todoItem.id} todoItem={todoItem} />
          })
          : <div style={{textAlign: 'center', marginTop: '20px'}}>{t('todo.no-todos')}</div>
        }
      </div>
    </section>
  );
}

export default Todo;