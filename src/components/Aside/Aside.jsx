import { NavLink } from 'react-router-dom';
import s from './Aside.module.css';
import { PropTypes } from 'prop-types';
import SvgSelector from './../SvgSelector/SvgSelector';

import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';


const cx = classNames.bind(s);

const Aside = ({isMenuActive}) => {

  const {t} = useTranslation();

  const items = [{value: `${t('menu.home')}`, href: '/', icon: 'home'}, {value: `${t('menu.contacts')}`, href: '/contacts', icon: 'contacts'}, {value: `${t('menu.todos')}`, href: '/todos', icon: 'todos'}, {value: `${t('menu.cats')}`, href: '/cats', icon: 'cats'}, {value: `${t('menu.quotes')}`, href: '/quotes', icon: 'quotes'}];

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