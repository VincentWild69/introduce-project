import s from './Login.module.css';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import classNames from 'classnames/bind';
import { Link, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const cx = classNames.bind(s);

const validationSchema = yup.object({
  
  email: yup.string()
  .email('Enter correct email!')
  .required('Enter your email!'),

  password: yup.string()
  .required('Enter your password!'),

});

const Login = () => {

  const isAuth = useSelector(state => state.auth.isAuth);

  const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onBlur'
  });
  const onSubmit = data => console.log(data);

  return (

    <>
    {isAuth && (
      <Navigate to="/" replace={true} />
    )}

      <div className={s.loginContainer}>
        <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
          <div>
            
            <label className={s.loginLabel}>
              <p>Email</p>
              <input 
              {...register("email")}
              className={cx('loginInput', {wrongValue: errors.email})}
              placeholder={`enter your email...`}
              />
              <div className={s.error}>
                {errors.email?.message}
              </div>
            </label>

            <label className={s.loginLabel}>
              <p>Password</p>
              <input 
              {...register("password")}
              className={cx('loginInput', {wrongValue: errors.password})}
              type={`password`} 
              placeholder={`enter your password...`}
              />
              <div className={s.error}>
                {errors.password?.message}
              </div>
            </label>

          </div>
          <button 
            className={s.sendBtn}
            type={`submit`}
            >Login
          </button>
        </form>
        <div>
          Have not account? <Link to='/register' className={s.regLink}>Register</Link>
        </div>
      </div>
    </>
  );
}

export default Login;