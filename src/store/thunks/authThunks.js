import { addUser, loadingFalse, loadingTrue, loginUser, logout, removeUserFromList, setAlert, setError, setUsers, updUserStore } from "../slices/authSlice"
import axios from "axios";
import { mainBin } from "../../constants";
import { apiKey } from './../../constants';
import { createAxiosError } from './../../util/createAxiosError';


export const getUsersList = () => (dispatch) => {
    dispatch(loadingTrue());
    axios
      .get(`https://json.extendsclass.com/bin/d${mainBin}`)
      .then(res => {if (res) {
          dispatch(setUsers(res.data.users));
          dispatch(loadingFalse());
      }})
      .catch( error => {
        createAxiosError(error, 'Cant fetch users', setError, dispatch);
        dispatch(loadingFalse());
      });
}

export const createUser = (payload) => (dispatch) => {
  dispatch(loadingTrue());
  axios
    .post(`https://json.extendsclass.com/bin`, payload, {headers: {"Api-key": apiKey}})
      .then((res) => {
        if (res) {
          const {name, email, password} = payload;
          dispatch(addUser({
            id: res.data.id,
            name,
            email,
            password
          }));
          return res.data.id
        }
      })
      .then(id => {
        axios
          .patch(`https://json.extendsclass.com/bin/${id}`, {
              "id": id
            })
          .then(res => {
            if (res) {
              const {id, name, email, password} = JSON.parse(res.data.data);
              dispatch(loginUser({id, name, email, password}));
              dispatch(loadingFalse());
            }
          })
      })
      .catch( error => {
        createAxiosError(error, 'Cant create user', setError, dispatch);
        dispatch(loadingFalse());
      });
}

export const updateUsersBin = (updUsers) => (dispatch) => {
  axios
    .patch(`https://json.extendsclass.com/bin/${mainBin}`, {
        "users": updUsers
      })
      .catch( error => {
        createAxiosError(error, 'Cant update users bin', setError, dispatch);
      });
}

export const loginThunk = (payload) => (dispatch) => {
  dispatch(loadingTrue());
  axios
  .get(`https://json.extendsclass.com/bin/${payload}`)
  .then(res => {if (res) {
      const userInfo = {...res.data};
      dispatch(loginUser(userInfo));
      dispatch(loadingFalse());
  }})
  .catch( error => {
    if (error.response) {
      dispatch(setError(`Cant login. Error ${error.response.status}: ${error.response.data.message}`));
      if (error.response.status.toString() === '404') {
        localStorage.removeItem('curUser')
      }
    } else {
      dispatch(setError(`Cant login. ${error}`));
    }
    dispatch(loadingFalse());
  });

}

export const deleteAccount = (payload) => (dispatch) => {
  dispatch(loadingTrue());
  axios
  .delete(`https://json.extendsclass.com/bin/${payload}`)
  .then(res => {if (res) {
      dispatch(logout());
      dispatch(removeUserFromList(payload));
      dispatch(loadingFalse());
  }})
  .catch( error => {
    createAxiosError(error, 'Cant delete user', setError, dispatch);
    dispatch(loadingFalse());
  });
}

export const updateUser = (id, payload) => (dispatch) => {
  dispatch(loadingTrue());
  axios
  .patch(`https://json.extendsclass.com/bin/${id}`, {...payload})
  .then( res => {
    if (res) {
      dispatch(updUserStore({id, payload}));
      dispatch(setAlert('Successfully modified!'));
      dispatch(loadingFalse());
    }
  })
  .catch( error => {
    createAxiosError(error, 'Cant update user', setError, dispatch);
    dispatch(loadingFalse());
  });
}
