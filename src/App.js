import { Route, Routes } from "react-router-dom";
import Layout from './components/Layout/Layout';
import Cats from "./pages/Cats/Cats";
import Contacts from './pages/Contacts/Contacts';
import Home from './pages/Home/Home';
import Cat from './pages/Cats/Cat/Cat';
import Todo from './pages/Todo/Todo';
import Quotes from './pages/Quotes/Quotes';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import NotFoundPgae from './components/NotFoundPage/NotFoundPage';
import AdminTools from './components/AdminTools/AdminTools';
import React from 'react';
import { autoLogin, getUsersList } from './store/thunks/authThunks';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { storage } from './util/storage';


function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    
    let currentId = storage.getItem('curUser');

    if (currentId) {
      dispatch(autoLogin(currentId))
    }
  }, [])


  return (

      <div className='container'>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='contacts' element={<Contacts />} />
            <Route path='todos' element={<Todo />} />
            <Route path='cats' element={<Cats />} />
            <Route path='cats/:id' element={<Cat />} />
            <Route path='quotes' element={<Quotes />} />
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path='adm' element={<AdminTools />} />
          </Route>
          <Route path='*' element={<NotFoundPgae />} />
        </Routes>
      </div>

  );
}

export default App;
