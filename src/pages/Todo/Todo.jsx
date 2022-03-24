import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import s from "./Todo.module.css";
import TodoAddForm from "./TodoAddForm/TodoAddForm";
import TodoItem from "./TodoItem/TodoItem";
import TodoSearchForm from "./TodoSearchForm/TodoSearchForm";
import React from "react";
import { useFilter, useSort } from "./../../hooks/hooks";
import { useTranslation } from "react-i18next";
import { fillTodoList } from "../../store/slices/todosSlice";
import { storage } from "../../util/storage";

const Todo = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [offlineMode, setOfflineMode] = useState(true);
  const todoList = useSelector((state) => state.todos.todosItems);

  const sortConfig = {
    date: "up",
    importance: "up",
    difficult: "up",
  };

  useEffect(() => {
    if (offlineMode && !todoList) {
      dispatch(fillTodoList(storage.getItem('todos')))
    }

    if (!offlineMode) {
      console.log('online mod no exist')
    }
    
  }, [offlineMode])

  const { enteredSearchValue, setEnteredSearchValue, availableItems } =
    useFilter(todoList, "text");

  const [currentSortParam, setCurrentSortParam] = useState("date");

  const { sortMode, setSortMode, sortedItems } = useSort(
    availableItems,
    currentSortParam
  );

  return (
    <section className={s.todoSecWrapper}>
      <h2 className={s.todoMainTitle}>{t("todo.todo-h1")}</h2>
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
        {sortedItems.length > 0 ? (
          sortedItems.map((todoItem) => {
            return <TodoItem key={todoItem.id} todoItem={todoItem} />;
          })
        ) : (
          <div style={{ textAlign: "center", margin: "20px 0" }}>
            {t("todo.no-todos")}
          </div>
        )}
      </div>
    </section>
  );
};

export default Todo;
