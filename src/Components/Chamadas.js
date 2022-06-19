import React, { Component } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
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

              <p className="blue paragraphInfo">Chamadas aqui</p>
            </Col>

            <Col xs={4} className="btnsAjuda">
              <Button className="btnInfo blue">i</Button>

              <Button className="btnBorderRed blue" id="emergency">
                <img src={emergency} alt="ícone de telefone" />
                Emergência
              </Button>
            </Col>
          </Row>

          <Navbar ativo={"chamadas"} />
        </div>
      </div>
    );
  }
}
