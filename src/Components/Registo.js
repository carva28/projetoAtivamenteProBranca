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
  createUserWithEmailAndPassword,
  signInWithGoogle,
} from "./firebase";
import image_main from "../images/characters/login_character.png";

class Registo extends React.Component {
  constructor() {
    super();
    this.state = {
      count: 0,
      email: "",
      password: "",
    };
  }

  register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        this.state.email,
        this.state.password
      );
      console.log(user);
    } catch (error) {
      console.log("Register \n" + error);
    }
  };

  login = async () => {};

  render() {
    return (
      <Row>
        <Col xs={{ order: 1 }} id="bgMain">
          <img src={image_main} />

          <h1 className="mainComponents white">Registo</h1>
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
              Primeiro e Último nome
            </Form.Label>

            <Form.Control
              type="text"
              value={this.state.email}
              onChange={(e) => this.setState({ name: e.target.value })}
              placeholder="Clique aqui para escrever o seu nome"
              className="blue"
            />

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
                Registar
              </Button>
            </Row>
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

export default Registo;
