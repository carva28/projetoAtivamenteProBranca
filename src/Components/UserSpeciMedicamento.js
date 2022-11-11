import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

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
import { getDatabase, ref, set, onValue, update } from "firebase/database";
import Navbar_platform_admin from "../Containers/Navbar_platform_admin";

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
const db = getFirestore(app);
const db_v2 = getDatabase(app);
export default function UserSpeciMedicamento() {
  const location = useLocation();

  const [uuid, setuuid] = useState(auth.currentUser.reloadUserInfo.localId);
  const [email, setemail] = useState(auth.currentUser.reloadUserInfo.email);
  const [medicamento, setmedicamen] = useState(location.state.medicamen);
  const [alturamedicar, setalturamedicar] = useState(
    location.state.altura_Tomar
  );
  var [estado, setEstado] = useState(true);
  var [displaySate, setdisplaySate] = useState("none");
  const [variavel, setvariavel] = useState(location.state.id_medicamento);

  function inputName(event) {
    setmedicamen(event.target.value);
  }

  function inputDataNumber(event) {
    setalturamedicar(event.target.value);
  }

  function updateData_Fire() {
    if (medicamento != "" && alturamedicar != "") {
      const db = getDatabase();
      set(ref(db, `Newdata_${uuid}/medicamentos/medicamento_${variavel}`), {
        medicamento: medicamento,
        momento_tomar: alturamedicar,
      }).catch((error) => console.log(error));
      console.log("DATA SAVED");

      setdisplaySate("block");
      var timer = setTimeout(() => {
        setdisplaySate("none");
        toContactos();
      }, 3000);
    }
  }

  const navigate = useNavigate();

  const toContactos = () => {
    navigate("/mostrarmedicamentos");
  };

  console.log(alturamedicar);

  return (
    <div className="frame">
      <Row>
        <h1 className="green">Editar medicamento</h1>

        <p className="blue paragraphInfo">
          Nas caixas abaixo, atualize o medicamento do utilizador{" "}
          <span className="darkgreen"> {email}</span>.
        </p>

        <Form.Label id="label_p" className="green">
          Quantidade/dose de toma + Medicamento
        </Form.Label>

        <Form.Control
          type="text"
          value={medicamento}
          placeholder="(ex.: 1 comprimido de Brufen)"
          className="blue"
          onChange={inputName}
        />

        <Form.Label id="label_p" className="green" value="tessx">
          Momento da toma
        </Form.Label>

        <Form.Control
          type="text"
          placeholder="(ex.: Ao almoço/ Antes de jantar/ De tarde)"
          value={alturamedicar}
          onChange={inputDataNumber}
          className="blue"
        />

        <p
          id="timer_Feedback"
          className="green"
          style={{ display: displaySate }}
        >
          Dados guardados com sucesso
        </p>

        <Row className="alignBtns">
          <Button
            className="btnFill"
            id="register_btn"
            onClick={updateData_Fire}
          >
            Atualizar medicamento
          </Button>
        </Row>
      </Row>

      <Navbar_platform_admin ativo={"adicionarmedicamentos"} />
    </div>
  );
}
