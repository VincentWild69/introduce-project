import { NavLink } from 'react-router-dom';
import s from './Aside.module.css';
import { PropTypes } from 'prop-types';
import SvgSelector from './../SvgSelector/SvgSelector';

import classNames from 'classnames/bind';


const cx = classNames.bind(s);


const items = [{value: 'Home', href: '/', icon: 'home'}, {value: 'Contacts', href: '/contacts', icon: 'contacts'}, {value: 'Todos', href: '/todos', icon: 'todos'}, {value: 'Cats', href: '/cats', icon: 'cats'}];

const Aside = ({isMenuActive}) => {
  return (
    <aside onClick={e => e.stopPropagation()} className={cx('aside', {active: isMenuActive})} >
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