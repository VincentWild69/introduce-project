import s from './Register.module.css';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import classNames from 'classnames/bind';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { createUser, updateUsersBin, getUsersList } from '../../store/thunks/authThunks';


const cx = classNames.bind(s);

const validationSchema = yup.object({
  name: yup.string()
  .trim()
  .max(20, 'Too Long!')
  .required('Enter your name!'),
  
  email: yup.string()
  .email('Enter correct email!')
  .required('Enter your email!'),

  password: yup.string()
  .trim()
  .min(6, 'The password must contain at least 6 characters')
  .max(30, 'Too Long!')
  .required('Enter your password!'),

  confirmPassword: yup.string()
  .oneOf([yup.ref('password')], 'Passwords are different!')
  .required('Confirm your password!'),

});


const Register = () => {

  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.auth.isAuth);
  const users = useSelector(state => state.auth.users);
  const [userError, setUserError] = useState(null);

  useEffect(() => {
    dispatch(getUsersList());
  }, [])

  useEffect(() => {
    dispatch(updateUsersBin(users));
  }, [users])


  const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onBlur'
  });
  
  const onSubmit = data => {

    let oldUser = users.find(user => user.email === data.email);

    if (oldUser) {
      setUserError('User this this email already exist!')
    } else {
      const userInfo = {...data};
      delete userInfo.confirmPassword
      dispatch(createUser(userInfo));
    }
  };

  return (

    <>
      {isAuth && (
        <Navigate to="/" replace={true} />
      )}

      <div className={s.registerContainer}>
        <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
          <div>

            <label className={s.registerLabel}>
              <p>Name</p>
              <input 
              {...register("name")}
              className={cx('registerInput', {wrongValue: errors.name})}
              type={`text`} 
              placeholder={`enter your name...`}
              />
              <div className={s.error}>
                {errors.name?.message}
              </div>
            </label>

            <label className={s.registerLabel}>
              <p>Email</p>
              <input 
              {...register("email")}
              className={cx('registerInput', {wrongValue: errors.email})}
              placeholder={`enter your email...`}
              onChange={() => {if (userError) setUserError(null)}}
              />
              <div className={s.error}>
                {errors.email?.message}
              </div>              
              <div className={s.error}>
                {userError}
              </div>
            </label>

            <label className={s.registerLabel}>
              <p>Password</p>
              <input 
              {...register("password")}
              className={cx('registerInput', {wrongValue: errors.password})}
              type={`password`} 
              placeholder={`enter your password...`}
              />
              <div className={s.error}>
                {errors.password?.message}
              </div>
            </label>

            <label className={s.registerLabel}>
              <p>Confirm password</p>
              <input 
              {...register("confirmPassword")}
              className={cx('registerInput', {wrongValue: errors.confirmPassword})}
              type={`password`} 
              placeholder={`confirm password...`}
              />
              <div className={s.error}>
                {errors.confirmPassword?.message}
              </div>
            </label>

          </div>
          <button 
            className={s.sendBtn}
            type={`submit`}
            >Register
          </button>
        </form>
      </div>
    </>
  );
}

export default Register;