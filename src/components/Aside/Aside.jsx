import { NavLink } from 'react-router-dom';
import s from './Aside.module.css';
import { PropTypes } from 'prop-types';
import SvgSelector from './../SvgSelector/SvgSelector';

const items = [{value: 'Home', href: '/', icon: 'home'}, {value: 'Contacts', href: '/contacts', icon: 'contacts'}, {value: 'Quotes', href: '/quotes', icon: 'quotes'}, {value: 'Cats', href: '/cats', icon: 'cats'}];

const Aside = ({isMenuActive}) => {
  return (
    <aside onClick={e => e.stopPropagation()} className={`${s.aside} ${isMenuActive ? s.active : null}`} >
      <ul className={s.menu}>
        {
          items.map((item) => 
            <li key={item.value} className={s.menuItem}>
              <span className={s.beforeIcon}>< SvgSelector id={item.icon} /></span>
              <NavLink className = {link => link.isActive ? s.menuLinkActive : s.menuLink} to={item.href}>{item.value}</NavLink>
            </li>
          )
        }
      </ul>
    </aside>
  );
}


Aside.propTypes = {
  isMenuActive: PropTypes.bool
}


export default Aside;