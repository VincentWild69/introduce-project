import { NavLink } from 'react-router-dom';
import ThemeSwitcher from '../UI/ThemeSwither/ThemeSwitcher';
import s from './Header.module.css';



const Header = (props) => {

  return (
    <div className={s.header}>Header
      <NavLink to='/'>Home</NavLink>
      <NavLink to='/contacts'>contacts</NavLink>
      <NavLink to='/quotes'>quotes</NavLink>
      <ThemeSwitcher />
    </div>

  );
}

export default Header;