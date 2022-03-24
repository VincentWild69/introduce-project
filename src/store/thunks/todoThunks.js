import axios from "axios";
import { loadingFalse, loadingTrue, setError } from "../slices/authSlice";
import { fillTodoList, setTodoError } from "../slices/todosSlice";
import { createAxiosError } from './../../util/createAxiosError';

export const setTodoList = (id) => (dispatch) => {
  dispatch(loadingTrue());
  console.log('get')
    axios
      .get(`https://json.extendsclass.com/bin/${id}`)
      .then(res => {if (res) {
        console.log(res.data)
          dispatch(fillTodoList(res.data?.todoList || []));
          dispatch(loadingFalse());
      }})
      .catch( error => {
        createAxiosError(error, 'Cant fetch todo list', setTodoError, dispatch);
        dispatch(loadingFalse());
      });
}

export const updTodoList = (id, payload) => (dispatch) => {
    axios
    .patch(`https://json.extendsclass.com/bin/${id}`, payload)
      .then(res => {if (res) {
        console.log('patch')
        console.log(JSON.parse(res.data.data))
      }})
      .catch( error => {
        createAxiosError(error, 'Cant update todo-list on server', setError, dispatch);
      });
}