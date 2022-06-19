import React, { Component } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import Navbar from "../Containers/Navbar";
import emergency from "../images/icons/emergencia.png";

export default class Chamadas extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <div className="frame" id="chamadas">
          <Row>
            <Col xs={8}>
              <h1 className="green">Chamadas</h1>

              <p className="blue paragraphInfo">
                Pode ligar para qualquer um dos contactos abaixo, basta clicar
                no nome da pessoa que pretende contactar.
              </p>
            </Col>

            <Col xs={4} className="btnsAjuda">
              <Button className="btnInfo blue">i</Button>

              <Button className="btnBorderRed blue" id="emergency">
                <img src={emergency} alt="ícone de telefone" />
                Emergência
              </Button>
            </Col>
          </Row>

          <Row>
            <Form.Control
              type="text"
              placeholder="Pesquise pelo nome da pessoa a quem pretende ligar"
              id="searchContact"
            />

            <Row className="contacts">
              <Col className="contact">
                <h3>Pessoa 1</h3>
                <p className="white">Filho</p>
              </Col>
              <Col className="contact">
                <h3>Pessoa 2</h3>
                <p className="white">Filho</p>
              </Col>
              <Col className="contact">
                <h3>Pessoa 3</h3>
                <p className="white">Filho</p>
              </Col>
            </Row>

            <Row className="contacts">
              <Col className="contact">
                <h3>Pessoa 4</h3>
                <p className="white">Filho</p>
              </Col>
              <Col className="contact">
                <h3>Pessoa 5</h3>
                <p className="white">Filho</p>
              </Col>
              <Col className="contact">
                <h3>Pessoa 6</h3>
                <p className="white">Filho</p>
              </Col>
            </Row>
          </Row>

          <Navbar ativo={"chamadas"} />
        </div>
      </div>
    );
  }
}
