import React, { Component } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import Navbar from "../Containers/Navbar";
import emergency from "../images/icons/emergencia.png";
import consultas from "../images/characters/consultas.svg";
import medicamentos from "../images/characters/medicamentos.svg";
import consultasIcone from "../images/icons/consultas.svg";

export default class Calendario extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <div className="frame" id="calendario">
          <Row>
            <Col xs={8}>
              <h1 className="green">Calendário</h1>

              <p className="blue paragraphInfo">
                No painel abaixo veja as suas próximas consultas, os
                medicamentos que deve tomar e as suas consultas anteriores.
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

          <Row className="cards">
            <Card className="col-6 boxShadow">
              <h3 className="green">Próximas consultas:</h3>

              <Row>
                <Col xs={6}>
                  <p className="bold">29/06 às 14h30</p>
                  <p>Hospital de Aveiro</p>

                  <p className="bold">03/07 às 10h40</p>
                  <p>Hospital de Aveiro</p>
                </Col>

                <Col xs={6}>
                  <img src={consultas} />
                </Col>
              </Row>
            </Card>

            <Card className="col-6 boxShadow">
              <h3 className="red">Tome os seguintes medicamentos:</h3>

              <Row>
                <Col xs={6}>
                  <p className="bold">Pequeno-almoço</p>
                  <p>
                    1 cápsula de <span className="medium">Ferrum</span>
                  </p>

                  <p className="bold">Almoço</p>
                  <p>
                    1 saqueta de <span className="medium">Fosfoglutina</span>
                  </p>
                </Col>

                <Col xs={6} className="alignEnd">
                  <img src={medicamentos} />
                </Col>
              </Row>
            </Card>
          </Row>

          <Row className="cards">
            <Card className="col-12 boxShadow" id="consultasAnt">
              <h3 className="green">Próximas consultas:</h3>

              <Row>
                <Col>
                  <p className="bold">29/06 às 14h30</p>
                  <p>Hospital de Aveiro</p>

                  <p className="bold">03/07 às 10h40</p>
                  <p>Hospital de Aveiro</p>
                </Col>

                <Col>
                  <p className="bold">29/06 às 14h30</p>
                  <p>Hospital de Aveiro</p>

                  <p className="bold">03/07 às 10h40</p>
                  <p>Hospital de Aveiro</p>
                </Col>

                <Col>
                  <p className="bold">29/06 às 14h30</p>
                  <p>Hospital de Aveiro</p>

                  <p className="bold">03/07 às 10h40</p>
                  <p>Hospital de Aveiro</p>
                </Col>

                <img src={consultasIcone} />
              </Row>
            </Card>
          </Row>

          <Navbar ativo={"calendario"} />
        </div>
      </div>
    );
  }
}
