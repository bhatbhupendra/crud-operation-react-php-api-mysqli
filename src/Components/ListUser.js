import axios from 'axios'
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link  } from 'react-router-dom';

const ListUser = () => {
    // const [users, setUsers] = useState({}); this is in video but this dosent work
    const [users, setUsers] = useState([]);

    useEffect(()=>{
        getUsers();
    },[]);

    function getUsers(){
        axios.get('http://localhost:80/api/user/').then(function(response){
            // console.log(response.data);
            // console.log(setUsers(response.data));
            setUsers(response.data);
            // console.log(users);
            
        });
    }

    const deleteUser = (id) => {
        axios.delete(`http://localhost:80/api/user/${id}/delete`).then(function(response){
            console.log(response.data);
            getUsers();
        })
    }
  return (
    <div>
      <h3>List User</h3>
      <div className='list-user'>

      <table>
            <thead>
                <tr>
                    <th>id</th>
                    <th>name</th>
                    <th>email</th>
                    <th>moblie</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user,key) =>
                        <tr key={key}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.mobile}</td>
                            <td>
                                <button>
                                    <Link to={`user/${user.id}/edit`}>Edit</Link>
                                </button>
                                <button onClick={()=>deleteUser(user.id)}>Delete</button>
                            </td>
                        </tr>
                    
                )}
            </tbody>
      </table>
      </div>
    </div>
  )
}

export default ListUser
