import s from './TodoSearchForm.module.css';
import classNames from 'classnames/bind';
import { PropTypes } from 'prop-types';
import SvgSelector from './../../../components/SvgSelector/SvgSelector';


const cx = classNames.bind(s);

const TodoSearchForm = ({enteredSearchValue, setEnteredSearchValue}) => {


  return (
    <div>
      <div className={cx('filterFormBlock', 'searchForm')}>
        <input
          type="search"
          value={enteredSearchValue}
          onChange={(e) => setEnteredSearchValue(e.target.value)}
          placeholder="search todo"
          className={s.filterSearch}
        />
      </div>
      <div className={cx('filterFormBlock', 'checkboxes')}>
        <div>Sort by:{" "}</div>
        <div>
          Date{" "}
          <label className={s.filterLabel}>
            <input
              type='checkbox'
              value='date'
              className={s.filterCheckbox}
            />
            <span><SvgSelector id='arrow-up' /></span>
          </label>
        </div>
        <div>
          Importance{" "}
          <label className={s.filterLabel}>
            <input
              type='checkbox'
              value='importance'
              className={s.filterCheckbox}
            />
            <span><SvgSelector id='arrow-up' /></span>
          </label>
        </div>
        <div>
          Сomplexity{" "}
          <label className={s.filterLabel}>
            <input
              type='checkbox'
              value='complexity'
              className={s.filterCheckbox}
            />
            <span><SvgSelector id='arrow-up' /></span>
          </label>
        </div>
      </div>
    </div>
  );
}


TodoSearchForm.propTypes = {
  enteredSearchValue: PropTypes.string,
  setEnteredSearchValue: PropTypes.func,
}


export default TodoSearchForm;