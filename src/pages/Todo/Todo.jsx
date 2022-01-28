import { useSelector } from 'react-redux';
import s from './Todo.module.css';
import TodoAddForm from './TodoAddForm/TodoAddForm';
import TodoItem from './TodoItem/TodoItem';



const Todo = () => {

  const todoList = useSelector(state => state.todos.todosItems)



  return (
    <section className={s.todoSecWrapper}>
      <h2 className={s.todoMainTitle}>Todo list</h2>
      <TodoAddForm />
      <div className={s.todoContainer}>
        {
          todoList.length > 0
          ? todoList.map(todoItem => {
            return <TodoItem key={todoItem.id} todoItem={todoItem} />
          })
          : <div style={{textAlign: 'center'}}>You have not todos yet</div>
        }
      </div>
    </section>
  );
}

export default Todo;