import s from './AdminTools.module.css';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { setUsers } from "../../store/slices/authSlice";
import { getUsersList } from "../../store/thunks/authThunks";
import { mainBin } from "../../constants";
import { apiKey } from './../../constants';
import { useState } from 'react';



const AdminTools = () => {

  const dispatch = useDispatch();
  const users = useSelector(state => state.auth.users);
  const error = useSelector(state => state.auth.error.message);
  
  let [d, setD] = useState(null);
  let [er, setEr] = useState(null);


  const patch = () => {
    axios
      .patch(`https://json.extendsclass.com/bin/c3fd89a9b063`, {
          "users": ['e34uuu', 'rrr', 'f09'],
      })
      .then((res) => {console.log(res.data); return res.data.data})
      .catch( error => {
        if (error.response) {
          setEr(`Error ${error.response.status}: ${error.response.data.message}`);
        } else {console.log(error.message)}
      })
      .then( res => {setD(JSON.parse(res));
        getUsersList()
      });
  };

  const show = () => {
    axios
      .get(`https://json.extendsclass.com/bin/${mainBin}`)
      .then((res) => console.log(res.data));
  };


  const create = () => {
    axios.post(`https://json.extendsclass.com/bin`, {"d": "ff"}, {headers: {"Api-key": "310a6b49-8b17-11ec-b95c-0242ac110002"}})
      .then((res) => console.log(res));
  };

  const deleteP = () => {
    axios.delete(`https://json.extendsclass.com/bin/6c4ea3ee69a1`)
      .then((res) => console.log(res));
  };

  const getUsers = () => {
    dispatch(getUsersList())
  }



  return (
      <div>
          <button onClick={create}>create</button>
          <button onClick={patch}>patch</button>
          <button onClick={getUsers}>getUsers</button>
          <button onClick={show}>show</button>
          <button onClick={deleteP}>delete</button>
          <button onClick={() => console.log(d, ':', typeof d)}>console</button>
          <button onClick={() => console.log(users)}>users</button>

          {/* {d && <div>{d?.todos[0]?.id}</div>} */}
          {er && <div>{er}</div>}
          {error && <div>{error}</div>}
      </div>
  );
}

export default AdminTools;