import React, { useState } from "react";
import logo from "./logo.svg";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./Components/Login";
import Registo from "./Components/Registo";
import Home from "./Components/Home";
import Noticias from "./Components/Noticias";
import Solitario from "./Components/Solitario";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {
  auth,
  logInWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithGoogle,
  logout,
} from "./Components/firebase";
import JogoGalo from "./Components/JogoGalo";

function App() {
  var [user_normal, setuser_normal] = useState("");
  var [isSignedIn, setisSignedIn] = useState(false);

  auth.onAuthStateChanged((user) => {
    if (user) {
      setuser_normal(user);
      setisSignedIn(true);
    }
  });

  if (isSignedIn) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/noticias" element={<Noticias />} />
          <Route path="/solitario" element={<Solitario />} />
          <Route path="/jogogalo" element={<JogoGalo />} />
        </Routes>
      </BrowserRouter>
    );
  } else {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Login />} />
          <Route path="/" element={<Login />} />
          <Route path="/registar" element={<Registo />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
