import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Row, Button, Modal } from "react-bootstrap";
import logotipo from "../images/probranca-branco.png";
import conferencia from "../images/icons/conferencia-branco.png";
import pesquisa from "../images/icons/pesquisa-branco.png";
import homeBranco from "../images/icons/home-branco.png";
import homeVerde from "../images/icons/home-verde.png";
import chamadasBranco from "../images/icons/chamadas-branco.png";
import chamadasVerde from "../images/icons/chamadas-verde.png";
import jogosBranco from "../images/icons/jogos-branco.png";
import jogosVerde from "../images/icons/jogos-verde.png";
import calendarioBranco from "../images/icons/calendario-branco.png";
import calendarioVerde from "../images/icons/calendario-verde.png";
import videosBranco from "../images/icons/videos-branco.png";
import videosVerde from "../images/icons/videos-verde.png";

export default class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: this.props.ativo,
    };
  }

  openModal = () => this.setState({ show: true });
  closeModal = () => this.setState({ show: false });

  render() {
    console.log(this.state.active);

    return (
      <div id="navBar">
        <Row>
          <img
            src={logotipo}
            alt="logótipo da ProBranca"
            className="logotipo"
          />
        </Row>

        <Row id="topicsMenu">
          {/* Link para home */}
          <Link to="/">
            <div
              className={`linksMenu ${
                this.state.active == "home" ? "active" : ""
              }`}
            >
              {this.state.active == "home" ? (
                <img src={homeVerde} alt="Menu para voltar a início" />
              ) : (
                <img src={homeBranco} alt="Menu para voltar a início" />
              )}

              <p className={this.state.active == "home" ? "green" : "white"}>
                Início
              </p>
            </div>
          </Link>
          {/* FIM Link para home */}
          {/* Link para chamadas */}
          <Link to="/chamadas">
            <div
              id="chamadasMenu"
              className={`linksMenu ${
                this.state.active == "chamadas" ? "active" : ""
              }`}
            >
              {this.state.active == "chamadas" ? (
                <img src={chamadasVerde} alt="Menu para chamadas" />
              ) : (
                <img src={chamadasBranco} alt="Menu para chamadas" />
              )}

              <p
                className={this.state.active == "chamadas" ? "green" : "white"}
              >
                Chamadas
              </p>
            </div>
          </Link>
          {/* FIM Link para chamadas */}
          {/* Link para calendario */}
          <Link to="/calendario">
            <div
              id="calendarioMenu"
              className={`linksMenu ${
                this.state.active == "calendario" ? "active" : ""
              }`}
            >
              {this.state.active == "calendario" ? (
                <img src={calendarioVerde} alt="Menu para calendario" />
              ) : (
                <img src={calendarioBranco} alt="Menu para calendario" />
              )}

              <p
                className={
                  this.state.active == "calendario" ? "green" : "white"
                }
              >
                Calendário
              </p>
            </div>
          </Link>
          {/* FIM Link para calendario */}
          {/* Link para videos */}
          <Link to="/videos">
            <div
              id="videosMenu"
              className={`linksMenu ${
                this.state.active == "videos" ? "active" : ""
              }`}
            >
              {this.state.active == "videos" ? (
                <img src={videosVerde} alt="Menu para videos" />
              ) : (
                <img src={videosBranco} alt="Menu para videos" />
              )}

              <p className={this.state.active == "videos" ? "green" : "white"}>
                Vídeos
              </p>
            </div>
          </Link>
          {/* FIM Link para videos */}
          <div id="zoomMenu" className="linksMenu" onClick={this.openModal}>
            <img
              src={conferencia}
              alt="Menu para conferência Zoom com ProBranca"
            />
            <p className="white">ProBranca</p>
          </div>
          {/* Link para jogos */}
          <Link to="/jogos">
            <div
              id="jogosMenu"
              className={`linksMenu ${
                this.state.active == "jogos" ? "active" : ""
              }`}
            >
              {this.state.active == "jogos" ? (
                <img src={jogosVerde} alt="Menu para jogos" />
              ) : (
                <img src={jogosBranco} alt="Menu para jogos" />
              )}

              <p className={this.state.active == "jogos" ? "green" : "white"}>
                Jogos
              </p>
            </div>
          </Link>
          {/* FIM Link para jogos */}
          {/* <div className="linksMenu">
            <img src={pesquisa} alt="Menu para pesquisa no Google" />
            <p className="white">Pesquisar</p>
          </div> */}
        </Row>

        {/* Modal contactos de emergência */}
        <Modal show={this.state.show} onHide={this.closeModal}>
          <Modal.Header closeButton></Modal.Header>

          <Modal.Body style={{ margin: "5px 40px", fontSize: "2rem" }}>
            <p className="blue">
              Ao clicar "Ligar" será redirecionado para uma videochamada com os
              membros da ProBranca.
              <br />
              Carregue em  <b>"Ligar"</b> para participar nas sessões com a Probranca.
              <br />
              Se não quiser, clique "Fechar janela".
            </p>
          </Modal.Body>

          <Modal.Footer>
            <Button
              className="btnBorderBlue btnSmaller blue"
              onClick={this.closeModal}
            >
              Fechar janela
            </Button>

            <a
              target="_blank"
              href="https://us06web.zoom.us/j/5598075256?pwd=ZnRqYUViaE83bjlDU21LZk92RWg1dz09"
            >
              <Button className="btnFillGreen white">Ligar</Button>
            </a>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
