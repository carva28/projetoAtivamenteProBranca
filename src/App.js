import React, { useState } from "react";
import logo from "./logo.svg";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {
  auth,
  logInWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithGoogle,
  logout,
} from "./Components/firebase";
import Login from "./Components/Login";
import Registo from "./Components/Registo";
import Home from "./Components/Home";
import Chamadas from "./Components/Chamadas";
import Calendario from "./Components/Calendario";
import Solitario from "./Components/Solitario";
import JogoGalo from "./Components/JogoGalo";
import Jogos from "./Components/Jogos";
import AdicionarContactos from "./Components/AdicionarContactos";
import Video from "./Components/Video";
import MostrarContactos from "./Components/MostrarContactos";
import UserSpeciCont from "./Components/UserSpeciCont";
import AdicionarConsultas from "./Components/AdicionarConsultas";
import MostrarConsultas from "./Components/MostrarConsultas";
import UserSpeciConsulta from "./Components/UserSpeciConsulta";
import AdicionarMedicamentos from "./Components/AdicionarMedicamentos";
import MostrarMedicamentos from "./Components/MostrarMedicamentos";
import UserSpeciMedicamento from "./Components/UserSpeciMedicamento";

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
          <Route path="/chamadas" element={<Chamadas />} />
          <Route path="/calendario" element={<Calendario />} />
          <Route path="/videos" element={<Video />} />
          <Route path="/jogos" element={<Jogos />} />
          <Route path="/solitario" element={<Solitario />} />
          <Route path="/jogogalo" element={<JogoGalo />} />
          <Route path="/mostrarcontactos" element={<MostrarContactos />} />
          <Route path="/userespec" element={<UserSpeciCont />} />
          <Route path="/adicionarconsulta" element={<AdicionarConsultas />} />
          <Route path="/mostrarconsultas" element={<MostrarConsultas />} />
          <Route path="/userconsultaespec" element={<UserSpeciConsulta />} />
          <Route
            path="/adicionarmedicamentos"
            element={<AdicionarMedicamentos />}
          />
          <Route
            path="/mostrarmedicamentos"
            element={<MostrarMedicamentos />}
          />
          <Route path="/usermedicarespec" element={<UserSpeciMedicamento />} />

          <Route
            path="/adicionarinformacoes"
            element={<AdicionarContactos />}
          />
        </Routes>
      </BrowserRouter>
    );
  } else {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Login />} />
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registar" element={<Registo />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
