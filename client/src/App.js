import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from "react";
import LogIn from './Components.js/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './Components.js/Register';
import Home from './Components.js/Home';

function App() {
  
  const [ismember, setIsmember] = useState("")

  useEffect(() => {
    fetch("/user")
    .then((response) => {
      if (response.ok){
        response.json()
        .then((user) => setIsmember(user))
      }
    })
  },[])

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>

          <Route path='/' element={<SignUp />}/>
          <Route path='/login' element={<LogIn onLogIn={setIsmember} />}/>
          <Route path='/home' element={<Home user={ismember}/>}/>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
