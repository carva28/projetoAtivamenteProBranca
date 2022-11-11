import React, { Component } from "react";
import { Row, Col, Card, Button, Modal } from "react-bootstrap";
import { auth, logout } from "./firebase";
import { Link } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";
import importarPDF from "../images/Documentos/politica_dados_Probranca.pdf";
import Data_Extensa from "./Data_Extensa";

import emergency from "../images/icons/emergencia.png";
import consultas from "../images/characters/consultas.svg";
import medicamentos from "../images/characters/medicamentos.svg";
import logotipo from "../images/probranca-cor.png";
import bpi from "../images/bpi.png";
import homeBranco from "../images/icons/home-branco.png";
import chamadasBranco from "../images/icons/chamadas-branco.png";
import jogosBranco from "../images/icons/jogos-branco.png";
import saudeBranco from "../images/icons/saude-branco.png";
import conferencia from "../images/icons/conferencia-branco.png";
import videosBranco from "../images/icons/videos-branco.png";
import desligar from "../images/icons/logout.png";

const firebase = require("./firebase");
const firebaseConfig = {
  apiKey: "AIzaSyDPwM0HTu_Xa52irgMjUbWbfczplh_JO48",
  authDomain: "ativamenteprobranca.firebaseapp.com",
  projectId: "ativamenteprobranca",
  storageBucket: "ativamenteprobranca.appspot.com",
  messagingSenderId: "147788951852",
  appId: "1:147788951852:web:d019da8a750c193d4afc89",
  measurementId: "G-T350E5L1GS",
  databaseURL:
    "https://ativamenteprobranca-default-rtdb.europe-west1.firebasedatabase.app/",
};
const app = initializeApp(firebaseConfig);

var listMedicamentos,
  listConsultas,
  email_UserAtivo,
  email_UserAtivo1,
  email_UserAtivo2,
  email_UserAtivo3;

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      show2: false,
      show3: false,
      uuid: auth.currentUser.reloadUserInfo.localId,
      variavel_contactos: 0,
      variavel_consulta: 0,
      medicamentos: [],
      consultas: [],
    };
  }

  openSponsors = () => this.setState({ show: true });
  handleClose = () => this.setState({ show: false });

  openEmergency = () => this.setState({ show2: true });
  closeEmergency = () => this.setState({ show2: false });

  openModal = () => this.setState({ show3: true });
  closeModal = () => this.setState({ show3: false });

  logout = async () => {
    console.log("logout");
    await logout(auth);
    window.location.reload();
  };

  render() {
    if (auth.currentUser.email != "") {
      email_UserAtivo = auth.currentUser.email;

      email_UserAtivo1 = email_UserAtivo.replace("@gmail.com", "");
      email_UserAtivo2 = email_UserAtivo1.replace("@ua.pt", "");
      email_UserAtivo3 = email_UserAtivo2.replace(".", " ");
    } else {
      email_UserAtivo3 = auth.currentUser.email;
    }

    return (
      <div>
        <div className="frame" id="home">
          <Row>
            <Col xs={9}>
              <h1 className="green">
                Bem-vindo <span className="blue">{email_UserAtivo3}</span>
              </h1>

              <Data_Extensa />
            </Col>

            <Col xs={3} className="btnsAjuda">
              <Row>
                <Button
                  className="btnInfo blue"
                  id="desligar"
                  onClick={this.logout}
                >
                  <img src={desligar} />
                </Button>

                <Button className="btnInfo blue" onClick={this.openSponsors}>
                  i
                </Button>
              </Row>

              <Button
                className="btnBorderRed blue"
                id="emergency"
                onClick={this.openEmergency}
              >
                <img src={emergency} alt="ícone de telefone" />
                Emergência
              </Button>
            </Col>

            <Row>
              <p className="blue paragraphInfo">
                Clique nos botões abaixo para aceder às diferentes secções da
                plataforma.
              </p>
            </Row>
          </Row>

          <div id="entrada">
            <Row>
              <Col>
                {/* <Link to="/">
                  <div className="linksMenu" id="inicio">
                    <img src={homeBranco} alt="Menu para voltar a início" />
                    <p className="white">Início</p>
                  </div>
                </Link> */}
                <Link to="/chamadas">
                  <div id="chamadasMenu" className="linksMenu">
                    <img src={chamadasBranco} />
                    <p className="white">Chamadas</p>
                  </div>
                </Link>
              </Col>

              <Col>
                <Link to="/calendario">
                  <div id="calendarioMenu" className="linksMenu">
                    <img src={saudeBranco} />
                    <p className="white">Saúde</p>
                  </div>
                </Link>
              </Col>

              <Col>
                <Link to="/videos">
                  <div id="videosMenu" className="linksMenu">
                    <img src={videosBranco} />
                    <p className="white">YouTube</p>
                  </div>
                </Link>
              </Col>
            </Row>

            <Row>
              <Col>
                <div
                  id="zoomMenu"
                  className="linksMenu"
                  onClick={this.openModal}
                >
                  <img src={conferencia} />
                  <p className="white">ProBranca</p>
                </div>
              </Col>

              <Col>
                <Link to="/jogos">
                  <div id="jogosMenu" className="linksMenu">
                    <img src={jogosBranco} />
                    <p className="white">Jogos</p>
                  </div>
                </Link>
              </Col>

              <Col></Col>
            </Row>
          </div>
        </div>

        {/* Modal informações */}
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title className="blue">
              Este projeto foi desenvolvido por:
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <img src={logotipo} />
            <img src={bpi} />
          </Modal.Body>

          <Modal.Footer>
            <Link to="/mostrarcontactos">
              <Button className="btnFill">
                Ir para a ferramenta de administração
              </Button>
            </Link>

            <a href={importarPDF} target="_blank">
              <Button className="btnFill">
                Consultar as Condições de Utilização
              </Button>
            </a>

            {/* <Button className="btnFill">
              Sair da conta
            </Button> */}

            <Button
              className="btnBorderBlue blue btnSmaller"
              onClick={this.handleClose}
            >
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
              className="btnBorderBlue blue btnSmaller"
              onClick={this.closeEmergency}
            >
              Fechar janela
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Modal zoom ProBranca */}
        <Modal show={this.state.show3} onHide={this.closeModal}>
          <Modal.Header closeButton></Modal.Header>

          <Modal.Body style={{ margin: "5px 40px", fontSize: "2rem" }}>
            <p className="blue">
              Ao clicar "Ligar" será redirecionado para uma videochamada com os
              membros da ProBranca.
              <br />
              Carregue em <b>"Ligar"</b> para participar nas sessões com a
              Probranca.
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
        {/* Final da modal */}
      </div>
    );
  }
}
