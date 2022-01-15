import { Outlet } from 'react-router-dom';
import s from './Layout.module.css';
import Header from './../Header/Header';
import Aside from './../Aside/Aside';
import Footer from './../Footer/Footer';

const Layout = (props) => {
  return (
    <>
    <Header />
    <div>
      <Aside />
      <main>
        <Outlet />
      </main>
    </div>
    <Footer />
    </>
  );
}

export default Layout;