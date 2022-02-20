import { useParams } from 'react-router-dom';
import s from './ProfilePage.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setError } from '../../store/slices/authSlice';
import Loader from '../../components/Loader/MainLoader/Loader';
import rezAvatar from '../../assets/img/rezAvatar.png';

const ProfilePage = () => {

  const dispatch = useDispatch();
  const [isFetching, setIsFetching] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [error, setError] = useState(null);
  const [profile, setProfile] = useState(null);
  const params = useParams();

  useEffect(() => {
    setIsFetching(true);
    axios.get(`https://json.extendsclass.com/bin/${params.id}`)
    .then(res => {
      setProfile(res.data);
      setIsUser(true);
      setIsFetching(false);
    })
    .catch( error => {
      if (error.response) {
        setError(`Cant fetch user. Error ${error.response.status}: ${error.response.data.message}`);
        setIsFetching(false);
      } else {
        setError(`Cant fetch user. ${error}`);
        setIsFetching(false);
      }
    });
  }, [])
  
  if (isFetching) return <Loader height='60vh' />
  if (!isUser) return (
    <div className={s.noUser}>
      <div>{error}</div>
    </div>)
  return (
      <div className={s.profileContainer}>
        <div className={s.profileHeader}>
          <img src={profile?.userAvatar || rezAvatar} alt='userPhoto' />
          <div className={s.profileInfo}>
            <div>{profile.name}</div>
          </div>
        </div>
      </div>
    );
}

export default ProfilePage;