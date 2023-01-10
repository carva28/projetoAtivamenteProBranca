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
import medBranco from "../images/icons/med-branco.png";
import medVerde from "../images/icons/med-verde.png";

export default class Navbar_platform_admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: this.props.ativo,
    };
  }

  render() {

    return (
      <div id="navBar" className="adminNav">
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

          {/* Link para mostrarcontactos */}
          <Link to="/mostrarcontactos">
            <div
              className={`linksMenu ${
                this.state.active == "mostrarcontactos" ||
                this.state.active == "adicionarinformacoes"
                  ? "active"
                  : ""
              }`}
            >
              {this.state.active == "mostrarcontactos" ||
              this.state.active == "adicionarinformacoes" ? (
                <img src={chamadasVerde} alt="Menu para mostrar contactos" />
              ) : (
                <img src={chamadasBranco} alt="Menu para mostrar contactos" />
              )}

              <p
                className={
                  this.state.active == "mostrarcontactos" ||
                  this.state.active == "adicionarinformacoes"
                    ? "green"
                    : "white"
                }
              >
                Contactos
              </p>
            </div>
          </Link>
          {/* FIM Link para mostrarcontactos */}

          {/* Link para mostrarconsultas */}
          <Link to="/mostrarconsultas">
            <div
              className={`linksMenu ${
                this.state.active == "adicionarconsulta" ||
                this.state.active == "mostrarconsultas"
                  ? "active"
                  : ""
              }`}
            >
              {this.state.active == "adicionarconsulta" ||
              this.state.active == "mostrarconsultas" ? (
                <img src={calendarioVerde} alt="Menu para adicionar consulta" />
              ) : (
                <img
                  src={calendarioBranco}
                  alt="Menu para adicionar consulta"
                />
              )}

              <p
                className={
                  this.state.active == "adicionarconsulta" ||
                  this.state.active == "mostrarconsultas"
                    ? "green"
                    : "white"
                }
              >
                Consultas
              </p>
            </div>
          </Link>
          {/* FIM Link para mostrarconsultas */}

          {/* Link para mostrarmedicamentos */}
          <Link to="/mostrarmedicamentos">
            <div
              className={`linksMenu ${
                this.state.active == "adicionarmedicamentos" ||
                this.state.active == "mostrarmedicamentos"
                  ? "active"
                  : ""
              }`}
            >
              {this.state.active == "adicionarmedicamentos" ||
              this.state.active == "mostrarmedicamentos" ? (
                <img src={medVerde} alt="Menu para calendario" />
              ) : (
                <img src={medBranco} alt="Menu para calendario" />
              )}

              <p
                className={
                  this.state.active == "adicionarmedicamentos" ||
                  this.state.active == "mostrarmedicamentos"
                    ? "green"
                    : "white"
                }
              >
                Medicamentos
              </p>
            </div>
          </Link>
          {/* FIM Link para mostrarmedicamentos */}
        </Row>
      </div>
    );
  }
}
