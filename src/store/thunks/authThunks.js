import { addUser, loginUser, setError, setUsers } from "../slices/authSlice"
import axios from "axios";
import { mainBin } from "../../constants";
import { apiKey } from './../../constants';


export const getUsersList = () => (dispatch) => {
    axios
      .get(`https://json.extendsclass.com/bin/${mainBin}`)
      .then(res => {if (res) {
          dispatch(setUsers(res.data.users))
      }})
      .catch( error => {
        if (error.response) {
          dispatch(setError(`Cant fetch users. Error ${error.response.status}: ${error.response.data.message}`));
        } else {dispatch(setError(error.message))}
      });
}

export const createUser = (payload) => (dispatch) => {
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
              const {id, name, email} = JSON.parse(res.data.data);
              dispatch(loginUser({id, name, email}))
            }
          })
      })
      .catch( error => {
        if (error.response) {
          dispatch(setError(`Cant create user. Error ${error.response.status}: ${error.response.data.message}`));
        } else {dispatch(setError(error.message))}
      });
}

export const updateUsersBin = (updUsers) => {
  axios
    .patch(`https://json.extendsclass.com/bin/${mainBin}`, {
        "users": updUsers
      })
      .catch( error => {
        if (error.response) {
          console.log(`Cant update user. Error ${error.response.status}: ${error.response.data.message}`);
        } else {console.log(error.message)}
      });
}

export const autoLogin = (payload) => (dispatch) => {
  axios
  .get(`https://json.extendsclass.com/bin/${payload}`)
  .then(res => {if (res) {
      const {id, name, email} = res.data;
      dispatch(loginUser({id, name, email}))
  }})
  .catch( error => {
    if (error.response) {
      dispatch(setError(`Cant login. Error ${error.response.status}: ${error.response.data.message}`));
    } else {dispatch(setError(error.message))}
  });

}