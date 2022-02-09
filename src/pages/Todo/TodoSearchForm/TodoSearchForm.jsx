import s from './TodoSearchForm.module.css';
import classNames from 'classnames/bind';
import { PropTypes } from 'prop-types';
import SvgSelector from './../../../components/SvgSelector/SvgSelector';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';


const cx = classNames.bind(s);

const TodoSearchForm = ({enteredSearchValue, setEnteredSearchValue, currentSortParam, setCurrentSortParam, sortMode, setSortMode, sortConfig}) => {

  const { t } = useTranslation();

  const [sortValues, setSortValues] = useState(sortConfig);

  const setSortParams = (param) => {
    setSortMode((oldMode) => `${oldMode === 'up' ? 'down' : 'up'}`);
    setSortValues((oldValues) =>({...oldValues, [param]: sortMode === 'up' ? 'down' : 'up'}));
    setCurrentSortParam(param === 'date' ? param : `${param}Level`);
  }

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


  return (
    <div>
      <div className={cx('filterFormBlock', 'searchForm')}>
        <input
          type="search"
          value={enteredSearchValue}
          onChange={(e) => setEnteredSearchValue(e.target.value)}
          placeholder={t('todo.search-placeholder')}
          className={s.filterSearch}
        />
      </div>
      <div className={cx('filterFormBlock', 'checkboxes')}>
        <div>{t('todo.sort-by')}:{" "}</div>
        {Object.keys(sortConfig).map(item => {
          return <div key={item} className={cx({activeSortOption: currentSortParam.includes(item)})}>
                  {capitalizeFirstLetter(t(`todo.${item}`))}{' '}
                  <label className={s.filterLabel}>
                    <input
                      type='checkbox'
                      value={item}
                      className={s.filterCheckbox}
                      onChange={() => setSortParams(item)}
                    />
                    <span><SvgSelector className={s[`arrow-${sortValues[item]}`]} id={`arrow-up`} /></span>
                  </label>
                </div>
        })}

      </div>
    </div>
  );
}


TodoSearchForm.propTypes = {
  enteredSearchValue: PropTypes.string,
  setEnteredSearchValue: PropTypes.func,
  currentSortParam: PropTypes.string,
  setCurrentSortParam: PropTypes.func,
  sortMode: PropTypes.string,
  setSortMode: PropTypes.func,
  sortConfig: PropTypes.object
}


export default TodoSearchForm;