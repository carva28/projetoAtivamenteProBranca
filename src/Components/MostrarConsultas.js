import React, { Component } from "react";
import {
  Row,
  Button,
  Container,
  Col,
  Form,
  FormControl,
} from "react-bootstrap";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import Navbar from "../Containers/Navbar_platform_admin";
import { getDatabase, ref, set, onValue } from "firebase/database";
import Navbar_platform_admin from "../Containers/Navbar_platform_admin";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
const firebase = require("./firebase");

const firebaseConfig = {
  apiKey: "AIzaSyDPwM0HTu_Xa52irgMjUbWbfczplh_JO48",
  authDomain: "ativamenteprobranca.firebaseapp.com",
  projectId: "ativamenteprobranca",
  storageBucket: "ativamenteprobranca.appspot.com",
  messagingSenderId: "147788951852",
  appId: "1:147788951852:web:d019da8a750c193d4afc89",
  measurementId: "G-T350E5L1GS",
  databaseURL:
    "https://ativamenteprobranca-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
var listItems;

export default function MostrarConsultas() {
  const navigate = useNavigate();

  const [uuid, setuuid] = useState(auth.currentUser.reloadUserInfo.localId);
  const [email, setemail] = useState(auth.currentUser.reloadUserInfo.email);
  const [dados, setdados] = useState([]);
  const [datas, setdatas] = useState([]);
  const [variavel, setvariavel] = useState([]);
  var [estado, setEstado] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      if (estado) {
        tryFetch();
        setEstado(false);
      }
    }, 1000);
  });

  function tryFetch() {
    const db = getDatabase();
    const starCountRef = ref(db, `Newdata_${uuid}/consultas`);
    onValue(starCountRef, (snapshot) => {
      var data = snapshot.val();
      setdados(data);
      setdatas(Object.values(snapshot.val()));

      console.log(Object.values(snapshot.val()));
    });

    const starCountRef2 = ref(db, `Newdata_${uuid}/variaveis`);
    onValue(starCountRef2, (snapshot) => {
      var data = snapshot.val();
      setvariavel(data.var_consulta);
      console.log(data.var_consulta);
    });
  }

  function toComponentB(dataConsulta, horaConsulta, nome) {
    navigate("/userconsultaespec", {
      state: {
        dataConsulta: dataConsulta,
        horaConsulta: horaConsulta,
        nome: nome,
        id_consulta: variavel,
      },
    });
  }

  if (datas.length > 0) {
    // console.log(this.state.datas)
    listItems = datas.map((data, i) => (
      <Col className="contact" key={i}>
        <h3> Consulta de {data.contacto_Nome} </h3>
        <p className="white">{data.data_consulta}</p>
        <p className="white">{data.time_consulta}</p>
        <Button
          className="btnFillWhite"
          onClick={() =>
            toComponentB(
              data.data_consulta,
              data.time_consulta,
              data.contacto_Nome,
              i + 1
            )
          }
        >
          {" "}
          Editar consulta{" "}
        </Button>
      </Col>
    ));
  }

  return (
    <div className="frame">
      <Row>
        <Col xs={8}>
          <h1 className="green">Consultas adicionadas</h1>

          <p className="blue paragraphInfo">
            Veja as consultas adicionadas ao utilizador{" "}
            {auth.currentUser.reloadUserInfo.email} e edite-as se necessário.
          </p>
        </Col>
      </Row>

      <Row>
        <Link to="/adicionarconsulta">
          <Button className="btnCenter btnFillGreen">
            Adicionar nova consulta
          </Button>
        </Link>
      </Row>

      <Row className="contacts">
        {
          listItems
          /* dados.map((fruit) => ) */
        }
      </Row>

      <Navbar_platform_admin ativo={"mostrarconsultas"} />
    </div>
  );
}
