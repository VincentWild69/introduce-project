import { setError, setUsers } from "../slices/authSlice"
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
      .then((res) => console.log(res))
      .catch( error => {
        if (error.response) {
          dispatch(setError(`Cant create user. Error ${error.response.status}: ${error.response.data.message}`));
        } else {dispatch(setError(error.message))}
      });
}