import React, { Component } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import Navbar from "../Containers/Navbar";
import { auth } from "./firebase";
import emergency from "../images/icons/emergencia.png";
import consultas from "../images/characters/consultas.svg";
import medicamentos from "../images/characters/medicamentos.svg";
import facebook from "../images/icons/facebook.png";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <div className="frame" id="home">
          <Row>
            <Col xs={8}>
              <h1 className="green">
                Bem-vindo <span className="blue">{auth.currentUser.email}</span>
              </h1>

              <p className="paragraphInfo">
                No painel abaixo veja as suas próximas consultas e os seus
                contactos mais recentes.
                <br />
                Do lado direito pode consultar páginas específicas.
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
                  <p className="bold">29/06 às 14h30</p>
                  <p>Hospital de Aveiro</p>

                  <p className="bold">03/07 às 10h40</p>
                  <p>Hospital de Aveiro</p>
                </Col>

                <Col xs={6} className="alignEnd">
                  <img src={medicamentos} />
                </Col>
              </Row>
            </Card>
          </Row>

          <Row>
            <Col className="outsideSource">
              <iframe
                src="https://www.youtube.com/embed/_cVNCuvz8qI?controls=0"
                title="Canal de Fátima"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                className="boxShadow"
              ></iframe>

              <Button className="btnFill">
                <a href="https://youtu.be/_cVNCuvz8qI" target="_blank">
                  Ver “Fátima” em direto
                </a>
              </Button>
            </Col>

            <Col className="outsideSource">
              <iframe
                src="https://www.youtube.com/embed/_cVNCuvz8qI?controls=0"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                className="boxShadow"
              ></iframe>

              <Button className="btnFill">Ver vídeos da ProBranca</Button>
            </Col>

            <Col className="outsideSource">
              <div className="imgSource boxShadow" id="facebook"></div>

              <Button className="btnFill">
                <a href="fb://facewebmodal/">Consultar Facebook</a>
              </Button>
            </Col>
          </Row>
        </div>

        <Navbar />
      </div>
    );
  }
}
