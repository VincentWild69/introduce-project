import s from './Register.module.css';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { createUser, updateUsersBin } from '../../store/thunks/authThunks';
import { useDispatch } from 'react-redux';
import { setError } from '../../store/slices/authSlice';


const cx = classNames.bind(s);

const validationSchema = yup.object({
  name: yup.string()
  .max(20, 'Too Long!')
  .required('Enter your name!'),
  
  email: yup.string()
  .email('Enter correct email!')
  .required('Enter your email!'),

  password: yup.string()
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
  const userError = useSelector(state => state.auth.error.message);

  useEffect(() => {
    updateUsersBin(users);
    return () => dispatch(setError(null))
  }, [users])

  const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onBlur'
  });
  
  const onSubmit = data => {

    let newUser = users.find(el => el.email === data.email);

    if (newUser) {
      dispatch(setError('User this this email already exist!'));
    } else {
      dispatch(createUser({
        name: data.name, 
        email: data.email, 
        password: data.password
      }));
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
              onChange={() => {if (userError) dispatch(setError(null))}}
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