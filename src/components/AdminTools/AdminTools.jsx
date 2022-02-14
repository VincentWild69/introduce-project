import s from './AdminTools.module.css';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { getUsersList, updateUsersBin } from "../../store/thunks/authThunks";
import { mainBin } from "../../constants";
import { apiKey } from './../../constants';
import { useState } from 'react';



const AdminTools = () => {

  const dispatch = useDispatch();
  const users = useSelector(state => state.auth.users);
  const error = useSelector(state => state.auth.error.message);
  
  const getAll = () => {
    axios.get(`https://json.extendsclass.com/bins`, {headers: {"Api-key": apiKey}})
      .then((res) => console.log(res.data));
  }

  const deleteBin = () => {
    axios.delete(`https://json.extendsclass.com/bin/84aa52cfec83`)
      .then((res) => console.log(res));
  };

  const userF = {
    id: 'dsfdsf4565',
    name: "Ivan",
    email: "vincentwild69@gmail.com",
    password: "123456"
  }

  const createBin = () => {
    axios.post(`https://json.extendsclass.com/bin`, userF, {headers: {"Api-key": "310a6b49-8b17-11ec-b95c-0242ac110002"}})
      .then((res) => console.log(res));
  }

  
  const show = () => {
    axios
      .get(`https://json.extendsclass.com/bin/${mainBin}`)
      .then((res) => console.log(res.data));
  };


  const getUsers = () => {
    dispatch(getUsersList())
  }

  const updUsers = (users) => {
    updateUsersBin(users)
  }


  const patchBin = () => {
    axios
      .patch(`https://json.extendsclass.com/bin/c3fd89a9b063`, {
          "users": [{
            id: 'dsfdsf4565',
            name: "Ivan",
            email: "vincentwild69@gmail.com",
            password: "123456"
          }, {
            id: 'dsfssdsf4565',
            name: "Pavlo",
            email: "vincentwild77@gmail.com",
            password: "123456"
          }],
      })
      .then((res) => {console.log(res.data); return res.data.data})
      .catch( error => {
        if (error.response) {
          console.log(`Error ${error.response.status}: ${error.response.data.message}`);
        } else {console.log(error.message)}
      })
      .then( res => {console.log(JSON.parse(res));
      });
  };

 

  return (
      <div className={s.admContainer}>
          <button onClick={getAll}>getAll</button>
          <button onClick={createBin}>createBin</button>
          <button onClick={deleteBin}>deleteBin</button>
          <button onClick={patchBin}>patchBin</button>
          <button onClick={getUsers}>getUsers</button>
          <button onClick={show}>showBin</button>
          <button onClick={() => updUsers(users)}>upd</button>


          <button onClick={() => console.log(users)}>show users store</button>


          <div className={s.content}>
            {users && users.length !==0 && users.map(user => (
              <div key={user.id}>{user.name}</div>
            ))}
            {error && <div>{error}</div>}
          </div>
      </div>
  );
}

export default AdminTools;