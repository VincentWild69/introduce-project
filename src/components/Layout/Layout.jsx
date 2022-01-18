import { Outlet } from 'react-router-dom';
import s from './Layout.module.css';
import Header from './../Header/Header';
import Aside from './../Aside/Aside';
import Footer from './../Footer/Footer';
import { useState } from 'react';

const Layout = () => {

  let [isMenuActive, setMenuActive] = useState(window.matchMedia('(max-width: 900px)').matches ? false : true);

  const changeMenuStatus = () => {
    setMenuActive(!isMenuActive);
  }

  return (
    <>
      <Header isMenuActive={isMenuActive} changeMenuStatus={changeMenuStatus}/>
      <div onClick={() => setMenuActive(false)} className={s.content}>
        <Aside isMenuActive={isMenuActive}/>
        <main className={s.main}>
          <Outlet />
        </main>
      </div>
      <Footer />
    </>
  );
}

export default Layout;