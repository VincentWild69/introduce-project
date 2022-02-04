import s from './TodoAddForm.module.css';
import { v4 as genId } from 'uuid';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { addTodo } from '../../../store/slices/todosSlice';


const TodoAddForm = () => {

  const dispatch = useDispatch();
  const [todoText, setTodoText] = useState('');
  const [todoImportance, setTodoImportance] = useState('3');
  const [todoDiff, setTodoDiff] = useState('3');

  const createDate = () => {
    return new Date().toLocaleDateString() + '  ' + new Date().toLocaleTimeString('en-GB', { hour: "numeric", minute: "numeric"})
  }

  const importanceScale = ['Low', 'Under average', 'Average', 'High', 'Highest'];
  const difficultScale = ['Easier', 'Easy', 'Medium', 'Hard', 'Very hard'];

  const addTodoHandler = () => {
    if (todoText.trim() !== '') {
      const todo = {
        id: genId(),
        text: todoText,
        date: createDate(),
        importance: importanceScale[todoImportance - 1].toLowerCase(),
        importanceLevel: todoImportance,
        difficult: difficultScale[todoDiff - 1].toLowerCase(),
        difficultLevel: todoDiff
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
      <div className={s.selectsWrapper}>
        <div>
          Select importance level &nbsp;&nbsp;&nbsp;
            <select
              value={todoImportance}
              className={s.todoSelect}
              onChange={(e) => setTodoImportance(e.target.value)}
            >
              {importanceScale.map((e, i) => <option key={e} value={i + 1}>{e}</option>)}
            </select>
        </div>
        <div>
          Select difficulty level &nbsp;&nbsp;&nbsp;
          <select
            value={todoDiff}
            className={s.todoSelect}
            onChange={(e) => setTodoDiff(e.target.value)}
          >
            {difficultScale.map((e, i) => <option key={e} value={i + 1}>{e}</option>)}
          </select>
        </div>
      </div>
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