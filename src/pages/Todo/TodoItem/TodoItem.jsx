import s from './TodoItem.module.css';
import { PropTypes } from 'prop-types';
import SvgSelector from './../../../components/SvgSelector/SvgSelector';
import { useDispatch } from 'react-redux';
import { removeTodo } from '../../../store/slices/todosSlice';
import { useTranslation } from 'react-i18next';


const TodoItem = ({todoItem}) => {

  const { t } = useTranslation();

  const dispatch = useDispatch();

  return (
      <div className={s.todoItemContainer}>
        <div>
          <div>{todoItem.text}</div>
          <div className={s.todoItemDetails}>
            <div className={s.todoItemDesc}>{t('todo.created')}: <span>{todoItem.date}</span></div>
            <div className={s.todoItemDesc}>{t('todo.importance')}: <span>{todoItem.importance}</span></div>
            <div className={s.todoItemDesc}>{t('todo.difficult')}: <span>{todoItem.difficult}</span></div>
          </div>
        </div>
        <div onClick={() => dispatch(removeTodo(todoItem.id))} className={s.todoItemCloseBtn}><SvgSelector id='close-btn' /></div>
      </div>
  );
}

TodoItem.propTypes = {
  todoItem: PropTypes.object
}

export default TodoItem;