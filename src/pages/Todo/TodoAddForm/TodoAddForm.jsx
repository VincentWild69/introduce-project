import s from './TodoAddForm.module.css';
import { v4 as genId } from 'uuid';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { addTodo } from '../../../store/slices/todosSlice';


const TodoAddForm = () => {

  const dispatch = useDispatch();
  const [todoText, setTodoText] = useState('')

  const createTime = () => {
    return new Date().toLocaleDateString() + '  ' + new Date().toLocaleTimeString('en-GB', { hour: "numeric", minute: "numeric"})
  }

  const addTodoHandler = () => {
    if (todoText.trim() !== '') {
      const todo = {
        id: genId(),
        text: todoText,
        time: createTime()
      }

      dispatch(addTodo(todo));
      setTodoText('');
    }
  }


  return (
    <form onSubmit={(e) => {e.preventDefault()}}>
      <textarea 
        type='text'
        placeholder='write your todo here...'
        className={s.todoInput}
        onChange={e => setTodoText(e.target.value)}
        value={todoText}
      />
      <button
        type='submit'
        className={s.submitBtn}
        onClick={addTodoHandler}
      >
        Add todo
      </button>
    </form>
  );
}

export default TodoAddForm;