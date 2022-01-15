
import ThemeSwitcher from '../UI/ThemeSwither/ThemeSwitcher';
import s from './Header.module.css';



const Header = ({isMenuActive, changeMenuStatus, ...props}) => {

  return (
    <div className={s.header}>
      <div onClick={() => changeMenuStatus()} className={isMenuActive ? s.burgerActive : s.burger}>
        <span className={isMenuActive ? s.burgerSpanActive : s.burgerSpan}></span>
      </div>
      <ThemeSwitcher />
    </div>

  );
}

export default Header;