import { NavLink } from 'react-router-dom';
import s from './Aside.module.css';



const Aside = (props) => {
  return (
    <div className={s.aside}>
      <NavLink to='/'>Home</NavLink>
      <NavLink to='/contacts'>contacts</NavLink>
      <NavLink to='/quotes'>quotes</NavLink>
    </div>
  );
}

export default Aside;