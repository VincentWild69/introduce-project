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
import { loginThunk } from './store/thunks/authThunks';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { storage } from './util/storage';
import { useSelector } from 'react-redux';
import ModalWindow from "./components/UI/ModalWindow/ModalWindow";
import { setError } from "./store/slices/authSlice";
import ErrorMessageModal from "./components/UI/ErrorMessageModal/ErrorMessageModal";
import ProfilePage from './pages/ProfilePage/ProfilePage';
import Users from "./pages/Users/Users";
import RequireAuth from './hocs/RequireAuth';


function App() {

  const dispatch = useDispatch();
  const error = useSelector(state => state.auth.error.message)
  const [modal, setModal] = useState(false);

  useEffect(() => {
    error ? setModal(true) : setModal(false)
  }, [error])

  useEffect(() => { 
    let currentId = storage.getItem('curUser');
    if (currentId) {
      dispatch(loginThunk(currentId))
    }
  }, [])


  const clearAndCloseError = () => {
    setModal(false);
    setTimeout(() => {dispatch(setError(null))}, 100);
  }


  return (

      <div className='container'>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='contacts' element={<Contacts />} />
            <Route path='todos' element={<Todo />} />
            <Route path='cats' element={<Cats />} />
            <Route path='cats/:id' element={<Cat />} />
            <Route path='quotes' element={
              <RequireAuth>
                <Quotes />
              </RequireAuth>
            } />
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path='users' element={<Users />} />
            <Route path='users/:id' element={<ProfilePage />} />
            <Route path='adm' element={<AdminTools />} />
          </Route>
          <Route path='*' element={<NotFoundPgae />} />
        </Routes>

        <ModalWindow visible={modal} setVisible={clearAndCloseError}>
          <ErrorMessageModal error={error} />
        </ModalWindow>
      </div>

  );
}

export default App;
