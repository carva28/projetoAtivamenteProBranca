import React, { Component } from "react";
import { Row, Button, Col, Form } from "react-bootstrap";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
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
export default class AdicionarContactos extends Component {
  //consultas e contactos

  constructor(props) {
    super(props);

    this.state = {
      uuid: auth.currentUser.reloadUserInfo.localId,
      email: auth.currentUser.reloadUserInfo.email,
      contacto_telPesso: "",
      contacto_Nome: "",
      variavel_contactos: 0,
      dados: [],
      display_feedback: "none",
    };
    this.inputDataNumber = this.inputDataNumber.bind(this);
    this.inputName = this.inputName.bind(this);
  }

  getVariavelContactos = () => {
    const db = getDatabase();
    const starCountRef = ref(
      db,
      `Newdata_${this.state.uuid}/variaveis_contact`
    );
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      this.setState({
        variavel_contactos: data.var_contact,
      });
      console.log(data);
    });
  };

  componentDidMount() {
    this.getVariavelContactos();
  }

  submitData = (event) => {
    if (this.state.contacto_telPesso != "" && this.state.contacto_Nome != "") {
      const db = getDatabase();
      set(
        ref(
          db,
          `Newdata_${this.state.uuid}/contactos/contacto_Contacto_${
            this.state.variavel_contactos + 1
          }`
        ),
        {
          contacto_telPesso: this.state.contacto_telPesso,
          contacto_Nome: this.state.contacto_Nome,
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
        set(ref(db, `Newdata_${this.state.uuid}/variaveis_contact`), {
          var_contact: this.state.variavel_contactos + 1,
        }).catch((error) => console.log(error));
        console.log("DATA SAVED__2");
      }, 5000);
    }
  };

  inputName = (event) => {
    this.setState({ contacto_Nome: event.target.value });
  };

  inputDataNumber = (event) => {
    this.setState({ contacto_telPesso: event.target.value });
  };

  render() {
    return (
      <div className="frame">
        <Row>
          <Col xs={8}>
            <h1 className="green">Adicionar novo contacto</h1>

            <p className="blue paragraphInfo">
              Nas caixas abaixo, insira as informações para adicionar um novo contacto à conta do utilizador{" "}
              <span className="darkgreen"> {this.state.email}</span>.
            </p>
          </Col>
        </Row>

        <Row>
          <Form.Label id="label_p" className="green">
            Nome do contacto telefónico
          </Form.Label>

          <Form.Control
            type="text"
            placeholder="Introduza o nome do contacto a guardar"
            className="blue"
            onChange={this.inputName}
          />

          <Form.Label id="label_p" className="green">
            Número do contacto telefónico
          </Form.Label>

          <Form.Control
            type="number"
            onChange={this.inputDataNumber}
            placeholder="Escreva o contacto telefónico"
            className="blue"
          />

          {/* Mensagem sucesso */}
          <Row>
            <p
              id="timer_Feedback"
              style={{ display: this.state.display_feedback }}
              className="green"
            >
              Dados guardados com sucesso
            </p>
          </Row>
          {/* Mensagem sucesso */}

          <Row className="alignBtns">
            <Button
              className="btnFill"
              id="register_btn"
              onClick={this.submitData}
            >
              Registar Contacto
            </Button>
          </Row>

          {/* <Link to="/mostrarcontactos">
              <Button className="btnFill" id="register_btn">
                Consultar contactos
              </Button>
            </Link> */}

          {/* <button onClick={this.getUserData} >Mostrar dados </button> */}
        </Row>

        <Navbar_platform_admin ativo={"adicionarinformacoes"} />
      </div>
    );
  }
}
