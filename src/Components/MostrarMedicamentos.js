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
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";
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

export default function MostrarMedicamentos() {
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
    const starCountRef = ref(db, `Newdata_${uuid}/medicamentos`);
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

    const starCountRef2 = ref(db, `Newdata_${uuid}/variavel_Med`);
    onValue(starCountRef2, (snapshot) => {
      var data = snapshot.val();
      setvariavel(data.variavel_medicame);
      //console.log(data.variavel_medicame);
    });
  }

  function toComponentB(medicamen, quandoTomar, variavel) {
    //console.log("var: " + variavel);
    navigate("/usermedicarespec", {
      state: {
        medicamen: medicamen,
        altura_Tomar: quandoTomar,
        id_medicamento: variavel,
      },
    });
  }

  if (datas.length > 0) {
    // console.log(this.state.datas)
    listItems = datas.map((data, i) => (
      <Col xs={6} className="medicamento" key={i}>
        <h3> {data.medicamento} </h3>
        <p className="white">{data.momento_tomar}</p>
        <Button
          className="btnFillWhite"
          onClick={() =>
            toComponentB(data.medicamento, data.momento_tomar, i + 1)
          }
        >
          {" "}
          Editar medicamento{" "}
        </Button>
      </Col>
    ));
  }

  return (
    <div className="frame">
      <Row>
        <h1 className="green">Medicamentos</h1>

        <p className="blue paragraphInfo">
          Veja os medicamentos adicionados ao utilizador{" "}
          {auth.currentUser.reloadUserInfo.email} e edite-os se necessário.
        </p>
      </Row>

      <Row>
        <Link to="/adicionarmedicamentos">
          <Button className="btnCenter btnFillGreen">
            Adicionar novo medicamento
          </Button>
        </Link>
      </Row>

      <Row className="medicamentos">{listItems}</Row>
      <Navbar_platform_admin ativo={"mostrarmedicamentos"} />
    </div>
  );
}
