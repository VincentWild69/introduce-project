
import PropTypes from 'prop-types';
import ThemeSwitcher from '../UI/ThemeSwither/ThemeSwitcher';
import s from './Header.module.css';
import classNames from 'classnames/bind';
import LangSelect from '../UI/LangSelect/LangSelect';



const cx = classNames.bind(s);


const Header = ({isMenuActive, changeMenuStatus}) => {


  return (
    <div className={s.header}>
      <div onClick={() => changeMenuStatus()} className={cx('burger', {active: isMenuActive})}>
        <span className={s.burgerSpan}></span>
      </div>
      <div className={s.headerTools}>
        <LangSelect />
        <ThemeSwitcher />
      </div>
    </div>
    
  );
}


Header.propTypes = {
  isMenuActive: PropTypes.bool,
  changeMenuStatus: PropTypes.func
}

export default Header;