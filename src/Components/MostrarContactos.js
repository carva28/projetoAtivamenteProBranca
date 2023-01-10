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
import Data_Extensa from "./Data_Extensa";
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

export default function MostrarContactos() {
  const navigate = useNavigate();

  const [uuid, setuuid] = useState(auth.currentUser.reloadUserInfo.localId);
  const [email, setemail] = useState(auth.currentUser.reloadUserInfo.email);
  const [dados, setdados] = useState([]);
  const [datas, setdatas] = useState([]);
  var [estado, setEstado] = useState(true);
  const [variavel, setvariavel] = useState([]);

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
    const starCountRef = ref(db, `Newdata_${uuid}/contactos`);
    onValue(starCountRef, (snapshot) => {
      var data = snapshot.val();

      // this.setState({
      //     dados: data,
      //     datas: Object.values(snapshot.val())
      // })

      setdados(data);
      setdatas(Object.values(snapshot.val()));
      //console.log(data);
    });

    const starCountRef2 = ref(db, `Newdata_${uuid}/variaveis_contact`);
    onValue(starCountRef2, (snapshot) => {
      var data = snapshot.val();
      console.log(data)
      setvariavel(data.var_contact);
      //console.log(data.var_contact);
    });
  }

  // sendProps = (nome_contacto) => {
  //     const navigate = useNavigate();
  //     console.log(nome_contacto)
  //     navigate('/utilizadores', { state: nome_contacto })

  // };

  function toComponentB(numeroTel, nome, numeroContact) {
    navigate("/userespec", {
      // state: { numeroTel: numeroTel, nome: nome, id_user_contact: variavel },
      state: { numeroTel: numeroTel, nome: nome, id_user_contact: numeroContact },
    });
  }

  if (datas.length > 0) {
    // console.log(this.state.datas)
    listItems = datas.map((data, i) =>   (
      <Col className="medicamento" xs={6} key={i}>
        <h3>{data.contacto_Nome}</h3>
        <p className="white">{data.contacto_telPesso}</p>
        <Button
          className="btnFillWhite"
          onClick={() =>
            toComponentB(data.contacto_telPesso, data.contacto_Nome, i + 1)
          }
        >
          {" "}
          Editar contacto{" "}
        </Button>
      </Col>
    ));
  } else {
    <p>Ainda não foram adicionados contactos.</p>;
  }

  return (
    <div className="frame">
      <Row>
        <h1 className="green">Contactos</h1>

        <p className="blue paragraphInfo">
          Veja os contactos adicionados ao utilizador{" "}
          <span className="darkgreen">
            {" "}
            {auth.currentUser.reloadUserInfo.email}
          </span>{" "}
          e edite-os se necessário.
        </p>
      </Row>

      <Row>
        <Link to="/adicionarinformacoes">
          <Button className="btnCenter btnFillGreen">
            Adicionar novo contacto
          </Button>
        </Link>
      </Row>

      <Row className="medicamentos">{listItems}</Row>

      <Navbar_platform_admin ativo={"mostrarcontactos"} />
    </div>
  );
}
