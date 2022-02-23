import { Link, useNavigate, useParams } from 'react-router-dom';
import s from './ProfilePage.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/Loader/MainLoader/Loader';
import rezAvatar from '../../assets/img/rezAvatar.jpg';
import ModalWindow from '../../components/UI/ModalWindow/ModalWindow';
import { deleteAccount, getUsersList, updateUsersBin } from '../../store/thunks/authThunks';

const ProfilePage = () => {

  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

  const currentUser = useSelector(state => state.auth?.currentUser?.id);
  const editMode = currentUser === params.id;
  const usersList = useSelector(state => state.auth.users);

  const serverLoading = useSelector(state => state.auth.isLoading);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);
  const [profile, setProfile] = useState(null);
  const [modal, setModal] = useState(false);
  

  useEffect(() => {
    setIsFetching(true);
    axios.get(`https://json.extendsclass.com/bin/${params.id}`)
    .then(res => {
      setProfile(res.data);
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

  useEffect(() => {
    usersList && dispatch(updateUsersBin(usersList));
  }, [usersList])

  const deleteUserAccount = (id) => {
    dispatch(deleteAccount(id));
    setProfile(null);
    setError(`User was successfully deleted...`);
    setModal(false);
  }
  
  if (isFetching) return <Loader height='60vh' />
  if (!profile) return (
    <div className={s.noUser}>
      <div>{error || 'Unexpected error'} &#128577;</div>
    </div>)
  return (
      <div className={s.profileContainer}>
        <div className={s.profileHeader}>
          <img src={profile?.avatar || rezAvatar} alt='userPhoto' />
          <div className={s.profileInfo}>
            <div><span>Name:</span> {profile.name}</div>
            <div><span>Status:</span> {profile?.status || 'not defined'}</div>
            <div><span>City:</span> {profile?.city || 'not defined'}</div>
          </div>
        </div>
        <div>
          {editMode && <div className={s.editBtns}>
            <button
              onClick={() => {
                  dispatch(getUsersList());
                  setModal(true);
                }
              }
              className={s.deleteBtn}>
              Delete account
            </button>
            <Link to={`edit`}>
              <button
                className={s.editBtn}>
                Edit account
              </button>
            </Link>
          </div>}
        </div>


        <ModalWindow visible={modal} setVisible={() => setModal(false)}>
          {serverLoading ? <Loader /> :
          <div>
            <div className={s.warningText}>This accounnt will be deleted.<br/> Are you sure?</div>
            <div className={s.modalBtns}>
              <button 
              onClick={() => setModal(false)} 
              className={`${s.cancelBtn} ${s.modalBtn}`}>Cancel</button>
              <button 
              onClick={() => {
                deleteUserAccount(currentUser);
              }} 
              className={`${s.confirmBtn} ${s.modalBtn}`}>Delete</button>
            </div>
          </div>}
        </ModalWindow>
      </div>
    );
}

export default ProfilePage;