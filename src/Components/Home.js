import React, { Component } from "react";
import { Row, Col, Button } from "react-bootstrap";
import Navbar from "../Containers/Navbar";
import { auth } from "./firebase";
import emergency from "../images/icons/emergencia.png";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <div className="frame" id="home">
          <h1 className="green">
            Bem-vindo <span className="blue">{auth.currentUser.email}</span>
          </h1>

          <p>
            No painel abaixo veja as suas próximas consultas e os seus contactos
            mais recentes.
            <br />
            Do lado direito pode consultar páginas específicas.
          </p>

          <Button className="btnBorderRed blue" id="emergency">
            <img src={emergency} alt="ícone de telefone" />
            Emergência
          </Button>

          <Button className="btnInfo blue">i</Button>
        </div>

        <Navbar />
      </div>
    );
  }
}
