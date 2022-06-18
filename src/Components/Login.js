import { signOut } from "firebase/auth";
import React, { Component } from "react";
import {
  Row,
  Button,
  Container,
  Col,
  Form,
  FormControl,
} from "react-bootstrap";
import {
  auth,
  logInWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithGoogle,
  logout,
} from "./firebase";
import image_main from "../images/characters/login_character.png";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      count: 0,
      email: "",
      password: "",
      apresentarNome: "",
    };
  }

  login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        this.state.email,
        this.state.password
      );
      console.log(user);
    } catch (error) {
      console.log("Register \n" + error);
    }
  };

  logout = async () => {
    await logout(auth);
  };

  render() {
    return (
      <Row>
        <Col xs={{ order: 1 }} id="bgMain">
          <img src={image_main} />

          <h1 className="mainComponents white">Bem-vindo!</h1>
          <p className="mainComponents white">
            Ligue aos seus amigos e familiares, veja vídeos que gosta e esteja a
            par do que os seus amigos andam a fazer!
          </p>
        </Col>

        <Col xs={{ order: 1 }} id="noBgMain">
          <Row>
            <h1 className="green">Ativ@mente</h1>
            <p className="blue">
              Nas caixas abaixo, insira os dados que lhe foram dados pela
              ProBranca.
            </p>

            <Form.Label id="label_p" className="green">
              Endereço de email
            </Form.Label>

            <Form.Control
              type="email"
              value={this.state.email}
              onChange={(e) => this.setState({ email: e.target.value })}
              placeholder="Clique aqui para escrever o seu email"
              className="blue"
            />

            <Form.Label id="label_p" className="green">
              Palavra-passe{" "}
            </Form.Label>

            <Form.Control
              type="password"
              value={this.state.password}
              onChange={(e) => this.setState({ password: e.target.value })}
              placeholder="Clique aqui para escrever a sua palavra-passe"
              className="blue"
            />

            <Row className="alignBtns">
              <Button className="btnFill" onClick={this.login}>
                Entrar
              </Button>
            </Row>

            {/* <Row className="alignBtns">
              <Button className="btnFill" onClick={this.logout}>
                Sair da conta
              </Button>
            </Row> */}
          </Row>

          <Row id="infoHelp">
            <Col>
              <h3>Precisa de ajuda?</h3>
              <p>Se precisar de ajuda, clique no botão ao lado direito.</p>
            </Col>

            <Col>
              <Button className="btnBorderRed">Ajuda</Button>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default Login;
