import React, { Component } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import Navbar from "../Containers/Navbar";
import emergency from "../images/icons/emergencia.png";

export default class Video extends Component {
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

          <Row className="otherSources">
            <Col className="outsideSource">
              <iframe
                src="https://www.youtube.com/embed/_cVNCuvz8qI?controls=0"
                title="Canal de Fátima"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
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
                allowFullScreen
                className="boxShadow"
              ></iframe>

              <Button className="btnFill">Ver vídeos da ProBranca</Button>
            </Col>
          </Row>
        </div>

        <Navbar />
      </div>
    );
  }
}
