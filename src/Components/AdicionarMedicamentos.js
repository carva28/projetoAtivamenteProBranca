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
import { Link } from "react-router-dom";
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
export default class AdicionarMedicamentos extends Component {
  //consultas e contactos

  constructor(props) {
    super(props);

    this.state = {
      uuid: auth.currentUser.reloadUserInfo.localId,
      email: auth.currentUser.reloadUserInfo.email,
      medicamento: "",
      momento_tomar: "",
      variavel_Med: 0,
      dados: [],
      display_feedback: "none",
    };
    this.inputDataNumber = this.inputDataNumber.bind(this);
    this.inputName = this.inputName.bind(this);
  }

  getVariavelContactos = () => {
    const db = getDatabase();
    const starCountRef = ref(db, `Newdata_${this.state.uuid}/variavel_Med`);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      this.setState({
        variavel_Med: data.variavel_medicame,
      });
      console.log(data);
    });
  };

  componentDidMount() {
    this.getVariavelContactos();
  }

  submitData = (event) => {
    if (this.state.medicamento != "" && this.state.momento_tomar != "") {
      const db = getDatabase();
      set(
        ref(
          db,
          `Newdata_${this.state.uuid}/medicamentos/medicamento_${
            this.state.variavel_Med + 1
          }`
        ),
        {
          medicamento: this.state.medicamento,
          momento_tomar: this.state.momento_tomar,
        }
      ).catch((error) => console.log(error));
      console.log("DATA SAVED");

      this.setState({
        display_feedback: "block",
      });
      this.timer = setTimeout(() => {
        this.setState({
          display_feedback: "none",
        });

        //Atualizar variável do USER
        const db = getDatabase();
        set(ref(db, `Newdata_${this.state.uuid}/variavel_Med`), {
          variavel_medicame: this.state.variavel_Med + 1,
        }).catch((error) => console.log(error));
        console.log("DATA SAVED__2");
      }, 5000);
    }
  };

  inputName = (event) => {
    this.setState({ medicamento: event.target.value });
  };

  inputDataNumber = (event) => {
    this.setState({ momento_tomar: event.target.value });
  };

  render() {
    return (
      <div className="frame">
        <Row>
          <Col xs={8}>
            <h1 className="green">Adicionar novo contacto</h1>

            <p className="blue paragraphInfo">
              Nas caixas abaixo, insira as informações para adicionar um novo
              medicamento à conta do utilizador{" "}
              <span className="darkgreen"> {this.state.email}</span>.
            </p>
          </Col>
        </Row>

        <Row>
          <Form.Label id="label_p" className="green">
            Nome do medicamento e quantidade/dose de toma
          </Form.Label>

          <Form.Control
            type="text"
            placeholder="Introduza o nome do medicamento e dose"
            className="blue"
            onChange={this.inputName}
          />

          <Form.Label id="label_p" className="green">
            Refeições
          </Form.Label>

          <Form.Control
            type="text"
            onChange={this.inputDataNumber}
            placeholder="Escreva o momento da toma do medicamento"
            className="blue"
          />

          <p
            id="timer_Feedback"
            style={{ display: this.state.display_feedback }}
          >
            Dados guardados com sucesso
          </p>

          <Row className="alignBtns">
            <Button
              className="btnFill"
              id="register_btn"
              onClick={this.submitData}
            >
              Registar Medicamento
            </Button>
          </Row>
          {/* <Link to="/mostrarmedicamentos">
            <Button className="btnFill" id="register_btn">
              Consultar medicamentos
            </Button>
          </Link> */}
        </Row>

        {/* <button onClick={this.getUserData} >Mostrar dados </button> */}

        <Navbar_platform_admin ativo={"adicionarmedicamentos"} />
      </div>
    );
  }
}
