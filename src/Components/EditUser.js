import React from 'react';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditUser = () => {
    const [inputs,setInputs] = useState([]);
    const navigate = useNavigate();

    const {id} = useParams();

    const handelChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({...values, [name]:value }));
    }

    useEffect(()=>{
        getUsers();
    },[]);

    function getUsers(){
        axios.get(`http://localhost:80/api/user/${id}`).then(function(response){
          setInputs(response.data);
        });
    }

    const handelSubmit = (e) => {
      e.preventDefault();
      axios.put(`http://localhost:80/api/user/${id}/edit`,inputs).then(function(response){
          navigate('/');
      });
  }

  return (
    <div>
      <h2>Edit User</h2>
      <form onSubmit={handelSubmit}>
        <label>Name:</label><br/>
        <input type="text" value={inputs.name} name='name' onChange={handelChange}></input><br/>

        <label>Email:</label><br/>
        <input type="text" value={inputs.email} name='email' onChange={handelChange}></input><br/>

        <label>Mobial:</label><br/>
        <input type="text" value={inputs.mobile} name='mobile' onChange={handelChange}></input><br/>
        <button>Save</button>

      </form>
    </div>
  )
}

export default EditUser
