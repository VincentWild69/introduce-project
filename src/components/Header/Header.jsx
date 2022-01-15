
import ThemeSwitcher from '../UI/ThemeSwither/ThemeSwitcher';
import s from './Header.module.css';



const Header = ({isMenuActive, changeMenuStatus, ...props}) => {

  return (
    <div className={s.header}>
      <div onClick={() => changeMenuStatus()} className={`${s.burger} ${isMenuActive ? s.active : null}`}>
        <span className={s.burgerSpan}></span>
      </div>
      <ThemeSwitcher />
    </div>
    
  );
}

export default Header;