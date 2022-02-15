import s from './Greeting.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../../store/slices/authSlice';


const Greeting = () => {

  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.auth.isAuth);
  const user = useSelector(state => state.auth.currentUser);

  const logoutUser = () => {
    dispatch(logout());
  }

  return (
    <div className={s.greetingsContainer}>
      
      {isAuth ?
      <>
        <div className={s.greetingsHello}>Hello{`, ${user?.name || 'stranger'}`}!</div>
        <button onClick={logoutUser} className={s.logoutBtn}>logout</button>
      </>

      : <Link className={s.loginLink} to='/login'>Login</Link>}

    </div>  
  );
}

export default Greeting;