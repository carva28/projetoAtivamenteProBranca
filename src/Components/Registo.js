import React from "react";
import { Row, Col, Form, Alert } from "react-bootstrap";
import { auth, createUserWithEmailAndPassword } from "./firebase";
import imgRegisto from "../images/characters/registo.svg";
import { Link } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, set, onValue } from "firebase/database";
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
let renderComponentButton;
class Registo extends React.Component {
  constructor() {
    super();

    this.state = {
      count: 0,
      name: "",
      email: "",
      password: "",
      showAlert: false,
    };
  }

  register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        this.state.email,
        this.state.password
      );

      //console.log(user);

      this.setState({
        showAlert: true,
      });
    } catch (error) {
      console.log("Register \n" + error);
    }
  };

  login = async () => {};

  render() {
    const showAlert = this.state.showAlert;

    return (
      <Row>
        <Col xs={{ order: 1 }} id="bgMain">
          <img src={imgRegisto} />

          <Row>
            <h1 className="mainComponents white">Registo</h1>
            <p className="mainComponents white">
              Efetue o registo de utente da ProBranca, preenchendo os campos apresentados.
            </p>
          </Row>
        </Col>

        <Col xs={{ order: 1 }} id="noBgMain">
          <Row>
            <h1 className="green">Ativ@mente</h1>
            <p className="blue">
              Nas caixas abaixo, insira os dados que lhe foram dados pela
              ProBranca.
            </p>

            <Alert
              color="success"
              style={{ display: showAlert ? "block" : "none" }}
            >
              Sucesso
            </Alert>

            <Form.Label id="label_p" className="green">
              Primeiro e Último nome
            </Form.Label>

            <Form.Control
              type="text"
              value={this.state.name}
              onChange={(e) => this.setState({ name: e.target.value })}
              placeholder="Clique aqui e escreva o seu nome"
              className="blue"
              required
            />

            <Form.Label id="label_p" className="green">
              Endereço de email
            </Form.Label>

            <Form.Control
              type="email"
              value={this.state.email}
              onChange={(e) => this.setState({ email: e.target.value })}
              placeholder="Clique aqui e escreva o seu email"
              className="blue"
              required
            />

            <Form.Label id="label_p" className="green">
              Palavra-passe{" "}
            </Form.Label>

            <Form.Control
              type="password"
              value={this.state.password}
              onChange={(e) => this.setState({ password: e.target.value })}
              placeholder="Clique aqui e escreva a sua palavra-passe"
              className="blue"
              required
            />

            <Row className="alignBtns">
              <Form.Control
                onClick={this.register}
                type="submit"
                value="Registar"
                className="btnFill"
              />
            </Row>

            <Row id="irParaReg">
              <p>
                Já tem conta? Inicie sessão
                <Link to="/" className="green">
                  aqui
                </Link>
                !
              </p>
            </Row>
          </Row>

          {/* <Row id="infoHelp">
            <Col>
              <h3>Precisa de ajuda?</h3>
              <p>Se precisar de ajuda, clique no botão ao lado direito.</p>
            </Col>

            <Col>
              <Button className="btnBorderRed">Ajuda</Button>
            </Col>
          </Row> */}
        </Col>
      </Row>
    );
  }
}

export default Registo;
