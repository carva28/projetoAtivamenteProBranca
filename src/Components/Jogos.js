import React, { Component } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import Navbar from "../Containers/Navbar";
import consultas from "../images/characters/consultas.svg";
import medicamentos from "../images/characters/medicamentos.svg";

export class Jogos extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return (
      <div>
        <div className="frame" id="jogos">
          <h1 className="green">Jogos</h1>

          <p className="blue paragraphInfo">
            No painel abaixo veja as suas próximas consultas e os seus contactos
            mais recentes.
            <br />
            Do lado direito pode consultar páginas específicas.
          </p>

          <Row className="cards">
            <Card className="col-6 boxShadow">
              <h3 className="green">Jogo 1</h3>

              <Row>
                <Col xs={6}>
                  <p className="bold">29/06 às 14h30</p>
                  <p>Hospital de Aveiro</p>
                </Col>

                <Col xs={6}>
                  <img src={consultas} />
                </Col>
              </Row>

              <Row>
                <Button
                  className="btnFill alignCenter"
                  style={{ margin: "40px auto 50px" }}
                >
                  Solitário
                </Button>
              </Row>
            </Card>

            <Card className="col-6 boxShadow">
              <h3 className="red">Jogo 2</h3>

              <Row>
                <Col xs={6}>
                  <p className="bold">Pequeno-almoço</p>
                  <p>
                    1 cápsula de <span className="medium">Ferrum</span>
                  </p>
                </Col>

                <Col xs={6} className="alignEnd">
                  <img src={medicamentos} />
                </Col>
              </Row>
            </Card>
          </Row>
        </div>

        <Navbar ativo={"jogos"} />
      </div>
    );
  }
}

export default Jogos;
