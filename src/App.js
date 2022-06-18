import React, { useState } from 'react';
import logo from './logo.svg';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Login from './Components/Login';
import Registo from './Components/Registo';
import Home from './Components/Home';
import Noticias from './Components/Noticias';

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithEmailAndPassword, signInWithGoogle, logout } from "./Components/firebase";


function App() {

  var [user_normal, setuser_normal] = useState("");
  var [isSignedIn, setisSignedIn] = useState(false);


  auth.onAuthStateChanged((user) => {

    if (user) {

      setuser_normal(user)
      setisSignedIn(true)

    }
  })

  if (isSignedIn) {
    return (

      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/home" />}
          />
          <Route path="/registar" element={<Registo />} />
          <Route path="/home" element={<Home />} />
          <Route path="/noticias" element={<Noticias />} />
        </Routes>

      </BrowserRouter>
    );
  } else {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/registar" element={<Registo />} />
        </Routes>
      </BrowserRouter>
    );
  }


}

export default App;
