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
export default class AdicionarConsultas extends Component {
  //consultas e contactos

  constructor(props) {
    super(props);

    this.state = {
      uuid: auth.currentUser.reloadUserInfo.localId,
      email: auth.currentUser.reloadUserInfo.email,
      data_consulta: "",
      time_consulta: "",
      contacto_Nome: "",
      dados: [],
      variavel_consulta: "",
      display_feedback: "none",
    };
    this.inputDataNumber = this.inputDataNumber.bind(this);
    this.inputName = this.inputName.bind(this);
    this.inputTimeNumber = this.inputTimeNumber.bind(this);
  }

  getVariavelConsulta = () => {
    const db = getDatabase();
    const starCountRef = ref(db, `Newdata_${this.state.uuid}/variaveis`);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      this.setState({
        variavel_consulta: data.var_consulta,
      });
      console.log(data);
    });
  };

  componentDidMount() {
    this.getVariavelConsulta();
  }

  submitData = (event) => {
    if (this.state.data_consulta != "" && this.state.contacto_Nome != "") {
      const db = getDatabase();
      set(
        ref(
          db,
          `Newdata_${this.state.uuid}/consultas/consulta_ID_${
            this.state.variavel_consulta + 1
          }`
        ),
        {
          data_consulta: this.state.data_consulta,
          contacto_Nome: this.state.contacto_Nome,
          time_consulta: this.state.time_consulta,
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
        set(ref(db, `Newdata_${this.state.uuid}/variaveis`), {
          var_consulta: this.state.variavel_consulta + 1,
        }).catch((error) => console.log(error));
        console.log("DATA SAVED__2");
      }, 5000);
    }
  };

  inputName = (event) => {
    this.setState({ contacto_Nome: event.target.value });
  };

  inputDataNumber = (event) => {
    this.setState({ data_consulta: event.target.value });
  };

  inputTimeNumber = (event) => {
    this.setState({ time_consulta: event.target.value });
  };

  render() {
    return (
      <div className="frame">
        <Row>
          <Col xs={8}>
            <h1 className="green">Adicionar nova consulta</h1>

            <p className="blue paragraphInfo">
              Nas caixas abaixo, insira as informações para adicionar um nova
              consulta à conta do utilizador{" "}
              <span className="darkgreen"> {this.state.email}</span>.
            </p>
          </Col>
        </Row>

        <Form.Label id="label_p" className="green">
          Especialidade da consulta
        </Form.Label>

        <Form.Control
          type="text"
          placeholder="Introduza a especialidade da consulta"
          className="blue"
          onChange={this.inputName}
        />

        <Form.Label id="label_p" className="green">
          Data da consulta
        </Form.Label>

        <Form.Control
          type="date"
          onChange={this.inputDataNumber}
          placeholder="Introduza a data da consulta"
          className="blue"
        />

        <Form.Label id="label_p" className="green">
          Hora da consulta
        </Form.Label>

        <Form.Control
          type="time"
          onChange={this.inputTimeNumber}
          placeholder="Introduza a hora da consulta"
          className="blue"
        />

        <Row className="alignBtns">
          <Button
            className="btnFill"
            id="register_btn"
            onClick={this.submitData}
          >
            Registar consulta
          </Button>
        </Row>

        <p id="timer_Feedback" style={{ display: this.state.display_feedback }}>
          Dados guardados com sucesso
        </p>

        <Navbar_platform_admin ativo={"adicionarconsulta"} />
      </div>
    );
  }
}
