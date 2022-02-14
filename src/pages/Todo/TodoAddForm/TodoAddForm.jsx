import s from './TodoAddForm.module.css';
import { v4 as uId } from 'uuid';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { addTodo } from '../../../store/slices/todosSlice';
import { useTranslation } from 'react-i18next';


const TodoAddForm = () => {

  const { t } = useTranslation();

  const dispatch = useDispatch();
  const [todoText, setTodoText] = useState('');
  const [todoImportance, setTodoImportance] = useState('3');
  const [todoDifficult, setTodoDifficult] = useState('3');

  const createDate = () => {
    return new Date().toLocaleDateString() + '  ' + new Date().toLocaleTimeString('en-GB', { hour: "numeric", minute: "numeric"})
  }

  const importanceScale = [`${t('todo.low')}`, `${t('todo.under-average')}`, `${t('todo.average')}`, `${t('todo.high')}`, `${t('todo.highest')}`];
  
  const difficultScale = [`${t('todo.easier')}`, `${t('todo.easy')}`, `${t('todo.medium')}`, `${t('todo.hard')}`, `${t('todo.very-hard')}`];

  const addTodoHandler = () => {
    if (todoText.trim() !== '') {
      const todo = {
        id: uId(),
        text: todoText,
        date: createDate(),
        importance: importanceScale[todoImportance - 1].toLowerCase(),
        importanceLevel: todoImportance,
        difficult: difficultScale[todoDifficult - 1].toLowerCase(),
        difficultLevel: todoDifficult
      }

      dispatch(addTodo(todo));
      setTodoText('');
    }
  }


  return (
    <form className={s.todoAddForm} onSubmit={(e) => {e.preventDefault()}}>
      <textarea 
        type='text'
        placeholder={t('todo.textarea-placeholder')}
        className={s.todoInput}
        onChange={e => setTodoText(e.target.value)}
        value={todoText}
      />
      <div className={s.selectsWrapper}>
        <div>
          {t('todo.select-importance-level')} &nbsp;&nbsp;&nbsp;
            <select
              value={todoImportance}
              className={s.todoSelect}
              onChange={(e) => setTodoImportance(e.target.value)}
            >
              {importanceScale.map((e, i) => <option key={e} value={i + 1}>{e}</option>)}
            </select>
        </div>
        <div>
        {t('todo.select-difficult-level')} &nbsp;&nbsp;&nbsp;
          <select
            value={todoDifficult}
            className={s.todoSelect}
            onChange={(e) => setTodoDifficult(e.target.value)}
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
        {t('todo.add-todo')}
      </button>

    </form>
  );
}

export default TodoAddForm;