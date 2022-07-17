import React, { Component } from "react";
import { Row, Col, Card, Button,Modal } from "react-bootstrap";
import logotipo from "../images/probranca-cor.png";
import Navbar from "../Containers/Navbar";
import emergency from "../images/icons/emergencia.png";
import { useNavigate, Link } from "react-router-dom";

export default class Video extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      show2: false,
    };
  }


  openSponsors = () => this.setState({ show: true });
  handleClose = () => this.setState({ show: false });

  openEmergency = () => this.setState({ show2: true });
  closeEmergency = () => this.setState({ show2: false });
  

  render() {

    return (
      <div>
        <div className="frame" id="calendario">
          <Row>
            <Col xs={8}>
              <h1 className="green">Vídeos</h1>

              <p className="blue paragraphInfo">
                No painel abaixo veja as suas próximas consultas, os
                medicamentos que deve tomar e as suas consultas anteriores.
              </p>
            </Col>

            <Col xs={4} className="btnsAjuda">
            <Button className="btnInfo blue" onClick={this.openSponsors}>
                i
              </Button>

              <Button
                className="btnBorderRed blue"
                id="emergency"
                onClick={this.openEmergency}
              >
                <img src={emergency} alt="ícone de telefone" />
                Emergência
              </Button>
            </Col>
          </Row>

          <Row className="otherSources">
            <Col className="outsideSource">
              <iframe
                src="https://www.youtube.com/embed/-ZXSzD1Dlis"
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
                 src="https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2FPROBRANCA%2Fvideos%2F706988213638447%2F&show_text=false&width=560&t=0"
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

        <Navbar ativo={"videos"}/>

          {/* Modal informações */}
          <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title className="blue">
              Este projeto foi desenvolvido por:
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <img src={logotipo} />
          </Modal.Body>

          <Modal.Footer>
            <Link to="/mostrarcontactos">
              <Button className="btnFill">
                Ir para a ferramenta de administração
              </Button>
            </Link>

            <Button className="btnFill" onClick={this.logout}>
              Sair da conta
            </Button>

            <Button className="btnBorderBlue blue" onClick={this.handleClose}>
              Fechar janela
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Modal contactos de emergência */}
        <Modal show={this.state.show2} onHide={this.closeEmergency}>
          <Modal.Header closeButton>
            <Modal.Title className="blue">Contactos de emergência</Modal.Title>
          </Modal.Header>

          <Modal.Body style={{ margin: "5px 40px", fontSize: "2rem" }}>
            <p className="blue">
              <b>
                <span className="green">INEM: </span>
              </b>
              <a href="tel:112">112</a>
            </p>

            <p className="blue">
              <b>
                <span className="green">GNR Albergaria-a-Velha: </span>
              </b>
              <a href="tel:234521237">234 521 237</a>
            </p>

            <p className="blue">
              <b>
                <span className="green">Bombeiros Albergaria-a-Velha: </span>
              </b>
              <a href="tel:234529112">234 529 112</a>
            </p>

            <p className="blue">
              <b>
                <span className="green">PROBRANCA: </span>
              </b>
              <a href="tel:234540220">234 540 220</a>
            </p>
          </Modal.Body>

          <Modal.Footer>
            <Button
              className="btnBorderBlue blue"
              onClick={this.closeEmergency}
            >
              Fechar janela
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
