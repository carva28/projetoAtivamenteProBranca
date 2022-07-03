import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Row } from "react-bootstrap";
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

export default class Navbar_platform_admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: this.props.ativo,
    };
  }

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
          <Link to="/adicionarinformacoes">
            <div
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
                Registar contactos
              </p>
            </div>
          </Link>
          {/* FIM Link para chamadas */}
          {/* Link para calendario */}
          <Link to="/mostrarcontactos">
            <div
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
                Mostrar contactos
              </p>
            </div>
          </Link>
          {/* FIM Link para calendario */}
         
          <Link to="/adicionarconsulta">
            <div
              className={`linksMenu ${
                this.state.active == "consulta" ? "active" : ""
              }`}
            >
              {this.state.active == "consulta" ? (
                <img src={calendarioVerde} alt="Menu para calendario" />
              ) : (
                <img src={calendarioBranco} alt="Menu para calendario" />
              )}

              <p
                className={
                  this.state.active == "consulta" ? "green" : "white"
                }
              >
                Adicionar consultas
              </p>
            </div>
          </Link>
          
        </Row>
      </div>
    );
  }
}
