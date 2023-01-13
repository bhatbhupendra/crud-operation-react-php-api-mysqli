import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const CreateUser = () => {
    const [inputs,setInputs] = useState([]);
    const navigate = useNavigate();

    const handelChange = (e) => {
      const {name, value} = e.target;
        // const name = e.target.name;
        // const value = e.target.value;
        setInputs(values => ({...values, [name]:value }));
    }

    const handelSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:80/api/user/save',inputs).then(function(response){
            navigate('/');
        });
    }
  return (
    <div>
      <h2>Create User</h2>
      <form onSubmit={handelSubmit}>
        <label>Name:</label><br/>
        <input type="text" name='name' onChange={handelChange}></input><br/>

        <label>Email:</label><br/>
        <input type="text" name='email' onChange={handelChange}></input><br/>

        <label>Mobial:</label><br/>
        <input type="text" name='mobile' onChange={handelChange}></input><br/>
        <button>Save</button>

      </form>
    </div>
  )
}

export default CreateUser
