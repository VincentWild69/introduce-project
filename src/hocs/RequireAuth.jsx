import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';


const RequireAuth = ({children}) => {

  const isAuth = useSelector(state => state.auth.isAuth);
  const location = useLocation();

  if (!isAuth) {
    return <Navigate to='/login' state={{from: location}} />
  }

  return children;
}

export default RequireAuth;