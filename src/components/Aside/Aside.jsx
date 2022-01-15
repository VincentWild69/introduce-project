import { NavLink } from 'react-router-dom';
import s from './Aside.module.css';

const items = [{value: 'Home', href: '/', icon: 'home'}, {value: 'Contacts', href: '/contacts', icon: 'contact_page'}, {value: 'Quotes', href: '/quotes', icon: 'format_quote'},]

const Aside = ({isMenuActive, ...props}) => {
  return (
    <aside onClick={e => e.stopPropagation()} className={`${s.aside} ${isMenuActive ? s.active : null}`} >
      <ul className={s.menu}>
        {
          items.map((item, index) => 
            <li key={index} className={s.menuItem}>
              <span className={`material-icons ${s.beforeIcon}`}>{item.icon}</span>
              <NavLink className = {link => link.isActive ? s.menuLinkActive : s.menuLink} to={item.href}>{item.value}</NavLink>
            </li>
          )
        }
      </ul>
    </aside>
  );
}

export default Aside;