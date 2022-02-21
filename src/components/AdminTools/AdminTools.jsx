import s from './AdminTools.module.css';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { getUsersList, updateUsersBin } from "../../store/thunks/authThunks";
import { mainBin } from "../../constants";
import { apiKey } from './../../constants';
import { useState } from 'react';
import { storage } from './../../util/storage';



const AdminTools = () => {

  const dispatch = useDispatch();
  const users = useSelector(state => state.auth.users);
  const cu = useSelector(state => state.auth.currentUser);
  const error = useSelector(state => state.auth.error.message);
  
  const getAll = () => {
    axios.get(`https://json.extendsclass.com/bins`, {headers: {"Api-key": apiKey}})
      .then((res) => console.log(res.data));
  }

  const deleteBin = () => {
    axios.delete(`https://json.extendsclass.com/bin/e74d0d692074`)
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

  const us = ['6e9baf131f83', 'a4d431918b95', 'bb08408770e2', 'c422400408fa', '4998bc2936be']
  let result = [];

  const fill = () => {

    us.forEach(e=> {
      axios
      .get(`https://json.extendsclass.com/bin/${e}`)
      .then((res) => result.push(res.data))
    })
  }


  const patchBin = () => {
    axios
      .patch(`https://json.extendsclass.com/bin/2df`, {
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

  const showLS = () => {
    console.log(localStorage)
    // console.log(storage.getItem('curUser'))
    // localStorage.removeItem('curUser')
  }

  return (
      <div className={s.admContainer}>
          <button onClick={getAll}>getAll</button>
          <button onClick={createBin}>createBin</button>
          <button onClick={deleteBin}>deleteBin</button>
          <button onClick={patchBin}>patchBin</button>
          <button onClick={getUsers}>getUsers</button>
          <button onClick={show}>showBin</button>
          <button onClick={() =>         axios
        .patch(`https://json.extendsclass.com/bin/${mainBin}`, {
          "users": result
      })}>upd</button>
          <button onClick={() => console.log(cu)}>showCU</button>


          <button onClick={() => console.log(users)}>show users store</button>
          <button onClick={showLS}>localStorage</button>
          <button onClick={fill}>R</button>


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