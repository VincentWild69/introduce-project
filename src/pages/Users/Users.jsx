import s from './Users.module.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersList } from '../../store/thunks/authThunks';
import Loader from './../../components/Loader/MainLoader/Loader';
import rezAvatar from '../../assets/img/rezAvatar.jpg';
import { Link } from 'react-router-dom';


const Users = () => {

  const dispatch = useDispatch();
  const users = useSelector(state => state.auth.users);
  const isFetching = useSelector(state => state.auth.isLoading);

  useEffect(() => {
    !users && dispatch(getUsersList());
  }, [])


  if (isFetching) return <Loader height='60vh' />
  if (!users) return (
    <div className={s.noUsers}>
      <div>Cant loading users...</div>
    </div>)
  return (
    <div className={s.usersListContainer}>
      {users.map(user => {
        return (
          <div key={user.id} className={s.userContainer}>
            <Link to={`${user.id}`}><img src={user?.avatar || rezAvatar} alt='userPhoto' /></Link>
            <div className={s.userInfo}>
              {user.name}
            </div>
          </div>
        )
      })}
    </div>
  );

}

export default Users;