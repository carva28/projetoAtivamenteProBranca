import React, { Component } from "react";
import { Row } from "react-bootstrap";
import logotipo from "../images/probranca-branco.png";
import chamadas from "../images/icons/chamadas-branco.png";
import calendario from "../images/icons/calendario-branco.png";
import videos from "../images/icons/videos-branco.png";
import conferencia from "../images/icons/conferencia-branco.png";
import jogos from "../images/icons/jogos-branco.png";
import pesquisa from "../images/icons/pesquisa-branco.png";

export default class Navbar extends Component {
  render() {
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
          <div className="linksMenu">
            <img src={chamadas} alt="Menu para chamadas" />
            <p className="white">Chamadas</p>
          </div>

          <div className="linksMenu">
            <img src={calendario} alt="Menu para calendário" />
            <p className="white">Calendário</p>
          </div>

          <div className="linksMenu">
            <img src={videos} alt="Menu para vídeos" />
            <p className="white">Vídeos</p>
          </div>

          <div className="linksMenu">
            <img
              src={conferencia}
              alt="Menu para conferência Zoom com ProBranca"
            />
            <p className="white">ProBranca</p>
          </div>

          <div className="linksMenu">
            <img src={jogos} alt="Menu para jogos" />
            <p className="white">Jogos</p>
          </div>

          <div className="linksMenu">
            <img src={pesquisa} alt="Menu para pesquisa no Google" />
            <p className="white">Pesquisar</p>
          </div>
        </Row>
      </div>
    );
  }
}
