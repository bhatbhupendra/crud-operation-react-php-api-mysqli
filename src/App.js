import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route, Link  } from 'react-router-dom';
import ListUser from './Components/ListUser';
import CreateUser from './Components/CreateUser';
import EditUser from './Components/EditUser';

function App() {
  return (
    <div className="App">
      <h5>React CRUD operations using PHP API and mysql</h5>
    <BrowserRouter>
      <nav>
        <ul>
          <li>
            <Link to='/'>List User</Link>
          </li>
            <Link to ='user/create'>Create User</Link>
          <li>

          </li>
        </ul>
      </nav>
    <Routes>
      <Route index element={<ListUser />}/>
      <Route path="user/create" element={<CreateUser/>}/>
      <Route path="user/:id/edit" element={<EditUser/>}/>
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
