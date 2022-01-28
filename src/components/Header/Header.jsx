
import PropTypes from 'prop-types';
import ThemeSwitcher from '../UI/ThemeSwither/ThemeSwitcher';
import s from './Header.module.css';

import classNames from 'classnames/bind';


const cx = classNames.bind(s);


const Header = ({isMenuActive, changeMenuStatus}) => {

  return (
    <div className={s.header}>
      <div onClick={() => changeMenuStatus()} className={cx('burger', {active: isMenuActive})}>
        <span className={s.burgerSpan}></span>
      </div>
      <ThemeSwitcher />
    </div>
    
  );
}


Header.propTypes = {
  isMenuActive: PropTypes.bool,
  changeMenuStatus: PropTypes.func
}

export default Header;