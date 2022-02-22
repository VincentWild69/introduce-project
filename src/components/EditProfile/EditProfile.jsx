import RequireAuth from '../../hocs/RequireAuth';
import s from './EditProfile.module.css';
import { useParams, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { getUsersList, updateUser, updateUsersBin } from '../../store/thunks/authThunks';
import { setAlert, updUserStore } from '../../store/slices/authSlice';
import ModalWindow from '../UI/ModalWindow/ModalWindow';


const cx = classNames.bind(s);

const validationSchema = yup.object({
  name: yup.string()
  .trim()
  .max(30, 'Too Long!')
  .required('Enter your name!'),
  
  email: yup.string()
  .email('Enter correct email!')
  .required('Enter your email!'),

  city: yup.string()
  .trim()
  .max(20, 'Too Long!'),

  password: yup.string()
  .trim()
  .min(6, 'The password must contain at least 6 characters')
  .max(30, 'Too Long!')
  .required('Enter your password!'),

  confirmPassword: yup.string()
  .oneOf([yup.ref('password')], 'Passwords are different!')
  .required('Confirm your password!'),

});

const EditProfile = () => {

  const params = useParams();
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const alert = useSelector(state => state.auth.alert);

  const currentUser = useSelector(state => state.auth?.currentUser);
  const editMode = currentUser?.id === params.id;
  const usersList = useSelector(state => state.auth.users);

  const [userName, setUserName] = useState(currentUser?.name || '');
  const [userEmail, setUserEmail] = useState(currentUser?.email || '');
  const [userAvatar, setUserAvatar] = useState(currentUser?.avatar || '');
  const [userStatus, setUserStatus] = useState(currentUser?.status || '');
  const [userCity, setUserCity] = useState(currentUser?.city || '');

  const [userPassword, setUserPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const serverLoading = useSelector(state => state.auth.isLoading);
  const [emailError, setEmailError] = useState(null);

  useEffect(() => {
    !usersList && dispatch(getUsersList());
    const thisUser = usersList && usersList.find(user => user.id === currentUser.id);
    setUserPassword(thisUser?.password || '');
  }, [usersList])

  useEffect(() => {
    usersList && dispatch(updateUsersBin(usersList));
  }, [usersList])

  useEffect(() => {
    alert ? setModal(true) : setModal(false)
  }, [alert])

  const clearAndCloseAlert = () => {
    setModal(false);
    setTimeout(() => {dispatch(setAlert(null))}, 100);
  }

  const { register, handleSubmit, formState:{ errors } } = useForm({
    defaultValues: {
      name: currentUser?.name || '',
      email: currentUser?.email || '',
      avatar: currentUser?.avatar || '',
      city: currentUser?.city || '',
      password: userPassword,
      confirmPassword: ''
    },
    resolver: yupResolver(validationSchema),
    mode: 'onBlur'
  });

  const onSubmit = data => {

    let oldUser = usersList.find(user => user.email === data.email && user.id !== currentUser.id);

    if (oldUser) {
      setEmailError('User with this email already exist!')
    } else {
      const userInfo = {...data};
      delete userInfo.confirmPassword;
      const updData = {};
      for (let key in userInfo) {
        if (userInfo[key] !== currentUser[key]) updData[key] = userInfo[key]
      }
      dispatch(updateUser(currentUser.id, updData));
    }
  }


  return (
    <RequireAuth>
      {!editMode ? 
      <Navigate to='/' replace={true}/> :
      <div className={s.editProfileContainer}>
        <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
          <div>
          <label className={s.editLabel}>
              <p>Name</p>
              <input 
              {...register("name")}
              className={cx('editInput', {wrongValue: errors.name})}
              type={`text`} 
              placeholder={`enter your name...`}
              // value={userName}
              // onChange={(e) => setUserName(e.target.value)}
              />
              <div className={s.error}>
                {errors.name?.message}
              </div>
            </label>

            <label className={s.editLabel}>
              <p>Email</p>
              <input 
              {...register("email")}
              className={cx('editInput', {wrongValue: errors.email})}
              placeholder={`enter your email...`}
              // value={userEmail}
              onChange={(e) => {
                if (emailError) setEmailError(null);
                // setUserEmail(e.target.value);
              }}
              />
              <div className={s.error}>
                {errors.email?.message}
              </div>              
              <div className={s.error}>
                {emailError}
              </div>
            </label>

            <label className={s.editLabel}>
              <p>Link to avatar image (URL)</p>
              <input 
              {...register("avatar")}
              className={cx('editInput', {wrongValue: errors.avatar})}
              placeholder={`enter link to avatar image`}
              // value={userAvatar}
              // onChange={(e) => {
              //   setUserAvatar(e.target.value);
              // }}
              />
              <div className={s.error}>
                {errors.avatar?.message}
              </div>              
            </label>

            <label className={s.editLabel}>
              <p>Status  <span>{`${userStatus.length}/100`}</span></p>
              <textarea 
              {...register("status")}
              className={cx('editInput', {wrongValue: errors.status})}
              placeholder={`enter your status`}
              value={userStatus}
              onChange={(e) => {
                if (e.target.value.length <= 100)
                setUserStatus(e.target.value);
              }}
              />
              <div className={s.error}>
                {errors.status?.message}
              </div>
            </label>

            <label className={s.editLabel}>
              <p>City</p>
              <input 
              {...register("city")}
              className={cx('editInput', {wrongValue: errors.city})}
              placeholder={`enter your city`}
              // value={userCity}
              // onChange={(e) => {
              //   setUserCity(e.target.value);
              // }}
              />
              <div className={s.error}>
                {errors.city?.message}
              </div>
            </label>

            <label className={s.editLabel}>
              <p>Password</p>
              <input 
              {...register("password")}
              className={cx('editInput', {wrongValue: errors.password})}
              placeholder={`enter password`}
              // value={userPassword}
              // onChange={(e) => {
              //   setUserPassword(e.target.value);
              // }}
              />
              <div className={s.error}>
                {errors.password?.message}
              </div>
            </label>

            <label className={s.editLabel}>
              <p>Confirm password</p>
              <input 
              {...register("confirmPassword")}
              className={cx('editInput', {wrongValue: errors.confirmPassword})}
              placeholder={`confirm password`}
              // value={confirmPassword}
              // onChange={(e) => {
              //   setConfirmPassword(e.target.value);
              // }}
              />
              <div className={s.error}>
                {errors.confirmPassword?.message}
              </div>
            </label>

          </div>
          <button 
            className={s.confirmBtn}
            type={`submit`}
            >Confirm
          </button>
        </form>
      </div>}

      <ModalWindow visible={modal} setVisible={clearAndCloseAlert}>
        <div style={{color: '#25861c', fontWeight: '500'}}>
          {alert}
        </div>
      </ModalWindow>
    </RequireAuth>
  );
}

export default EditProfile;