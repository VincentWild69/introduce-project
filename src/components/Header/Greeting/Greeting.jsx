import s from './Greeting.module.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


const Greeting = () => {

  const isAuth = useSelector(state => state.auth.isAuth);
  const user = useSelector(state => state.auth.currentUser);

  return (
    <div className={s.greetingsContainer}>
      
      {isAuth ?
      <>
        <div className={s.greetingsHello}>Hello{`, ${user?.name || 'stranger'}`}!</div>
        <button className={s.logoutBtn}>logout</button>
      </>

      : <Link className={s.loginLink} to='/login'>Login</Link>}

    </div>  
  );
}

export default Greeting;